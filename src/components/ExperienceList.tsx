import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, ChevronRight } from 'lucide-react';
import experienceData from '../content/experience.json';

export default function ExperienceList() {
  return (
    <div className="space-y-8">
      {experienceData.map((job, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative"
        >
          {/* Timeline line */}
          {index < experienceData.length - 1 && (
            <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-green-400/50 to-transparent"></div>
          )}
          
          {/* Timeline dot */}
          <div className="absolute left-4 top-6 w-4 h-4 bg-green-400 rounded-full border-2 border-black shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
          
          {/* Content card */}
          <div className="ml-12 bg-gradient-to-br from-gray-900/90 via-black/90 to-green-950/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-green-500/30 hover:shadow-green-500/20 transition-all duration-500 hover:scale-[1.02]">
            {/* Header */}
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-bold font-mono text-green-400 mb-1 sm:mb-0">
                  {job.position}
                </h3>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full font-mono border border-green-500/50">
                    {job.type}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 mb-2">
                <Briefcase className="w-4 h-4 text-green-400" />
                <span className="text-green-200 font-mono font-medium">
                  {job.company}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-green-300">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-mono">{job.start} - {job.end}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-mono">{job.location}</span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-green-200 mb-4 font-mono text-sm leading-relaxed">
              {job.description}
            </p>
            
            {/* Achievements */}
            <div className="mb-4">
              <div className="text-green-400 font-mono text-sm mb-3 flex items-center">
                <span className="mr-2">$</span>
                <span>cat achievements.log</span>
              </div>
              <div className="space-y-2">
                {job.achievements.map((achievement, achievementIndex) => (
                  <div
                    key={achievementIndex}
                    className="flex items-start space-x-3 text-green-200"
                  >
                    <ChevronRight className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-mono leading-relaxed">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Technologies */}
            <div>
              <div className="text-green-400 font-mono text-sm mb-3 flex items-center">
                <span className="mr-2">$</span>
                <span>ls -la tech_stack/</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {job.technologies.map((tech, techIndex) => (
                  <div
                    key={techIndex}
                    className="px-3 py-1.5 bg-black/90 text-green-200 rounded-lg text-sm font-medium font-mono border border-green-500/50 hover:scale-105 hover:bg-green-500/10 transition-all duration-200 shadow-sm"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}