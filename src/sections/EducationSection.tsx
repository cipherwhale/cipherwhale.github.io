export default function EducationSection() {
  return (
    <section id="education" className="panel">
      <h2 className="section-title">Education</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <article>
          <h3 className="font-semibold text-space-cyan">M.S. Materials Engineering — New Mexico Tech (Jun 2020 – Jan 2022)</h3>
          <p className="muted">GPA: 4.0</p>
          <p>Thesis: A-site Access and Oxygen Deficient LaMnMn2O5 (GEM ORR Catalyst)</p>
        </article>
        <article>
          <h3 className="font-semibold text-space-cyan">B.S. Electrical Engineering & B.S. Chemical Engineering — New Mexico Tech (Aug 2017 – May 2020)</h3>
          <p className="muted">Graduated with honors, GPA 3.97 / 4.00</p>
          <p>FE Certified (2020); Senior Project: Atmospheric Plasma & Glow Discharge System</p>
        </article>
      </div>
    </section>
  );
}
