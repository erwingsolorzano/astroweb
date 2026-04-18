import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import experienceData from '../content/experience.json';

export default function ExperienceList() {
  const [expandedJobs, setExpandedJobs] = useState<Set<number>>(new Set());

  const toggleJobExpansion = (index: number) => {
    const next = new Set(expandedJobs);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setExpandedJobs(next);
  };

  return (
    <div className="relative space-y-10 lg:space-y-12">
      <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-green-400 via-green-400/50 to-transparent lg:left-6" />

      {experienceData.map((job, index) => {
        const hasAchievements = job.achievements.length > 0;
        const isCurrent = index === 0;

        return (
          <motion.article
            key={`${job.company}-${job.start}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative pl-14 lg:pl-16"
          >
            <div className={`absolute left-0 top-7 h-5 w-5 rounded-full border-4 border-black shadow-lg ${isCurrent ? 'bg-green-400 shadow-green-400/60' : 'bg-white/80 shadow-black/30'}`} />

            <div className={`overflow-hidden rounded-[2rem] border bg-white/[0.04] shadow-2xl shadow-black/25 backdrop-blur-xl transition-all duration-300 ${isCurrent ? 'border-green-400/25' : 'border-white/10 hover:border-white/20'}`}>
              <div className="flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-green-200">
                      {isCurrent ? 'Actual' : job.type}
                    </span>
                    <span className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      {job.start} {job.end ? `- ${job.end}` : ''}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-[2rem]">
                      {job.position}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-slate-300">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-green-300" />
                        <span className="text-base font-medium">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>{job.start} - {job.end}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                    {job.description}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-3 lg:min-w-[200px] lg:items-end lg:text-right">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                    <Sparkles className="h-4 w-4 text-green-300" />
                    {isCurrent ? 'En curso' : 'Rol concluido'}
                  </div>
                  <div className="text-sm text-slate-400">
                    <span className="block uppercase tracking-[0.2em] text-xs text-slate-500">Ubicación</span>
                    {job.location}
                  </div>
                </div>
              </div>

              {hasAchievements && (
                <div className="border-t border-white/10 px-6 py-5 sm:px-7">
                  <button
                    onClick={() => toggleJobExpansion(index)}
                    className="inline-flex items-center gap-2 rounded-xl bg-green-400 px-4 py-3 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.01]"
                  >
                    {expandedJobs.has(index) ? 'Ocultar logros' : 'Ver logros'}
                    {expandedJobs.has(index) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedJobs.has(index) ? 'auto' : 0,
                      opacity: expandedJobs.has(index) ? 1 : 0,
                      marginTop: expandedJobs.has(index) ? 16 : 0,
                    }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-3">
                      {job.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                          <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-green-400" />
                          <p className="text-sm leading-7 text-slate-200 sm:text-base">
                            {achievement}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

              <div className="border-t border-white/10 px-6 py-5 sm:px-7">
                <div className="mb-3 text-sm uppercase tracking-[0.24em] text-green-300/80">
                  Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
