const productLinks = ["Letreros Acrílicos", "Gigantografías", "Impresión Full Color", "Señalética LED", "Publicidad POP"];
const serviceLinks = ["Diseño Gráfico", "Impresión Gran Formato", "Señalética Luminosa", "Publicidad POS", "Flexografía"];
const legalLinks = ["Política de Privacidad", "Términos y Condiciones", "Política de Devoluciones"];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-dark px-6 pb-8 pt-[72px] lg:px-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/logo.jfif" alt="Ossographic" className="h-8 w-8 rounded-full object-cover shadow-[0_2px_8px_var(--green-glow)]" />
              <span className="font-heading text-base font-bold tracking-[1.5px] text-white">
                OSSOGRAPHIC
              </span>
            </div>
            <p className="mt-4 font-body text-sm leading-6 text-medium-gray">
              Diseño, impresión y publicidad
              <br />
              en Santiago desde 2010
            </p>
            <div className="mt-5 flex gap-2.5">
              {[
                { label: "IG", ariaLabel: "Instagram" },
                { label: "FB", ariaLabel: "Facebook" },
                { label: "LI", ariaLabel: "LinkedIn" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.ariaLabel}
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.06] bg-white/[0.04] font-body text-[11px] font-semibold text-medium-gray transition-all hover:border-green-primary/20 hover:bg-green-primary/10 hover:text-green-primary"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-4 font-heading text-[13px] font-bold tracking-[0.5px] text-white">
              Productos
            </h4>
            {productLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="block py-[5px] font-body text-sm text-medium-gray transition-all hover:pl-1 hover:text-green-primary"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-heading text-[13px] font-bold tracking-[0.5px] text-white">
              Servicios
            </h4>
            {serviceLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="block py-[5px] font-body text-sm text-medium-gray transition-all hover:pl-1 hover:text-green-primary"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-heading text-[13px] font-bold tracking-[0.5px] text-white">
              Legal
            </h4>
            {legalLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="block py-[5px] font-body text-sm text-medium-gray transition-all hover:pl-1 hover:text-green-primary"
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/[0.06] pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-body text-[13px] text-white/30">
              © 2026 Ossographic. Todos los derechos reservados.
            </p>
            <div className="flex gap-2">
              {["WebPay", "MercadoPago", "Visa", "MC"].map((pm) => (
                <div
                  key={pm}
                  className="rounded-md border border-white/[0.06] bg-white/[0.04] px-3.5 py-1.5 font-body text-[11px] font-medium text-medium-gray transition-colors hover:border-green-primary/30"
                >
                  {pm}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
