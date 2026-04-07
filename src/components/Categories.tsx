const categories = [
  {
    name: "Letreros Acrílicos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-green-primary">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M8 20h8" />
        <path d="M12 16v4" />
      </svg>
    ),
  },
  {
    name: "Gigantografías",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-green-primary">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="m3 16 5-5 4 4 4-6 5 7" />
      </svg>
    ),
  },
  {
    name: "Impresión Full Color",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-green-primary">
        <path d="M6 9V2h12v7" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
    ),
  },
  {
    name: "Señalética LED",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-green-primary">
        <path d="M9 18h6M10 22h4M12 2v1" />
        <path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
        <path d="m4.22 4.22.71.71M19.07 4.93l-.71.71M2 12h1M21 12h1" />
      </svg>
    ),
  },
  {
    name: "Publicidad POP",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-green-primary">
        <path d="M12 2 2 7l10 5 10-5-10-5Z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Diseño Gráfico",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-green-primary">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
  },
];

export default function Categories() {
  return (
    <section className="bg-off-white px-6 py-[72px] lg:px-20">
      <div className="mx-auto max-w-[1440px]">
        <p className="mb-9 text-center font-heading text-[13px] font-bold tracking-[3px] text-green-primary">
          NUESTRAS CATEGORÍAS
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="group relative flex h-[140px] flex-col items-center justify-center gap-3.5 overflow-hidden rounded-2xl border border-white/[0.04] bg-near-black p-4 transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] lg:h-[180px]"
            >
              {/* Hover gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-green-primary/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-[1] flex h-12 w-12 items-center justify-center rounded-[14px] bg-green-primary/[0.12] transition-colors duration-300 group-hover:bg-green-primary/20">
                {cat.icon}
              </div>
              <span className="relative z-[1] text-center font-body text-[13px] font-medium leading-[18px] text-white/85">
                {cat.name}
              </span>
              <div className="relative z-[1] h-0.5 w-12 rounded-full bg-green-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
