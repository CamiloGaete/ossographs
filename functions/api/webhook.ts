async function verifySignature(
  request: Request,
  dataId: string,
  secret: string
): Promise<boolean> {
  const xSignature = request.headers.get("x-signature");
  const xRequestId = request.headers.get("x-request-id");
  if (!xSignature || !xRequestId) return false;

  const parts: Record<string, string> = {};
  for (const part of xSignature.split(",")) {
    const [k, v] = part.split("=", 2);
    if (k && v) parts[k.trim()] = v.trim();
  }
  const ts = parts["ts"];
  const v1 = parts["v1"];
  if (!ts || !v1) return false;

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, encoder.encode(manifest));
  const computed = Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return computed === v1;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = (await request.json()) as {
    action?: string;
    type?: string;
    data?: { id?: string };
  };

  if (body.type !== "payment" || !body.data?.id) {
    return new Response("OK", { status: 200 });
  }

  if (env.MERCADOPAGO_WEBHOOK_SECRET) {
    const valid = await verifySignature(request, body.data.id, env.MERCADOPAGO_WEBHOOK_SECRET);
    if (!valid) {
      console.error("Webhook signature validation failed");
      return new Response("Unauthorized", { status: 401 });
    }
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
