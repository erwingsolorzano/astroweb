import educationData from '../content/education.json';

interface EducationItem {
  institution: string;
  program: string;
  degree: string;
  start: string;
  end: string;
  highlights: string[];
  fileUrl?: string;
}

const education = educationData as EducationItem[];

export default function EducationList() {
  return (
    <section id="educacion" className="scroll-mt-4 bg-cream px-5 py-16 md:px-10 md:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <h2 data-reveal className="section-title text-mandarin">
          Educación
        </h2>
        <span className="label text-[13px] text-forest">Grado + certificaciones</span>
      </div>

      <ul className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {education.map((item, index) => (
          <li
            key={item.program}
            data-reveal
            style={{ '--reveal-delay': `${index * 120}ms` } as React.CSSProperties}
          >
            <article className="flex h-full flex-col gap-3 rounded-3xl bg-cream-2 p-7 transition-[transform,background-color] duration-[400ms] ease-snap hover:bg-crest focus-within:bg-crest motion-safe:hover:-translate-y-1.5">
              <span className="label text-forest">
                {item.start === item.end ? item.start : `${item.start} — ${item.end}`} · {item.degree}
              </span>
              <h3 className="m-0 font-display text-[clamp(36px,3.4vw,44px)] font-normal uppercase leading-[0.9]">
                {item.program}
              </h3>
              <span className="text-base font-semibold text-forest">{item.institution}</span>
              {item.highlights.map((note) => (
                <p key={note} className="m-0 text-[15px] leading-normal">
                  {note}
                </p>
              ))}
              {item.fileUrl && (
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label mt-1.5 inline-flex min-h-11 items-center self-start rounded-full bg-ink px-4 text-cream"
                >
                  Ver certificado ↗<span className="sr-only"> de {item.program} (abre en una pestaña nueva)</span>
                </a>
              )}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
