import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Github, Linkedin } from 'lucide-react';
import { events } from '../lib/analytics';
import aboutData from '../content/about.json';

const codeLines = [
  "const portfolio = new Developer('Erwing Solorzano');",
  "portfolio.skills = ['React', 'TypeScript', 'Astro'];", 
  "if (portfolio.isAwesome()) { hire(portfolio); }",
  "function createMagic() { return innovation + passion; }",
  "const future = await buildAmazingThings();",
  "console.log('Welcome to the Matrix...');",
  "class FrontendEngineer extends Developer {",
  "  constructor() { super('creativity'); }",
  "}",
  "const experience = years.map(year => learning++);",
  "export default AlexRivera;",
];

export default function HeroAbout() {
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentFullLine = codeLines[lineIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentFullLine.length) {
        setCurrentLine(currentFullLine.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentLine(currentFullLine.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentFullLine.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setLineIndex((lineIndex + 1) % codeLines.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, lineIndex]);

  const handleDownloadCV = () => {
    events.downloadCV();
    window.open(aboutData.links.cvUrl, '_blank');
  };

  const handleContactClick = () => {
    const contactSection = document.querySelector('#contacto');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-16 bg-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Typewriter Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-mono text-green-500/25 blur-sm select-none h-12 sm:h-14 lg:h-16 xl:h-20 flex items-center max-w-full px-4 text-center leading-tight animate-pulse">
            {currentLine}
            <span className="animate-pulse text-green-400/60 ml-1">|</span>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8 relative z-10"
        >
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative mx-auto w-32 h-32 lg:w-40 lg:h-40 group"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            {/* Terminal-style border */}
            <div className="absolute inset-0 rounded-full border-2 border-green-400 opacity-60"></div>
            <div className="absolute inset-1 rounded-full border border-green-400/40"></div>
            <img
              src={aboutData.avatar}
              alt={aboutData.name}
              className="relative w-full h-full rounded-full object-cover shadow-2xl z-10 group-hover:scale-105 transition-transform duration-300"
              loading="eager"
            />
            {/* Corner brackets like terminal */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-green-400 opacity-80"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-green-400 opacity-80"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-green-400 opacity-80"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-green-400 opacity-80"></div>
          </motion.div>

          {/* Name and Role */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono text-green-400 tracking-wider drop-shadow-lg"
              style={{ 
                fontFamily: "'Fira Code', 'Source Code Pro', 'Monaco', 'Cascadia Code', 'Consolas', 'Courier New', monospace",
                textShadow: '0 0 10px rgba(34, 197, 94, 0.5), 0 0 20px rgba(34, 197, 94, 0.3), 0 0 30px rgba(34, 197, 94, 0.1)'
              }}
            >
              {aboutData.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-xl sm:text-2xl font-mono text-green-300 font-semibold tracking-wide"
              style={{ 
                fontFamily: "'Fira Code', 'Source Code Pro', 'Monaco', 'Cascadia Code', 'Consolas', 'Courier New', monospace"
              }}
            >
              &gt; {aboutData.role}
            </motion.p>
          </div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="text-lg sm:text-xl text-green-200 max-w-2xl mx-auto leading-relaxed font-mono"
          >
            {aboutData.bio}
          </motion.p>

          {/* Bullets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="space-y-3 max-w-2xl mx-auto"
          >
            {aboutData.bullets.map((bullet, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-3 text-green-100 bg-black/90 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg border border-green-500/50 font-mono"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">{bullet}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={handleDownloadCV}
              className="group inline-flex items-center px-8 py-4 bg-green-400 hover:bg-green-500 text-black font-bold font-mono rounded-lg transition-all duration-300 shadow-2xl hover:shadow-green-400/50 hover:scale-105 transform border border-green-400"
            >
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Descargar CV
            </button>
            <button
              onClick={handleContactClick}
              className="group inline-flex items-center px-8 py-4 bg-black/80 hover:bg-black text-green-400 font-bold font-mono rounded-lg border-2 border-green-400 hover:border-green-300 transition-all duration-300 shadow-xl hover:shadow-green-400/30 hover:scale-105 transform backdrop-blur-sm"
            >
              <Mail className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Contactar
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex items-center justify-center space-x-6 pt-4"
          >
            <a
              href={aboutData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 bg-black/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-green-400/30 transition-all duration-300 hover:scale-110 transform border border-green-400/50"
            >
              <Github className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href={aboutData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 bg-black/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-green-400/30 transition-all duration-300 hover:scale-110 transform border border-green-400/50"
            >
              <Linkedin className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}