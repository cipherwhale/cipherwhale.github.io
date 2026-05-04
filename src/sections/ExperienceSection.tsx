const roles = [
  {
    title: "Electrical Engineer — Sandia National Laboratories (Jan 2022 to Present)",
    bullets: [
      "Work in microwave primary standards lab supporting calibration and measurement automation.",
      "Perform data analysis and measurement automation across RF standards and tools.",
      "Specialize in S-parameters and power sensor calibration with ISO 17025 compliance.",
      "Drive process improvements and lead tool-set and process development initiatives.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="panel">
      <h2 className="section-title">Experience</h2>
      <div className="space-y-4">
        {roles.map((role) => (
          <article key={role.title}>
            <h3 className="font-semibold text-space-cyan">{role.title}</h3>
            <ul className="list-disc pl-5">
              {role.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
