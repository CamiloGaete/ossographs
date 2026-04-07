import { formatCLP } from "@/lib/format";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  badge?: string;
  category?: string;
};

export default function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
}) {
  return (
    <div className="group overflow-hidden rounded-xl border border-black/[0.06] bg-white transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-light-gray">
        {product.badge && (
          <span className="absolute left-3 top-3 z-[1] rounded-full bg-green-tint px-3 py-[5px] font-body text-[11px] font-semibold text-green-primary">
            {product.badge}
          </span>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/[0.03] to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-5">
        <h3 className="font-body text-base font-semibold text-dark">
          {product.name}
        </h3>
        <p className="font-body text-[13px] leading-5 text-medium-gray">
          {product.description}
        </p>
        <p className="font-heading text-xl font-bold text-dark">
          {formatCLP(product.price)}
        </p>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-1 w-full rounded-lg bg-gradient-to-br from-green-primary to-green-dark py-3 font-body text-sm font-semibold text-white shadow-none transition-all hover:-translate-y-px hover:shadow-[0_4px_12px_var(--green-glow)] active:translate-y-0"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
