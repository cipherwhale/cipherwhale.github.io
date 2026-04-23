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
  {
    title: "Process Engineer Intern — Intel Corporation (Dec 2021 to Aug 2022)",
    bullets: [
      "Improved e-test process and measurement accuracy for advanced nodes.",
      "Analyzed high- and medium-volume measurements and correlation to mass metrology.",
      "Managed experiments, process reliability assessments, and statistical methods for yield improvements.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="panel">
      <h2 className="section-title">Experience — Mission Timeline</h2>
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
