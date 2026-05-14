import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowRight, Search, Send } from 'lucide-react';
import aboutData from '../content/about.json';


export default function HeroAbout() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isProjectsHovered, setIsProjectsHovered] = useState(false);
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroGlowY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const heroCardY = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const heroCardScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  const handleContactClick = () => {
    const contactSection = document.querySelector('#contacto');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectsClick = () => {
    const projectsSection = document.querySelector('#proyectos');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-black pt-28 pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(34,197,94,0.12),transparent_26%),radial-gradient(circle_at_bottom,rgba(6,78,59,0.16),transparent_32%)]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <motion.div style={{ y: heroGlowY }} className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 rounded-full border border-green-400/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-green-200 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_18px_rgba(34,197,94,0.9)]" />
            Portfolio personal
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-5">
            <h1
              className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
              style={{ textWrap: 'balance' }}
            >
              {aboutData.name}
            </h1>
            <p className="max-w-2xl text-2xl font-medium text-green-200 sm:text-3xl">
              {aboutData.role}
            </p>
          </motion.div>

          <motion.p variants={itemVariants} className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            {aboutData.bio}
          </motion.p>


          <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row">
            <motion.button
              type="button"
              onClick={handleContactClick}
              onHoverStart={() => setIsContactHovered(true)}
              onHoverEnd={() => setIsContactHovered(false)}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-400 px-6 py-4 font-semibold text-black transition-transform duration-200 hover:scale-[1.02]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isContactHovered ? (
                  <motion.span
                    key="paper-plane"
                    initial={{ opacity: 0, x: -6, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 8, y: -6, scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex"
                  >
                    <Send className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="mail"
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex"
                  >
                    <Mail className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
              Contactar
            </motion.button>
            <motion.button
              type="button"
              onClick={handleProjectsClick}
              onHoverStart={() => setIsProjectsHovered(true)}
              onHoverEnd={() => setIsProjectsHovered(false)}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/5 px-6 py-4 font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:border-green-400/40 hover:bg-white/10"
            >
              Ver proyectos
              <AnimatePresence mode="wait" initial={false}>
                {isProjectsHovered ? (
                  <motion.span
                    key="search"
                    initial={{ opacity: 0, x: -8, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 8, scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex"
                  >
                    <Search className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="arrow"
                    initial={{ opacity: 0, x: -8, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 8, scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
            <motion.a
              href={aboutData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className="inline-flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-green-200 transition-colors hover:border-white hover:bg-black hover:text-white"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 transition-colors hover:text-white" />
              <span className="text-sm font-medium">GitHub</span>
            </motion.a>
            <motion.a
              href={aboutData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className="inline-flex min-h-12 items-center gap-3 rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-3 text-green-100 transition-colors hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 transition-colors hover:text-white" />
              <span className="text-sm font-medium">LinkedIn</span>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-green-400/10 via-transparent to-cyan-400/10 blur-2xl" />

          <motion.div style={{ y: heroCardY, scale: heroCardScale }} className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl shadow-black/40 lg:max-w-[390px]">
            <img
              src={aboutData.avatar}
              alt={aboutData.name}
              className="aspect-[4/5] w-full object-cover object-center"
              loading="eager"
            />
            {/* vignette: corners + bottom fade */}
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_0_0_60px_30px_rgba(0,0,0,0.75)]" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
