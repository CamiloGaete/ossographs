import { useState, useEffect } from "react";
import ProductCard, { Product } from "./ProductCard";
import { useCartStore } from "@/store/cart";

const FALLBACK_PRODUCTS: Product[] = [
  { id: 1, name: "Letrero Acrílico Personalizado", description: "Corte láser, 30x20cm, incluye diseño", price: 25000, badge: "Popular" },
  { id: 2, name: "Gigantografía Full Color", description: "Impresión HD, lona 440g, 2x1m", price: 18500, badge: "Nuevo" },
  { id: 3, name: "Letrero LED Luminoso", description: "Caja de luz, 60x40cm, doble faz", price: 45000 },
  { id: 4, name: "Tarjetas de Presentación", description: "500 unidades, couché 300g, ambas caras", price: 12000 },
  { id: 5, name: "Banner Roll Up", description: "85x200cm, estructura + impresión", price: 32000, badge: "Popular" },
  { id: 6, name: "Pendón Publicitario", description: "Lona front, 1.5x0.8m, full color", price: 15000 },
  { id: 7, name: "Señalética Interior", description: "Acrílico 3mm, corte CNC, adhesivo", price: 8500, badge: "Nuevo" },
  { id: 8, name: "Letras Corpóreas 3D", description: "PVC expandido, 20cm altura, pintadas", price: 55000 },
  { id: 9, name: "Stickers Troquelados", description: "1000 unidades, vinilo adhesivo", price: 9000 },
  { id: 10, name: "Plotter de Corte Vinilo", description: "Diseño personalizado, hasta 1m ancho", price: 6500 },
];

export default function Products() {
  const addItem = useCartStore((s) => s.addItem);
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => {
        if (!r.ok) throw new Error("API not available");
        return r.json();
      })
      .then((data: Product[]) => {
        if (data.length > 0) setProducts(data);
      })
      .catch(() => {
        // Use fallback products (already set)
      });
  }, []);

  return (
    <section id="productos" className="bg-white px-6 py-20 lg:px-20">
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-3 font-heading text-xs font-semibold tracking-[3px] text-green-primary">
            CATÁLOGO
          </p>
          <h2 className="font-heading text-[28px] font-bold text-dark lg:text-4xl">
            Productos Destacados
          </h2>
          <p className="mt-3 font-body text-base text-medium-gray">
            Compra online y recibe en todo Chile
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {["Categoría", "Precio", "Ordenar por"].map((f) => (
            <button
              key={f}
              className="flex items-center gap-2 rounded-full border border-transparent bg-light-gray px-5 py-2.5 font-body text-[13px] font-medium text-dark transition-all hover:border-border-gray hover:bg-white"
            >
              {f} <span className="text-[10px] text-medium-gray">▾</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={addItem} />
          ))}
        </div>

        <p className="mt-12 text-center">
          <a
            href="#"
            className="font-body text-[15px] font-semibold text-green-primary transition-colors hover:text-green-hover"
          >
            Ver todos los productos →
          </a>
        </p>
      </div>
    </section>
  );
}
