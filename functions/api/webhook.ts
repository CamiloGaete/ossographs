export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = (await request.json()) as {
    action?: string;
    type?: string;
    data?: { id?: string };
  };

  if (body.type !== "payment" || !body.data?.id) {
    return new Response("OK", { status: 200 });
  }

  // Fetch payment details from MercadoPago
  const paymentRes = await fetch(
    `https://api.mercadopago.com/v1/payments/${body.data.id}`,
    {
      headers: {
        Authorization: `Bearer ${env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
    }
  );

  if (!paymentRes.ok) {
    console.error("Failed to fetch payment:", await paymentRes.text());
    return new Response("Error", { status: 500 });
  }

  const payment = (await paymentRes.json()) as {
    status: string;
    external_reference: string;
  };

  // Map MercadoPago status to our order status
  const statusMap: Record<string, string> = {
    approved: "paid",
    pending: "pending",
    in_process: "pending",
    rejected: "failed",
    cancelled: "cancelled",
    refunded: "refunded",
  };

  const orderStatus = statusMap[payment.status] || "unknown";

  await env.DB.prepare(
    "UPDATE orders SET status = ?, updated_at = datetime('now') WHERE id = ?"
  )
    .bind(orderStatus, payment.external_reference)
    .run();

  return new Response("OK", { status: 200 });
};
