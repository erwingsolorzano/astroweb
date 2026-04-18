import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Sparkles, ArrowRight } from 'lucide-react';
import { events } from '../lib/analytics';
import projectsData from '../content/projects.json';

const featuredProject = projectsData.find((project) => project.featured) ?? projectsData[0];
const secondaryProjects = projectsData.filter((project) => project !== featuredProject);

export default function ProjectsGrid() {
  const handleProjectClick = (projectName: string, url: string) => {
    events.projectClick(projectName);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const isLiveUrl = (url: string) => {
    try {
      return !new URL(url).hostname.includes('github.com');
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <p className="text-sm text-slate-300 font-body">
          {projectsData.length} proyectos seleccionados. En foco, los más representativos.
        </p>
        <div className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-green-200 sm:self-auto">
          <Sparkles className="h-4 w-4" />
          Selección curada
        </div>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden rounded-[2rem] border border-green-400/20 bg-white/[0.04] shadow-2xl shadow-black/25 backdrop-blur-xl"
      >
        <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[260px] bg-black/20 p-4 sm:min-h-[340px] lg:min-h-[420px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-400/10 via-transparent to-transparent" />
            {featuredProject.images?.[0] ? (
              <img
                src={featuredProject.images[0]}
                alt={`${featuredProject.name} preview`}
                className="relative z-10 h-full w-full rounded-[1.5rem] object-cover shadow-2xl shadow-black/30"
                loading="lazy"
              />
            ) : (
              <div className="relative z-10 flex h-full items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/20">
                <Star className="h-10 w-10 text-green-300/50" />
              </div>
            )}
          </div>

          <div className="flex h-full flex-col justify-between gap-6 p-6 sm:p-8 lg:p-10">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-green-200">
                  <Star className="h-4 w-4" />
                  Proyecto destacado
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">
                  {featuredProject.featured ? 'Featured' : 'Portfolio'}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {featuredProject.name}
                </h3>
                <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  {featuredProject.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {featuredProject.impact.map((impact) => (
                  <div key={impact} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Impacto</p>
                    <p className="mt-2 text-sm leading-7 text-slate-200">{impact}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.24em] text-green-300/80">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.stack.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {featuredProject.links.demo && (
                  <motion.button
                    onClick={() => handleProjectClick(featuredProject.name, featuredProject.links.demo!)}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-400 px-5 py-3 text-sm font-semibold text-black"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver en vivo
                  </motion.button>
                )}
                {featuredProject.links.github && (
                  <motion.button
                    onClick={() => handleProjectClick(featuredProject.name, featuredProject.links.github!)}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white"
                  >
                    {isLiveUrl(featuredProject.links.github) ? <ExternalLink className="h-4 w-4" /> : <Github className="h-4 w-4" />}
                    {isLiveUrl(featuredProject.links.github) ? 'Ver en vivo' : 'Ver código'}
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.article>

      <div className="grid gap-6 md:grid-cols-2">
        {secondaryProjects.map((project, index) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20 backdrop-blur-xl"
          >
            <div className="relative h-44 overflow-hidden bg-black/20">
              {project.images?.[0] ? (
                <img
                  src={project.images[0]}
                  alt={`${project.name} preview`}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Star className="h-10 w-10 text-green-300/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-green-300/70">Proyecto</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">{project.name}</h3>
              </div>

              <p className="text-sm leading-7 text-slate-300">
                {project.description}
              </p>

              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Impacto</p>
                <p className="mt-2 text-sm leading-7 text-slate-200">{project.impact[0]}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-slate-200">
                    {tech}
                  </span>
                ))}
                {project.stack.length > 4 && (
                  <span className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1.5 text-sm text-green-200">
                    +{project.stack.length - 4}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {project.links.demo && (
                  <motion.button
                    onClick={() => handleProjectClick(project.name, project.links.demo!)}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-400 px-4 py-3 text-sm font-semibold text-black"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Ver en vivo
                  </motion.button>
                )}
                {project.links.github && (
                  <motion.button
                    onClick={() => handleProjectClick(project.name, project.links.github!)}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white"
                  >
                    {isLiveUrl(project.links.github) ? <ExternalLink className="h-4 w-4" /> : <Github className="h-4 w-4" />}
                    {isLiveUrl(project.links.github) ? 'Ver en vivo' : 'Código'}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
