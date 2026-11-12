import aboutData from '../content/about.json';
import { GitHubIcon, LinkedInIcon } from './icons';

const [firstName, ...rest] = aboutData.name.split(' ');
const lastName = rest.join(' ');

const socialLinks = [
  { name: 'GitHub', href: aboutData.links.github, Icon: GitHubIcon, size: 24 },
  { name: 'LinkedIn', href: aboutData.links.linkedin, Icon: LinkedInIcon, size: 22 },
];

const ctaCircle =
  'font-display uppercase text-forest bg-crest transition-transform duration-[450ms] ease-snap motion-safe:hover:-rotate-[10deg] motion-safe:hover:scale-[1.07] motion-safe:focus-visible:-rotate-[10deg] motion-safe:focus-visible:scale-[1.07]';

export default function HeroAbout() {
  return (
    <>
      <div className="relative overflow-hidden bg-mandarin px-5 pb-7 pt-4 md:px-10 md:pb-10 md:pt-6">
        {/* Decorative cream blobs */}
        <div
          aria-hidden="true"
          className="absolute -bottom-[220px] -left-[180px] h-[420px] w-[420px] rounded-full bg-cream md:-bottom-[300px] md:-left-[200px] md:h-[640px] md:w-[640px]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-[110px] top-[120px] h-[300px] w-[220px] rounded-full bg-cream md:-right-[160px] md:top-6 md:h-[560px] md:w-[420px]"
        />

        {/* Name */}
        <h1 className="hero-name relative m-0 pt-2 font-display font-normal uppercase leading-[0.86] tracking-[-0.01em]">
          <span className="sr-only">{aboutData.name}, {aboutData.role}</span>
          <span aria-hidden="true" className="flex items-start">
            <span className="hero-first relative z-[1] block text-crest">{firstName}</span>
            <img
              src={aboutData.avatar}
              alt=""
              width={220}
              height={272}
              data-reveal
              className="hero-photo relative z-[2] hidden -rotate-[4deg] rounded-[999px_999px_28px_28px] border-[6px] border-cream object-cover md:block"
            />
          </span>
          <span aria-hidden="true" className="hero-last relative z-[3] block text-forest">
            {lastName}
          </span>
        </h1>

        {/* Bottom row */}
        <div className="relative z-[3] mt-5 grid grid-cols-1 items-end gap-5 md:mt-0 md:gap-8 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-10">
          <div className="flex max-w-[440px] flex-col gap-3 md:gap-[22px]">
            <div className="flex items-center gap-5">
              <img
                src={aboutData.avatar}
                alt={aboutData.name}
                width={104}
                height={128}
                className="h-32 w-[104px] flex-none -rotate-[4deg] rounded-[999px_999px_20px_20px] border-[5px] border-cream object-cover md:hidden"
              />
              <p data-reveal className="m-0 text-lg font-medium leading-[1.3] text-ink [text-wrap:pretty] md:text-[22px]">
                {aboutData.bio}
              </p>
            </div>
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-base font-bold uppercase tracking-[0.08em]">
              {socialLinks.map(({ name, href, Icon, size }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2.5 transition-colors duration-200 hover:text-forest"
                  >
                    <Icon size={size} />
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="label m-0 flex flex-col gap-1 text-[13px] lg:pb-5 lg:text-right">
            <span>{aboutData.role}</span>
            <span>Desde {aboutData.since}</span>
          </p>

          <a
            href="#contacto"
            className={`${ctaCircle} grid h-[52px] w-full place-items-center rounded-full text-2xl md:h-40 md:w-40 md:justify-self-end md:text-[34px]`}
          >
            Hablemos
          </a>
        </div>
      </div>

      {/* Checker band + static stack list */}
      <div aria-hidden="true" className="h-[22px] bg-checker" />
      <div className="bg-forest px-5 py-4 md:px-10 md:py-[22px]">
        <h2 className="sr-only">Stack</h2>
        <ul className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1 font-display text-xl uppercase md:gap-x-[22px] md:gap-y-1.5 text-crest md:text-[30px]">
          {aboutData.stack.map((tech, index) => (
            <li key={tech} className="flex items-baseline gap-x-3.5 md:gap-x-[22px]">
              {tech}
              {index < aboutData.stack.length - 1 && (
                <span aria-hidden="true" className="text-mandarin">
                  /
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
