import { useState } from "react";

export default function Navbar({
  cartCount,
  onCartClick,
}: {
  cartCount: number;
  onCartClick: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Inicio", href: "#inicio" },
    { label: "Productos", href: "#productos" },
    { label: "Servicios", href: "#servicios" },
    { label: "Portafolio", href: "#portafolio" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-dark/[0.92] backdrop-blur-[16px] backdrop-saturate-[1.8]">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:px-[60px]">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3">
          <img src="/logo.jfif" alt="Ossographic" className="h-10 w-10 rounded-full object-cover shadow-[0_2px_8px_var(--green-glow)]" />
          <span className="font-heading text-lg font-bold tracking-[2px] text-white">
            OSSOGRAPHIC
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative font-body text-sm font-medium text-white/70 transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-green-primary after:transition-all after:duration-250 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <button
            aria-label="Buscar"
            className="hidden text-medium-gray transition-all hover:scale-[1.08] hover:text-white lg:block"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {/* Cart */}
          <button
            onClick={onCartClick}
            aria-label="Carrito"
            className="relative text-medium-gray transition-all hover:scale-[1.08] hover:text-white"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4ZM3 6h18M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gradient-to-br from-green-primary to-green-dark text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* WhatsApp */}
          <a
            href="https://wa.me/56222224338"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hidden text-green-primary transition-opacity hover:opacity-80 lg:block"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </a>

          {/* CTA */}
          <a
            href="#contacto"
            className="hidden rounded-lg bg-gradient-to-br from-green-primary to-green-dark px-6 py-2.5 font-heading text-sm font-bold text-white shadow-[0_2px_8px_var(--green-glow)] transition-all hover:-translate-y-px hover:shadow-[0_4px_16px_var(--green-glow)] active:translate-y-0 lg:block"
          >
            Cotizar
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
            className="text-white lg:hidden"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-dark px-6 pb-6 lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 font-body text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="mt-3 block rounded-lg bg-gradient-to-br from-green-primary to-green-dark px-6 py-3 text-center font-heading text-sm font-bold text-white"
          >
            Cotizar
          </a>
        </div>
      )}
    </nav>
  );
}
