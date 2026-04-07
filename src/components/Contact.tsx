import { Input } from "@/app/components/ui/input";
import { Select } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";

const serviceOptions = [
  { value: "producto", label: "Cotización Producto" },
  { value: "servicio", label: "Cotización Servicio" },
  { value: "general", label: "Consulta General" },
];

const contactDetails = [
  {
    label: "Teléfono fijo",
    value: "(2) 2222 4338",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-green-primary">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
  {
    label: "Horario de atención",
    value: "Lunes a Viernes, 9:00 – 18:00",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-green-primary">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Santiago Centro",
    value: "Av. Vicuña Mackenna 997",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-green-primary">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contacto" className="bg-off-white px-6 py-20 lg:px-20 lg:py-[100px]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 lg:flex-row lg:gap-20">
        {/* Form */}
        <div className="flex flex-1 flex-col gap-6">
          <h2 className="font-heading text-[28px] font-bold text-dark lg:text-4xl">
            Solicita una Cotización
          </h2>
          <p className="-mt-2 font-body text-[15px] leading-6 text-medium-gray">
            Cuéntanos sobre tu proyecto y te enviamos una cotización sin
            compromiso.
          </p>

          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input label="Nombre" type="text" name="nombre" placeholder="Tu nombre completo" />
            <Input label="Email" type="email" name="email" placeholder="correo@ejemplo.cl" />
            <Input label="Teléfono" type="tel" name="telefono" placeholder="+56 9 1234 5678" />
            <Select
              label="Tipo de servicio"
              name="tipo"
              options={serviceOptions}
            />
            <Textarea label="Mensaje" name="mensaje" rows={4} placeholder="Describe tu proyecto..." />
            <Button type="submit" size="lg" className="w-full">
              Enviar Consulta
            </Button>
          </form>
        </div>

        {/* Map & info */}
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex h-[300px] items-center justify-center rounded-2xl border border-black/[0.04] bg-light-gray">
            <p className="text-center font-body text-sm font-medium text-medium-gray">
              Google Maps
              <br />
              Av. Vicuña Mackenna 997
            </p>
          </div>

          {contactDetails.map((d) => (
            <div
              key={d.label}
              className="flex items-center gap-4 rounded-xl border border-black/[0.04] bg-white px-5 py-4 transition-colors hover:border-green-primary"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-primary/[0.08]">
                {d.icon}
              </div>
              <div>
                <p className="font-body text-[15px] font-medium text-dark">
                  {d.value}
                </p>
                <p className="mt-0.5 font-body text-xs text-medium-gray">
                  {d.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
