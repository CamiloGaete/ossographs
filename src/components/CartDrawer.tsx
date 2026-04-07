import { useState } from "react";
import { Drawer } from "@/app/components/ui/drawer";
import { Button } from "@/app/components/ui/button";
import { useCartStore } from "@/store/cart";
import { formatCLP } from "@/lib/format";

export default function CartDrawer() {
  const { items, open, updateQty, removeItem, setCartOpen } = useCartStore();
  const [checkingOut, setCheckingOut] = useState(false);

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shipping = 3990;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.product.id,
            quantity: i.quantity,
          })),
        }),
      });
      if (!res.ok) throw new Error("Checkout failed");
      const { init_point } = await res.json();
      window.location.href = init_point;
    } catch {
      alert("Error al procesar el checkout. Intenta de nuevo.");
      setCheckingOut(false);
    }
  };

  const onClose = () => setCartOpen(false);

  return (
    <Drawer open={open} onClose={onClose} title="Tu Carrito">
      {/* Items */}
      <div className="flex-1 overflow-y-auto px-7 py-5">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 pt-20">
            <div className="h-16 w-16 rounded-full bg-green-primary/15" />
            <p className="font-body text-base font-medium text-medium-gray">
              Tu carrito está vacío
            </p>
            <a
              href="#productos"
              onClick={onClose}
              className="font-body text-sm font-semibold text-green-primary"
            >
              Explorar Productos
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <div className="h-[60px] w-[60px] shrink-0 rounded-lg bg-light-gray" />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="font-body text-sm font-semibold text-dark">
                    {item.product.name}
                  </p>
                  <p className="font-body text-[13px] text-medium-gray">
                    {formatCLP(item.product.price)}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.product.id, -1)}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-light-gray font-body text-[13px] font-medium text-dark"
                    >
                      −
                    </button>
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-light-gray font-body text-[13px] font-medium text-dark">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.product.id, 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-md bg-light-gray font-body text-[13px] font-medium text-dark"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="self-center text-medium-gray transition-colors hover:text-red-500"
                  aria-label="Eliminar"
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Totals & CTAs */}
      {items.length > 0 && (
        <div className="border-t border-light-gray px-7 py-5">
          <div className="flex justify-between font-body text-sm">
            <span className="text-medium-gray">Subtotal</span>
            <span className="font-semibold text-dark">
              {formatCLP(subtotal)}
            </span>
          </div>
          <p className="mt-1 font-body text-[13px] text-medium-gray">
            Envío desde $3.990
          </p>
          <div className="mt-3 flex justify-between">
            <span className="font-heading text-xl font-bold text-dark">
              Total
            </span>
            <span className="font-heading text-xl font-bold text-dark">
              {formatCLP(total)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={checkingOut}
            className="mt-5 block w-full rounded-[10px] bg-green-primary py-4 text-center font-heading text-base font-bold text-white transition-colors hover:bg-green-hover disabled:opacity-60"
          >
            {checkingOut ? "Procesando..." : "Ir al Checkout"}
          </button>
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            className="mt-3 w-full"
          >
            Seguir Comprando
          </Button>
        </div>
      )}
    </Drawer>
  );
}
