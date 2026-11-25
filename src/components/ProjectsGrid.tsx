import projectsData from '../content/projects.json';
import { ArrowIcon } from './icons';

interface Project {
  name: string;
  kind: string;
  description: string;
  stack: string[];
  links: { demo?: string; github?: string; testers?: { label: string; href: string }[] };
  image: string;
}

const projects = projectsData as Project[];
const pad = (n: number) => String(n).padStart(2, '0');
const pill =
  'label flex flex-none items-center gap-2.5 whitespace-nowrap rounded-full bg-forest py-[5px] pl-4 pr-[5px] text-cream';
const pillIcon = 'grid h-[26px] w-[26px] place-items-center rounded-full bg-crest text-forest';

export default function ProjectsGrid() {
  return (
    <section id="proyectos" className="scroll-mt-4 bg-cream px-5 pb-20 pt-16 md:px-10 md:pt-24">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <h2 data-reveal className="section-title text-forest">
          Proyectos
        </h2>
        <span className="font-display text-[clamp(32px,4.4vw,56px)] leading-[0.8] text-mandarin">
          ({pad(projects.length)})
        </span>
      </div>

      <ul className="border-b-2 border-ink">
        {projects.map((project, index) => {
          const testers = project.links.testers;
          const href = project.links.demo ?? project.links.github;
          const cta = project.links.demo ? 'Ver en vivo' : 'Código';
          // A row with several links can't be a single anchor (no nested <a>).
          const Row = testers ? 'div' : 'a';
          const rowProps = testers ? {} : { href, target: '_blank', rel: 'noopener noreferrer' };

          return (
            <li
              key={project.name}
              data-reveal
              style={{ '--reveal-delay': `${index * 120}ms` } as React.CSSProperties}
              className="border-t-2 border-ink"
            >
              <Row
                {...rowProps}
                className="group grid grid-cols-1 gap-5 py-8 transition-colors duration-[250ms] hover:text-mandarin focus-visible:text-mandarin md:grid-cols-[96px_280px_minmax(0,1fr)] md:items-start md:gap-10 md:py-9"
              >
                <span className="font-display text-[40px] leading-[0.85] text-mandarin md:text-[56px]">
                  {pad(index + 1)}
                </span>

                <div className="aspect-[3/2] overflow-hidden rounded-[18px] bg-forest transition-[transform,box-shadow] duration-500 ease-snap motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:-rotate-2 group-hover:shadow-[0_24px_48px_-12px_rgba(232,243,84,.35)]">
                  <img
                    src={project.image}
                    alt={`Captura de ${project.name}`}
                    loading="lazy"
                    decoding="async"
                    width={840}
                    height={560}
                    className="block h-full w-full object-cover brightness-[.85] grayscale-[.6] transition-[filter,transform] duration-700 ease-snap group-hover:brightness-100 group-hover:grayscale-0 motion-safe:group-hover:scale-[1.08] [@media(hover:none)]:brightness-100 [@media(hover:none)]:grayscale-0"
                  />
                </div>

                <div className="flex min-h-full flex-col gap-3.5">
                  <span className="label text-forest">{project.kind}</span>
                  <h3 className="m-0 font-display text-[clamp(44px,5.6vw,72px)] font-normal uppercase leading-[0.85] [text-wrap:balance]">
                    {project.name}
                  </h3>
                  <p className="m-0 max-w-[540px] text-[17px] leading-normal text-ink">{project.description}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2.5">
                    <span className="text-xs font-semibold uppercase tracking-[0.06em] text-forest">
                      {project.stack.join(' · ')}
                    </span>
                    {testers ? (
                      <span className="flex flex-wrap gap-2.5">
                        {testers.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${pill} transition-colors hover:bg-mandarin focus-visible:bg-mandarin`}
                          >
                            {link.label}
                            <span className={pillIcon}>
                              <ArrowIcon />
                            </span>
                          </a>
                        ))}
                      </span>
                    ) : (
                      <span className={pill}>
                        {cta}
                        <span className={pillIcon}>
                          <ArrowIcon />
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </Row>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
