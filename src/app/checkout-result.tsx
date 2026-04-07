import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useCartStore } from "@/store/cart";

export default function CheckoutResult() {
  const [searchParams] = useSearchParams();
  const clearCart = useCartStore((s) => s.clearCart);

  const status = searchParams.get("status") || searchParams.get("collection_status");
  const externalReference = searchParams.get("external_reference");

  const isSuccess = status === "approved";
  const isPending = status === "pending" || status === "in_process";

  useEffect(() => {
    if (isSuccess) clearCart();
  }, [isSuccess, clearCart]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-light-gray px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-lg">
        {isSuccess ? (
          <>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-primary/15 text-4xl">
              ✓
            </div>
            <h1 className="font-heading text-2xl font-bold text-dark">
              Pago Exitoso
            </h1>
            <p className="mt-3 font-body text-base text-medium-gray">
              Tu pedido ha sido confirmado.
              {externalReference && (
                <span className="mt-1 block font-mono text-sm">
                  Orden #{externalReference}
                </span>
              )}
            </p>
          </>
        ) : isPending ? (
          <>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 text-4xl">
              ⏳
            </div>
            <h1 className="font-heading text-2xl font-bold text-dark">
              Pago Pendiente
            </h1>
            <p className="mt-3 font-body text-base text-medium-gray">
              Tu pago está siendo procesado. Te notificaremos cuando se confirme.
            </p>
          </>
        ) : (
          <>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">
              ✕
            </div>
            <h1 className="font-heading text-2xl font-bold text-dark">
              Pago No Completado
            </h1>
            <p className="mt-3 font-body text-base text-medium-gray">
              El pago no se pudo procesar. Puedes intentarlo de nuevo.
            </p>
          </>
        )}

        <Link
          to="/"
          className="mt-8 inline-block rounded-lg bg-green-primary px-8 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-green-hover"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
