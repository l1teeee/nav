const SECTION_LINKS = [
  { href: "#estudio", label: "Estudio" },
  { href: "#metodo", label: "Método" },
  { href: "#contacto", label: "Contacto" },
];

export default function HeroSection() {
  return (
    <section id="inicio" className="lobe gap-10 lg:grid-cols-[1fr_auto]">
      <div className="flex flex-row-reverse items-start justify-between gap-10 lg:col-start-2 lg:justify-start">
        <h1 className="type-title">Nav</h1>
        <nav aria-label="Secciones">
          <ol className="index">
            {SECTION_LINKS.map((link, position) => (
              <li key={link.href}>
                <a className="type-label link-underline" href={link.href}>
                  [ {position + 1}. {link.label} ]
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <p className="type-lead self-end lg:col-start-1 lg:row-start-1 lg:self-center">
        Ideas que
        <br />
        dejan huella
      </p>
    </section>
  );
}
