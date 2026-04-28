export default function ResearchSection() {
  return (
    <section id="research-missions" className="panel tesseract">
      <div className="section-kicker">Selected Work</div>
      <h2 className="section-title">Research & Publications</h2>
      <div className="grid gap-5 md:grid-cols-2">
        <article className="content-card">
          <h3 className="content-card-title">Published Paper</h3>
          <p className="muted leading-7">
            Thermodynamic stability and intrinsic activity of La₁₋ₓSrₓMnO₃ as a bifunctional
            OER/ORR electrocatalyst, published in <em>Catalysts</em>.
          </p>
          <a
            className="text-link mt-4 inline-block"
            href="https://www.mdpi.com/2073-4344/12/3/260"
            target="_blank"
            rel="noreferrer"
          >
            Open published paper ↗
          </a>
        </article>

        <article className="content-card">
          <h3 className="content-card-title">Master’s Thesis</h3>
          <p className="muted leading-7">
            Thesis work connected to computational materials, oxygen-deficient manganite catalysts,
            and electrocatalytic performance.
          </p>
          <a
            className="text-link mt-4 inline-block"
            href="https://www.proquest.com/openview/ebe8f9eaa8844b307763ca1fa3c1a316/1?pq-origsite=gscholar&cbl=18750&diss=y"
            target="_blank"
            rel="noreferrer"
          >
            Open thesis ↗
          </a>
        </article>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        <div className="research-pill">Computational materials</div>
        <div className="research-pill">Microwave metrology</div>
        <div className="research-pill">Physics simulation</div>
      </div>
    </section>
  );
}
