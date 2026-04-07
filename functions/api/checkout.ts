interface CheckoutBody {
  items: { id: number; quantity: number }[];
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = (await request.json()) as CheckoutBody;

  if (!body.items || body.items.length === 0) {
    return new Response(JSON.stringify({ error: "No items" }), { status: 400 });
  }

  const hasInvalidQty = body.items.some(
    (i) => !Number.isInteger(i.quantity) || i.quantity < 1
  );
  if (hasInvalidQty) {
    return new Response(
      JSON.stringify({ error: "All quantities must be positive integers" }),
      { status: 400 }
    );
  }

  // Fetch products from D1 to validate prices
  const ids = body.items.map((i) => i.id);
  const placeholders = ids.map(() => "?").join(",");
  const { results: products } = await env.DB.prepare(
    `SELECT id, name, price FROM products WHERE id IN (${placeholders})`
  ).bind(...ids).all<{ id: number; name: string; price: number }>();

  if (products.length !== body.items.length) {
    return new Response(
      JSON.stringify({ error: "Some products not found" }),
      { status: 400 }
    );
  }

  // Create order in D1
  const orderResult = await env.DB.prepare(
    "INSERT INTO orders (status, created_at) VALUES ('pending', datetime('now')) RETURNING id"
  ).first<{ id: number }>();

  if (!orderResult) {
    return new Response(
      JSON.stringify({ error: "Failed to create order" }),
      { status: 500 }
    );
  }

  const orderId = orderResult.id;

  // Insert order items
  const stmts = body.items.map((item) => {
    const product = products.find((p) => p.id === item.id)!;
    return env.DB.prepare(
      "INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)"
    ).bind(orderId, item.id, item.quantity, product.price);
  });
  await env.DB.batch(stmts);

  // Build MercadoPago preference
  const SHIPPING_FEE = 3990;
  const mpItems = [
    ...body.items.map((item) => {
      const product = products.find((p) => p.id === item.id)!;
      return {
        title: product.name,
        quantity: item.quantity,
        unit_price: product.price,
        currency_id: "CLP",
      };
    }),
    {
      title: "Envío",
      quantity: 1,
      unit_price: SHIPPING_FEE,
      currency_id: "CLP",
    },
  ];

  const preference: Record<string, unknown> = {
    items: mpItems,
    external_reference: String(orderId),
  };

  // Determine the public-facing origin (handles proxies/tunnels that forward as HTTP)
  const proto = request.headers.get("x-forwarded-proto") || new URL(request.url).protocol.replace(":", "");
  const host = request.headers.get("host") || new URL(request.url).host;
  const origin = `${proto}://${host}`;

  if (origin.startsWith("https://")) {
    preference.back_urls = {
      success: `${origin}/checkout/success`,
      failure: `${origin}/checkout/failure`,
      pending: `${origin}/checkout/pending`,
    };
    preference.auto_return = "approved";
    preference.notification_url = `${origin}/api/webhook`;
  }

  const mpRes = await fetch(
    "https://api.mercadopago.com/checkout/preferences",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    }
  );

  if (!mpRes.ok) {
    const err = await mpRes.text();
    console.error("MercadoPago error:", mpRes.status, err);
    return new Response(
      JSON.stringify({ error: "MercadoPago preference creation failed", status: mpRes.status, detail: err }),
      { status: 502 }
    );
  }

  const mpData = (await mpRes.json()) as { sandbox_init_point: string; init_point: string };

  return Response.json({
    init_point: mpData.sandbox_init_point || mpData.init_point,
    order_id: orderId,
  });
};
