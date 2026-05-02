import moleculesArt from "../assets/molecules3.png";

export default function ResearchSection() {
  return (
    <section id="research-missions" className="panel relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <img
          src={moleculesArt}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: 0.5,
            mixBlendMode: "screen",
            filter:
              "grayscale(100%) contrast(1.02) brightness(0.95) drop-shadow(0 0 20px rgba(255,255,255,0.04))",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 42%, rgba(0,0,0,0.78) 62%, rgba(0,0,0,0.28) 84%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 42%, rgba(0,0,0,0.78) 62%, rgba(0,0,0,0.28) 84%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(8,16,37,0.86) 0%,
                rgba(8,16,37,0.76) 24%,
                rgba(8,16,37,0.70) 52%,
                rgba(8,16,37,0.84) 100%
              ),
              radial-gradient(
                ellipse at center,
                rgba(8,16,37,0.18) 0%,
                rgba(8,16,37,0.36) 58%,
                rgba(8,16,37,0.58) 100%
              )
            `,
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="section-kicker">Selected Work</div>
        <h2 className="section-title">Research & Publications</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <article className="content-card bg-[#081025cc] backdrop-blur-[2px]">
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

          <article className="content-card bg-[#081025cc] backdrop-blur-[2px]">
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
          <div className="research-pill bg-[#081025cc] backdrop-blur-[2px]">Computational materials</div>
          <div className="research-pill bg-[#081025cc] backdrop-blur-[2px]">Microwave metrology</div>
          <div className="research-pill bg-[#081025cc] backdrop-blur-[2px]">Physics simulation</div>
        </div>
      </div>
    </section>
  );
}
