export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const { results } = await env.DB.prepare(
    "SELECT id, name, description, price, badge, category FROM products"
  ).all();

  return Response.json(results);
};
