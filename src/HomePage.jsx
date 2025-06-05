export default function HomePage() {
  return (
    <main className="p-6 max-w-5xl mx-auto space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">CipherWhale</h1>
        <p className="text-lg text-gray-600">Engineer. Physicist. Coder. Explorer of the unknown.</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">About Me</h2>
        <p>
          I’m William Hale — an electrical engineer and physicist with a passion for advanced gravity theories,
          precision measurement, and artificial intelligence. My background includes microwave metrology,
          numerical simulations, and exploratory physics research. I’m building toward a future where theory,
          hardware, and code converge.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Modified GEM Solver</strong> – A numerical Python tool for modeling self-interacting gravity in galaxy rotation curves.
          </li>
          <li>
            <strong>Compton Scattering Simulator</strong> – A classical hydrodynamic analog experiment using Julia for droplet-wave interaction.
          </li>
          <li>
            <strong>VNA Data Acquisition Suite</strong> – Python interface and analysis toolkit for automated network analyzer measurements.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Background</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Master’s in Materials Engineering</li>
          <li>Bachelor’s in Electrical & Chemical Engineering from New Mexico Tech</li>
          <li>Engineer in a microwave primary standards lab</li>
          <li>FE certified, working toward PE</li>
          <li>Aspiring PhD candidate in modified gravity (Brazil-bound 🇧🇷)</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p>
          You can reach me via GitHub at <a className="text-blue-600 underline" href="https://github.com/cipherwhale">@cipherwhale</a>.
          Future professional contact coming soon.
        </p>
      </section>
    </main>
  );
}
