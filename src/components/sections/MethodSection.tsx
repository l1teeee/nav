const METHOD_STEPS = [
  { name: "Escuchar", description: "Primero café, después preguntas." },
  { name: "Manchar", description: "Bocetos rápidos y errores felices." },
  { name: "Pulir", description: "Quitamos todo lo que sobra." },
  { name: "Soltar", description: "Sale al mundo y brindamos." },
];

export default function MethodSection() {
  return (
    <section id="metodo" className="lobe content-between gap-10">
      <p className="type-label" data-reveal>
        [ Método ]
      </p>
      <h2 className="type-statement max-w-[14ch]" data-reveal>
        Cuatro pasos, cero humo.
      </h2>
      <ol className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {METHOD_STEPS.map((step, position) => (
          <li key={step.name} className="grid content-start gap-2" data-reveal>
            <p className="type-label">
              [ {position + 1}. {step.name} ]
            </p>
            <p className="type-body">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
