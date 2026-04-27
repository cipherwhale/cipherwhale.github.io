export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto max-w-4xl px-4 pt-14 pb-10" id="hero">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Portfolio</p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">William Hale</h1>
        <p className="mt-3 text-slate-300">Electrical Engineer • Materials Scientist • Explorer of Spacetime</p>
      </header>

      <nav className="sticky top-0 border-y border-slate-800 bg-slate-950/90 backdrop-blur">
        <ul className="mx-auto flex max-w-4xl flex-wrap gap-4 px-4 py-3 text-sm text-slate-300">
          <li><a href="#hero">Hero</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#research">Research</a></li>
          <li><a href="#cv">CV</a></li>
          <li><a href="#coursework">Recent Coursework</a></li>
          <li><a href="#hobbies">Hobbies</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <main className="mx-auto max-w-4xl space-y-8 px-4 py-8">
        <section id="about" className="panel">
          <h2>About</h2>
          <p>
            Electrical engineer and materials scientist currently supporting microwave primary standards at Sandia National
            Laboratories while continuing physics coursework at the University of New Mexico.
          </p>
        </section>

        <section id="research" className="panel">
          <h2>Research</h2>
          <p>Computational materials and electrochemical systems research, including DFT workflows with VASP.</p>
          <p><a className="link" href="#" aria-label="Thesis placeholder link">View Thesis (Placeholder)</a></p>
        </section>

        <section id="cv" className="panel">
          <h2>CV</h2>
          <p><a className="link" href="#" aria-label="CV placeholder link">Download CV (Placeholder)</a></p>
          <p><a className="link" href="#" aria-label="Resume placeholder link">Download Resume (Placeholder)</a></p>
        </section>

        <section id="coursework" className="panel">
          <h2>Recent Coursework</h2>
          <ul>
            <li>Electrodynamics</li>
            <li>Introduction to Partial Differential Equations</li>
            <li>Analytical Mechanics I</li>
            <li>Intermediate Quantum Mechanics I</li>
            <li>Mathematical Methods of Physics</li>
            <li>Complex Analysis</li>
          </ul>
        </section>

        <section id="hobbies" className="panel">
          <h2>Hobbies</h2>
          <ul>
            <li>Physics reading and self-study</li>
            <li>Programming and automation projects</li>
            <li>Electronics prototyping</li>
          </ul>
        </section>

        <section id="contact" className="panel">
          <h2>Contact</h2>
          <p>Email: <a className="link" href="mailto:williamhaleaemail@gmail.com">williamhaleaemail@gmail.com</a></p>
          <p>Phone: <a className="link" href="tel:+15059342340">(505) 934-2340</a></p>
        </section>
      </main>
    </div>
  );
}
