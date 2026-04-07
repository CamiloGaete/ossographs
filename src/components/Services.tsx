const services = [
  {
    name: "Letreros Acrílicos",
    desc: "Fabricación y diseño de letreros en acrílico con corte láser y CNC",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[22px] w-[22px] text-green-primary">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M8 20h8" /><path d="M12 16v4" />
      </svg>
    ),
  },
  {
    name: "Impresión Gran Formato UV",
    desc: "Gigantografías en alta resolución para exterior e interior",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[22px] w-[22px] text-green-primary">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="m3 16 5-5 4 4 4-6 5 7" />
      </svg>
    ),
  },
  {
    name: "Señalética Luminosa LED",
    desc: "Letreros iluminados con tecnología LED de bajo consumo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[22px] w-[22px] text-green-primary">
        <path d="M12 2v1M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM9 18h6M10 22h4" />
      </svg>
    ),
  },
  {
    name: "Publicidad Punto de Venta",
    desc: "Displays, tótems y material POP para espacios comerciales",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[22px] w-[22px] text-green-primary">
        <path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Diseño Gráfico Publicitario",
    desc: "Identidad visual, branding y piezas gráficas profesionales",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[22px] w-[22px] text-green-primary">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
  },
  {
    name: "Flexografía y Hologramas",
    desc: "Impresión especializada con acabados de seguridad",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-[22px] w-[22px] text-green-primary">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><path d="M12 12h.01" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden bg-dark px-6 py-20 lg:px-20 lg:py-[100px]">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -right-[20%] -top-1/2 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(122,182,72,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-[1] mx-auto flex max-w-[1440px] flex-col gap-10 lg:flex-row lg:gap-20">
        {/* Image placeholder */}
        <div className="relative h-[280px] w-full shrink-0 overflow-hidden rounded-3xl border border-white/[0.06] bg-near-black lg:h-[560px] lg:w-[520px]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(122,182,72,0.02) 30px, rgba(122,182,72,0.02) 31px)" }}
          />
        </div>

        {/* Service list */}
        <div className="flex flex-1 flex-col gap-9">
          <p className="font-heading text-xs font-semibold tracking-[3px] text-green-primary">
            SERVICIOS
          </p>
          <h2 className="font-heading text-[28px] font-bold leading-[1.2] text-white lg:text-[40px]">
            Servicios a Medida
          </h2>

          <div className="flex flex-col gap-5">
            {services.map((s) => (
              <div
                key={s.name}
                className="flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-white/[0.03]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-primary/[0.12] transition-colors group-hover:bg-green-primary/20">
                  {s.icon}
                </div>
                <div>
                  <h3 className="font-body text-base font-semibold text-white">
                    {s.name}
                  </h3>
                  <p className="mt-1 font-body text-sm leading-[22px] text-medium-gray">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#contacto"
            className="flex w-fit items-center gap-2 rounded-[10px] bg-gradient-to-br from-green-primary to-green-dark px-10 py-4 font-heading text-base font-bold text-white shadow-[0_4px_16px_var(--green-glow)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_24px_var(--green-glow)] active:translate-y-0"
          >
            Cotizar Proyecto <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
