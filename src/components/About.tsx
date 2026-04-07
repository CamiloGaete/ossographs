const stats = [
  { num: "15+", label: "Años" },
  { num: "500+", label: "Proyectos" },
  { num: "25+", label: "Reseñas Google" },
  { num: "1", label: "Santiago Centro" },
];

export default function About() {
  return (
    <section id="nosotros" className="bg-white px-6 py-20 lg:px-20 lg:py-[100px]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 lg:flex-row lg:gap-20">
        {/* Photo placeholder */}
        <div className="relative h-[280px] w-full shrink-0 overflow-hidden rounded-3xl bg-light-gray lg:h-[480px] lg:w-[520px]">
          <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-6">
          <span className="w-fit rounded-md border border-green-primary/15 bg-green-primary/[0.08] px-4 py-2 font-heading text-xs font-semibold tracking-[3px] text-green-primary">
            QUIÉNES SOMOS
          </span>

          <h2 className="font-heading text-[28px] font-bold leading-[1.25] text-dark lg:text-4xl">
            Más de 15 años de
            <br />
            oficio publicitario
          </h2>

          <p className="max-w-[520px] font-body text-base leading-7 text-medium-gray">
            Ossographic nace del oficio y la pasión por la publicidad visual.
            Desde nuestro taller en Av. Vicuña Mackenna, la familia Cañas Osso
            lleva más de 15 años fabricando letreros, gigantografías y
            soluciones gráficas para negocios de todo Santiago. Cada proyecto se
            trabaja con dedicación artesanal y atención directa del dueño.
          </p>

          <div className="flex flex-wrap gap-8 pt-4 lg:gap-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="bg-gradient-to-br from-green-primary to-green-dark bg-clip-text font-heading text-4xl font-bold text-transparent">
                  {s.num}
                </p>
                <p className="mt-1 font-body text-[13px] font-medium text-medium-gray">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
