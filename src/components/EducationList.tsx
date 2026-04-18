import { motion } from 'framer-motion';
import { Calendar, Building2, Link, GraduationCap, Award } from 'lucide-react';
import educationData from '../content/education.json';

const mainEducation = educationData[0];
const certifications = educationData.slice(1);

export default function EducationList() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        viewport={{ once: true, amount: 0.2 }}
        className="overflow-hidden rounded-[2rem] border border-white/12 bg-gradient-to-br from-white/[0.1] via-white/[0.06] to-white/[0.035] shadow-2xl shadow-black/25 backdrop-blur-xl"
      >
        <div className="border-b border-white/10 bg-black/10 px-6 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-green-400/20 text-green-200 border border-green-400/20 shadow-[0_0_24px_rgba(74,222,128,0.15)]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-green-300/80">Formación principal</p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">{mainEducation.program}</h3>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-7 lg:p-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 shadow-sm shadow-black/10">
              <Building2 className="h-4 w-4 text-green-300" />
              <span>{mainEducation.institution}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 shadow-sm shadow-black/10">
              <Calendar className="h-4 w-4 text-green-300" />
              <span>{mainEducation.start} - {mainEducation.end}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-green-400/25 bg-green-400/15 px-3 py-1.5 text-green-50 shadow-[0_0_20px_rgba(74,222,128,0.08)]">
              <Award className="h-4 w-4" />
              <span>{mainEducation.degree}</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {mainEducation.highlights.map((highlight) => (
              <div key={highlight} className="rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 shadow-sm shadow-black/10">
                <p className="text-sm leading-7 text-slate-50">{highlight}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 shadow-sm shadow-black/10">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Resumen</p>
            <p className="mt-2 text-sm leading-7 text-slate-100">
              Base académica sólida orientada a gestión de sistemas, con foco en resolver problemas técnicos y construir soluciones estables.
            </p>
          </div>
        </div>
      </motion.article>

      <div className="space-y-4">
        {certifications.map((item, index) => (
          <motion.article
            key={`${item.institution}-${item.program}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-[1.75rem] border border-white/12 bg-gradient-to-br from-white/[0.1] via-white/[0.06] to-white/[0.035] p-5 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:from-white/[0.12] hover:to-white/[0.06]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-green-300/80">Certificación</p>
                <h4 className="mt-1 text-xl font-semibold tracking-tight text-white">{item.program}</h4>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs text-slate-200 shadow-sm shadow-black/10">
                {item.start}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2">
                <Building2 className="h-4 w-4 text-green-300" />
                {item.institution}
              </span>
              {item.fileUrl && (
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-sm text-white transition-colors hover:border-green-400/30 hover:bg-white/12"
                >
                  <Link className="h-4 w-4" />
                  Ver certificado
                </a>
              )}
            </div>

            {item.highlights.length > 0 && (
              <div className="mt-4 space-y-2">
                {item.highlights.map((highlight) => (
                  <div key={highlight} className="rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm leading-7 text-slate-50 shadow-sm shadow-black/10">
                    {highlight}
                  </div>
                ))}
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </div>
  );
}
