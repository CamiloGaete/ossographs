const reviews = [
  {
    text: "Excelente lugar para resolver necesidades publicitarias. Gran variedad de productos y servicios, atención personalizada y resultados de primera calidad.",
    name: "María González",
    initials: "MG",
    stars: 5,
  },
  {
    text: "Expertos en publicidad punto de venta. RÁPIDOS Y RESPONSABLES. Los mejores letreros de Santiago, precios justos y entrega a tiempo.",
    name: "Carlos Muñoz",
    initials: "CM",
    stars: 5,
  },
  {
    text: "Gran calidad de trabajo, atendido por el mismo dueño. Se nota la experiencia de años en el rubro. Muy recomendados para cualquier proyecto.",
    name: "Andrea Rojas",
    initials: "AR",
    stars: 4,
  },
];

export default function Reviews() {
  return (
    <section className="relative overflow-hidden bg-dark px-6 py-20 lg:px-20 lg:py-[100px]">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-[30%] -left-[10%] h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(122,182,72,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative z-[1] mx-auto max-w-[1440px]">
        <div className="mb-12 text-center">
          <p className="mb-3 font-heading text-xs font-semibold tracking-[3px] text-green-primary">
            TESTIMONIOS
          </p>
          <h2 className="font-heading text-[28px] font-bold text-white lg:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="relative flex flex-col gap-4 rounded-2xl border border-white/[0.04] bg-near-black p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-green-primary/20"
            >
              {/* Quote mark */}
              <span className="absolute right-6 top-5 font-heading text-5xl leading-none text-green-primary/20">
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex gap-0.5 text-base tracking-[3px] text-amber-400">
                {"★".repeat(r.stars)}
                {"☆".repeat(5 - r.stars)}
              </div>

              {/* Text */}
              <p className="flex-1 font-body text-[15px] leading-[26px] text-white/80">
                {r.text}
              </p>

              {/* Author */}
              <div className="mt-1 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-primary/[0.12] font-heading text-sm font-bold text-green-primary">
                  {r.initials}
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-white">
                    {r.name}
                  </p>
                  <p className="font-body text-xs text-medium-gray">
                    Google Review
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
