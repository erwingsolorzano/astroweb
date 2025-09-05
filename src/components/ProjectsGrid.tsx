import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { events } from '../lib/analytics';
import projectsData from '../content/projects.json';

export default function ProjectsGrid() {
  const handleProjectClick = (projectName: string, url: string) => {
    events.projectClick(projectName);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projectsData.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          viewport={{ once: true }}
          className="group relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-xl overflow-hidden border border-green-400/30 hover:border-green-400/60 transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm"
        >
          {/* Project Images */}
          {project.images && project.images.length > 0 && (
            <div className="relative h-32 overflow-hidden bg-gradient-to-br from-black to-green-900/50">
              <img
                src={project.images[0]}
                alt={`${project.name} preview`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          )}

          <div className="p-6">
            {/* Project Title */}
            <h3 className="text-xl font-bold font-mono text-green-100 mb-2 group-hover:text-green-400 transition-colors">
              {project.name}
            </h3>

            {/* Project Description */}
            <p className="text-green-200 mb-4 text-sm leading-relaxed font-mono line-clamp-3">
              {project.description}
            </p>

            {/* Key Impact - Solo el más importante */}
            {project.impact && project.impact.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center space-x-2 bg-green-900/30 px-3 py-1.5 rounded-lg border border-green-500/30">
                  <Star className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-mono text-green-100">
                    {project.impact[0]}
                  </span>
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tech, techIndex) => (
                  <div key={techIndex} className="px-3 py-1.5 bg-black/90 text-green-200 rounded-lg text-sm font-medium font-mono border border-green-500/50 hover:scale-105 hover:bg-green-500/10 transition-all duration-200 shadow-sm">
                    {tech}
                  </div>
                ))}
                {project.stack.length > 4 && (
                  <div className="px-3 py-1.5 bg-black/90 text-green-300 rounded-lg text-sm font-medium font-mono border border-green-500/50">
                    +{project.stack.length - 4}
                  </div>
                )}
              </div>
            </div>

            {/* Project Links */}
            <div className="flex items-center space-x-3">
              {project.links.demo && (
                <button
                  onClick={() => handleProjectClick(project.name, project.links.demo!)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-400 hover:bg-green-300 text-black font-bold font-mono rounded-lg transition-all duration-200 text-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Demo
                </button>
              )}
              {project.links.github && (
                <button
                  onClick={() => handleProjectClick(project.name, project.links.github!)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-black/80 hover:bg-green-500/10 text-green-400 font-bold font-mono rounded-lg transition-all duration-200 text-sm border border-green-500/50"
                >
                  <Github className="w-4 h-4 mr-1" />
                  Código
                </button>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}