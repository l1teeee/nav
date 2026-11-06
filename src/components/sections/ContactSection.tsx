export default function ContactSection() {
  return (
    <section id="contacto" className="lobe gap-10 lg:grid-cols-[1fr_auto]">
      <p className="type-lead lg:self-center" data-reveal>
        La pintura fresca
        <br />
        no espera
      </p>
      <div className="grid justify-items-start gap-7 justify-self-end self-end lg:self-auto">
        <h2 className="type-lead" data-reveal>
          Hablemos
          <br />
          antes
          <br />
          de
          <br />
          que
          <br />
          se
          <br />
          seque
        </h2>
        <div className="grid gap-2" data-reveal>
          <h3 className="type-label">Información</h3>
          <address className="type-body not-italic">
            <a className="link-underline" href="mailto:hola@nav.example">
              hola@nav.example
            </a>
            <br />
            Calle de la Tinta, 7
            <br />
            +00 000 000 000
          </address>
        </div>
        <p className="logo" data-reveal>
          Nav
        </p>
      </div>
    </section>
  );
}
