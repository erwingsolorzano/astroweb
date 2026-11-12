import experienceData from '../content/experience.json';

interface Job {
  company: string;
  position: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

const jobs = experienceData as Job[];
const firstYear = jobs.at(-1)?.start.split(' ').at(-1);

export default function ExperienceList() {
  return (
    <section id="experiencia" className="scroll-mt-4 bg-forest px-5 pb-20 pt-16 text-cream md:px-10 md:pt-24">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <h2 data-reveal className="section-title text-crest">
          Experiencia
        </h2>
        <span className="label text-[13px]">{firstYear} — Hoy</span>
      </div>

      <ol>
        {jobs.map((job, index) => (
          <li
            key={job.company}
            data-reveal
            style={{ '--reveal-delay': `${index * 120}ms` } as React.CSSProperties}
            className="grid grid-cols-1 gap-5 border-t-2 border-forest-line py-8 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 md:py-10 lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,1.1fr)]"
          >
            <div className="label flex flex-col gap-2">
              <span className="flex items-center gap-2.5 text-crest">
                {job.current && (
                  <span className="h-2 w-2 flex-none animate-pulse-ring rounded-full bg-crest" aria-hidden="true" />
                )}
                <span>
                  {job.start} — {job.end}
                  {job.current && <span className="sr-only"> (puesto actual)</span>}
                </span>
              </span>
              <span className="text-forest-muted">{job.location}</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <h3 className="m-0 font-display text-[clamp(40px,4.4vw,56px)] font-normal uppercase leading-[0.88]">
                {job.company}
              </h3>
              <span className="text-[17px] font-semibold text-crest">{job.position}</span>
            </div>

            <div className="flex flex-col gap-3.5 text-[17px] leading-normal text-forest-body md:col-start-2 lg:col-start-auto">
              <p className="m-0">{job.description}</p>
              {job.achievements.length > 0 && (
                <ul className="flex flex-col gap-3.5">
                  {job.achievements.map((achievement) => (
                    <li key={achievement} className="grid grid-cols-[22px_1fr]">
                      <span aria-hidden="true" className="font-black text-mandarin">
                        +
                      </span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
              <span className="text-xs font-semibold uppercase tracking-[0.06em] text-forest-muted">
                {job.technologies.join(' · ')}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
