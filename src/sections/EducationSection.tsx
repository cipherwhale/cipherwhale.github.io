export default function EducationSection() {
  return (
    <section id="education" className="panel">
      <div className="section-kicker">Academic Background</div>
      <h2 className="section-title">Education</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <article className="content-card">
          <h3 className="content-card-title">M.S. Materials Engineering</h3>
          <p className="muted">New Mexico Tech · Jun 2020 – Jan 2022 · GPA 4.0</p>
          <p className="mt-3 leading-7">
            Thesis work on A-site access, oxygen-deficient manganite catalysts, and computational
            materials modeling.
          </p>
          <a
            className="text-link mt-4 inline-block"
            href="https://www.proquest.com/openview/ebe8f9eaa8844b307763ca1fa3c1a316/1?pq-origsite=gscholar&cbl=18750&diss=y"
            target="_blank"
            rel="noreferrer"
          >
            View thesis ↗
          </a>
        </article>
        <article className="content-card">
          <h3 className="content-card-title">B.S. Electrical Engineering & B.S. Chemical Engineering</h3>
          <p className="muted">New Mexico Tech · Aug 2017 – May 2020 · GPA 3.97 / 4.00</p>
          <p className="mt-3 leading-7">
            Graduated with honors. FE Certified. Senior project focused on an atmospheric plasma
            and glow discharge system.
          </p>
        </article>
      </div>
    </section>
  );
}
