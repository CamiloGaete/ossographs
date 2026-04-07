const projects = [
  { name: "Letrero Corporativo", sub: "Acrílico + LED", h: "h-[320px]" },
  { name: "Señalética Interior", sub: "Oficinas", h: "h-[240px]" },
  { name: "Fachada Iluminada", sub: "Retail", h: "h-[280px]" },
  { name: "Gigantografía Exterior", sub: "Gran Formato", h: "h-[240px]" },
  { name: "Display POP", sub: "Punto de Venta", h: "h-[320px]" },
  { name: "Tótem Publicitario", sub: "Centro Comercial", h: "h-[240px]" },
  { name: "Letras 3D", sub: "PVC Expandido", h: "h-[280px]" },
  { name: "Banner Gran Formato", sub: "Eventos", h: "h-[240px]" },
  { name: "Vitrina Comercial", sub: "Retail", h: "h-[320px]" },
];

export default function Portfolio() {
  const cols = [projects.slice(0, 3), projects.slice(3, 6), projects.slice(6, 9)];

  return (
    <section id="portafolio" className="bg-off-white px-6 py-20 lg:px-20 lg:py-[100px]">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 text-center">
          <p className="mb-3 font-heading text-xs font-semibold tracking-[3px] text-green-primary">
            PORTAFOLIO
          </p>
          <h2 className="font-heading text-[28px] font-bold text-dark lg:text-4xl">
            Nuestros Trabajos
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-5">
              {col.map((p) => (
                <div
                  key={p.name}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-near-black transition-transform duration-300 hover:scale-[1.02] ${p.h}`}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/20 to-transparent opacity-0 backdrop-blur-[1px] transition-opacity duration-350 group-hover:opacity-100" />

                  {/* Label */}
                  <div className="absolute inset-x-0 bottom-5 px-5 transition-transform duration-300 group-hover:translate-y-0">
                    <span className="font-body text-[15px] font-semibold text-white">
                      {p.name}
                    </span>
                    <span className="mt-1 block font-body text-xs text-green-primary">
                      {p.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <p className="mt-12 text-center">
          <a
            href="#"
            className="font-body text-[15px] font-semibold text-green-primary transition-colors hover:text-green-hover"
          >
            Ver Portafolio Completo →
          </a>
        </p>
      </div>
    </section>
  );
}
