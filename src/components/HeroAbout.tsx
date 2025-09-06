import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Github, Linkedin, X } from 'lucide-react';
import { events } from '../lib/analytics';
import aboutData from '../content/about.json';

export default function HeroAbout() {
  const [isAvatarExpanded, setIsAvatarExpanded] = useState(false);

  const handleDownloadCV = () => {
    events.downloadCV();
    window.open(aboutData.links.cvUrl, '_blank');
  };

  const handleContactClick = () => {
    const contactSection = document.querySelector('#contacto');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAvatarClick = () => {
    setIsAvatarExpanded(true);
  };

  const handleCloseAvatar = () => {
    setIsAvatarExpanded(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-16 bg-black relative overflow-hidden w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 sm:space-y-8 w-full"
        >
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 group cursor-pointer"
            onClick={handleAvatarClick}
          >
            {/* Modern glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-cyan-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse"></div>
            
            {/* Rotating border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 p-0.5 group-hover:animate-spin transition-all duration-300">
              <div className="w-full h-full rounded-full bg-black"></div>
            </div>
            
            {/* Inner glow ring */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-green-400/20 to-cyan-400/20 backdrop-blur-sm"></div>
            
            <img
              src={aboutData.avatar}
              alt={aboutData.name}
              className="relative w-full h-full rounded-full object-cover shadow-2xl z-10 group-hover:scale-110 transition-all duration-500 border-2 border-green-400/30"
              loading="eager"
            />
            
            {/* Hover indicator */}
            <div className="absolute inset-0 rounded-full bg-green-400/0 group-hover:bg-green-400/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="text-green-400 text-xs sm:text-sm font-mono bg-black/80 px-2 py-1 rounded-lg backdrop-blur-sm">
                Click para ampliar
              </div>
            </div>
          </motion.div>

          {/* Name and Role */}
          <div className="space-y-3 sm:space-y-4 px-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-mono text-green-400 tracking-wider drop-shadow-lg break-words"
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
              className="text-lg sm:text-xl lg:text-2xl font-mono text-green-300 font-semibold tracking-wide break-words"
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
            className="text-base sm:text-lg lg:text-xl text-green-200 max-w-2xl mx-auto leading-relaxed font-mono px-2"
          >
            {aboutData.bio}
          </motion.p>

          {/* Bullets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="space-y-2 sm:space-y-3 max-w-2xl mx-auto px-2"
          >
            {aboutData.bullets.map((bullet, index) => (
              <div
                key={index}
                className="flex items-center justify-center space-x-2 sm:space-x-3 text-green-100 bg-black/90 backdrop-blur-sm rounded-lg px-3 sm:px-6 py-2 sm:py-3 shadow-lg border border-green-500/50 font-mono text-sm sm:text-base"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium text-center">{bullet}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 px-2"
          >
            <button
              onClick={handleDownloadCV}
              className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-green-400 hover:bg-green-500 text-black font-bold font-mono rounded-lg transition-all duration-300 shadow-2xl hover:shadow-green-400/50 hover:scale-105 transform border border-green-400 text-sm sm:text-base w-full sm:w-auto justify-center"
            >
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Descargar CV
            </button>
            <button
              onClick={handleContactClick}
              className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-black/80 hover:bg-black text-green-400 font-bold font-mono rounded-lg border-2 border-green-400 hover:border-green-300 transition-all duration-300 shadow-xl hover:shadow-green-400/30 hover:scale-105 transform backdrop-blur-sm text-sm sm:text-base w-full sm:w-auto justify-center"
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
            className="flex items-center justify-center space-x-4 sm:space-x-6 pt-4"
          >
            <a
              href={aboutData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 sm:p-3 bg-black/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-green-400/30 transition-all duration-300 hover:scale-110 transform border border-green-400/50"
            >
              <Github className="w-5 sm:w-6 h-5 sm:h-6 text-green-400 group-hover:text-green-300 transition-colors" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href={aboutData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 sm:p-3 bg-black/80 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-green-400/30 transition-all duration-300 hover:scale-110 transform border border-green-400/50"
            >
              <Linkedin className="w-5 sm:w-6 h-5 sm:h-6 text-green-400 group-hover:text-green-300 transition-colors" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Avatar Modal */}
        {isAvatarExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
            onClick={handleCloseAvatar}
          >
            {/* Terminal Window Container */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 50, rotateX: -15 }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 300,
                opacity: { duration: 0.3 },
                y: { duration: 0.4 },
                rotateX: { duration: 0.4 }
              }}
              className="relative max-w-2xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
              style={{ perspective: '1000px' }}
            >
              {/* Terminal Window */}
              <div className="bg-gray-900 rounded-lg border-2 border-green-400/50 shadow-2xl shadow-green-400/20 overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-green-400/10 border-b border-green-400/30">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-green-400 font-mono text-sm">erwing@portfolio:~/profile$</span>
                  </div>
                  <button
                    onClick={handleCloseAvatar}
                    className="p-1 hover:bg-green-400/20 rounded transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-green-400" />
                  </button>
                </div>

                {/* Terminal Content */}
                <div className="p-6 bg-black">
                  {/* Command Line */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 text-green-400 font-mono text-sm mb-2">
                      <span>$</span>
                      <span className="animate-pulse">cat developer_profile.txt</span>
                    </div>
                  </div>

                  {/* Profile Content */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Avatar Section */}
                    <div className="space-y-4">
                      <div className="relative">
                        {/* Matrix-style border effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-lg animate-pulse"></div>
                        <div className="relative border-2 border-green-400/50 rounded-lg overflow-hidden bg-black/50 p-1">
                          <img
                            src={aboutData.avatar}
                            alt={aboutData.name}
                            className="w-full aspect-square object-cover rounded-md"
                          />
                        </div>
                      </div>
                      
                      {/* System Info */}
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex justify-between text-green-300">
                          <span>STATUS:</span>
                          <span className="text-green-400">ONLINE</span>
                        </div>
                        <div className="flex justify-between text-green-300">
                          <span>UPTIME:</span>
                          <span className="text-green-400">24/7</span>
                        </div>
                        <div className="flex justify-between text-green-300">
                          <span>MODE:</span>
                          <span className="text-green-400">DEVELOPER</span>
                    {/* Info Section */}
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="border-b border-green-400/30 pb-3">
                        <h3 className="text-xl font-bold font-mono text-green-400 mb-1">
                          {aboutData.name}
                        </h3>
                        <p className="text-green-300 font-mono text-sm">
                          > {aboutData.role}
                        </p>
                      </div>
                        </div>
                      {/* System Specs */}
                      <div className="space-y-2">
                        <div className="text-green-400 font-mono text-sm mb-2">
                          SYSTEM SPECIFICATIONS:
                        </div>
                        <div className="space-y-1 text-xs font-mono text-green-200">
                          <div className="flex items-center space-x-2">
                            <span className="text-green-400">•</span>
                            <span>Frontend Engineering: EXPERT</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-green-400">•</span>
                            <span>React/TypeScript: ADVANCED</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-green-400">•</span>
                            <span>Performance Optimization: HIGH</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-green-400">•</span>
                            <span>Coffee Consumption: MAXIMUM</span>
                          </div>
                        </div>
                      </div>
                      </div>
                      {/* Connection Status */}
                      <div className="space-y-2">
                        <div className="text-green-400 font-mono text-sm">
                          CONNECTION STATUS:
                        </div>
                        <div className="space-y-1 text-xs font-mono">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-200">GitHub: CONNECTED</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-200">LinkedIn: ACTIVE</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-200">Email: AVAILABLE</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>
                  {/* Terminal Footer */}
                  <div className="mt-6 pt-4 border-t border-green-400/30">
                    <div className="flex items-center space-x-2 text-green-400 font-mono text-xs">
                      <span>$</span>
                      <span className="animate-pulse">_</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}