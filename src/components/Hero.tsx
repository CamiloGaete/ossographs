export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[720px] items-center overflow-hidden bg-dark"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(122,182,72,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 10% 90%, rgba(122,182,72,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-[1] mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-6 py-12 lg:flex-row lg:gap-[60px] lg:px-20 lg:py-20">
        {/* Left content */}
        <div className="flex flex-1 flex-col items-start gap-7">
          <span className="rounded-md border border-green-primary/20 bg-green-primary/10 px-[18px] py-2.5 font-heading text-xs font-semibold tracking-[3px] text-green-primary">
            DISEÑO · IMPRESIÓN · PUBLICIDAD
          </span>

          <h1 className="bg-gradient-to-br from-white to-white/85 bg-clip-text font-heading text-[32px] font-black leading-[1.1] text-transparent lg:text-[64px]">
            Tu marca
            <br />
            merece destacar
          </h1>

          <p className="max-w-[540px] font-body text-base leading-[30px] text-medium-gray lg:text-lg">
            Letreros, gigantografías, impresión full color y productos de
            diseño. Más de 15 años creando soluciones publicitarias en Santiago.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#productos"
              className="flex items-center gap-2 rounded-[10px] bg-gradient-to-br from-green-primary to-green-dark px-9 py-4 font-heading text-base font-bold text-white shadow-[0_4px_16px_var(--green-glow)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_24px_var(--green-glow)] active:translate-y-0"
            >
              Ver Productos <span aria-hidden="true">→</span>
            </a>
            <a
              href="#contacto"
              className="rounded-[10px] border-[1.5px] border-white/25 px-9 py-4 font-heading text-base font-bold text-white transition-all hover:-translate-y-px hover:border-white/40 hover:bg-white/[0.06]"
            >
              Solicitar Cotización
            </a>
          </div>

          <p className="font-body text-sm font-medium text-medium-gray">
            <span className="text-amber-400">★</span> 4.0 en Google · 25+
            reseñas · Santiago Centro
          </p>
        </div>

        {/* Right visual */}
        <div className="relative flex h-[360px] w-full items-center justify-center overflow-hidden rounded-3xl border border-green-primary/15 bg-near-black lg:h-[580px] lg:w-[500px] lg:shrink-0">
          {/* Crosshatch pattern */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(122,182,72,0.03) 20px, rgba(122,182,72,0.03) 21px), repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(122,182,72,0.03) 20px, rgba(122,182,72,0.03) 21px)",
            }}
          />
          <div className="relative z-[1] text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-green-primary/20 bg-green-primary/10">
              <svg
                width="28"
                height="28"
                fill="none"
                stroke="var(--green-primary)"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="m3 16 5-5 4 4 4-6 5 7" />
                <circle cx="8.5" cy="8.5" r="1.5" />
              </svg>
            </div>
            <p className="font-body text-[15px] font-medium text-medium-gray/60">
              Hero Image
              <br />
              Signage &amp; Print Collage
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
