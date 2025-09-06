import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { events } from '../lib/analytics';
import projectsData from '../content/projects.json';

export default function ProjectsGrid() {
  const handleProjectClick = (projectName: string, url: string) => {
    events.projectClick(projectName);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Crear proyectos placeholder para mostrar que hay más en desarrollo
  const placeholderProjects = [
    {
      name: "E-Commerce Platform",
      description: "Plataforma de comercio electrónico completa con carrito de compras, pagos y gestión de inventario.",
      impact: ["En desarrollo"],
      stack: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
      links: {},
      isPlaceholder: true
    },
    {
      name: "Task Management App",
      description: "Aplicación de gestión de tareas con colaboración en tiempo real y notificaciones push.",
      impact: ["Próximamente"],
      stack: ["React", "Socket.io", "MongoDB", "PWA"],
      links: {},
      isPlaceholder: true
    }
  ];

  const allProjects = [...projectsData, ...placeholderProjects];

  return (
    <div>
      {/* Mensaje introductorio */}
      <div className="text-center mb-8">
        <p className="text-green-200 font-mono text-sm">
          Mostrando {projectsData.length} de {allProjects.length} proyectos • Más proyectos en desarrollo
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {allProjects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          viewport={{ once: true }}
          className={`group relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-xl overflow-hidden border transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm ${
            project.isPlaceholder 
              ? 'border-gray-600/30 hover:border-gray-500/60 opacity-75' 
              : 'border-green-400/30 hover:border-green-400/60'
          }`}
        >
          {/* Placeholder indicator */}
          {project.isPlaceholder && (
            <div className="absolute top-4 right-4 z-10">
              <div className="px-2 py-1 bg-gray-700/80 text-gray-300 rounded-full text-xs font-mono">
                En desarrollo
              </div>
            </div>
          )}
          
          {/* Project Images */}
          {project.images && project.images.length > 0 ? (
            <div className="relative h-32 overflow-hidden bg-gradient-to-br from-black to-green-900/50">
              <img
                src={project.images[0]}
                alt={`${project.name} preview`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          ) : (
            <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-4xl opacity-30">🚧</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
          )}

          <div className="p-6">
            {/* Project Title */}
            <h3 className={`text-xl font-bold font-mono mb-2 transition-colors ${
              project.isPlaceholder 
                ? 'text-gray-300 group-hover:text-gray-200' 
                : 'text-green-100 group-hover:text-green-400'
            }`}>
              {project.name}
            </h3>

            {/* Project Description */}
            <p className={`mb-4 text-sm leading-relaxed font-mono line-clamp-3 ${
              project.isPlaceholder ? 'text-gray-400' : 'text-green-200'
            }`}>
              {project.description}
            </p>

            {/* Key Impact - Solo el más importante */}
            {project.impact && project.impact.length > 0 && (
              <div className="mb-4">
                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border ${
                  project.isPlaceholder 
                    ? 'bg-gray-800/30 border-gray-600/30' 
                    : 'bg-green-900/30 border-green-500/30'
                }`}>
                  <Star className={`w-4 h-4 ${project.isPlaceholder ? 'text-gray-400' : 'text-green-400'}`} />
                  <span className={`text-xs font-mono ${
                    project.isPlaceholder ? 'text-gray-300' : 'text-green-100'
                  }`}>
                    {project.impact[0]}
                  </span>
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tech, techIndex) => (
                  <div key={techIndex} className={`px-3 py-1.5 bg-black/90 rounded-lg text-sm font-medium font-mono border transition-all duration-200 shadow-sm ${
                    project.isPlaceholder 
                      ? 'text-gray-300 border-gray-600/50 hover:scale-105 hover:bg-gray-700/10' 
                      : 'text-green-200 border-green-500/50 hover:scale-105 hover:bg-green-500/10'
                  }`}>
                    {tech}
                  </div>
                ))}
                {project.stack.length > 4 && (
                  <div className={`px-3 py-1.5 bg-black/90 rounded-lg text-sm font-medium font-mono border ${
                    project.isPlaceholder 
                      ? 'text-gray-300 border-gray-600/50' 
                      : 'text-green-300 border-green-500/50'
                  }`}>
                    +{project.stack.length - 4}
                  </div>
                )}
              </div>
            </div>

            {/* Project Links */}
            <div className="flex items-center space-x-3">
              {project.links.demo && !project.isPlaceholder && (
                <button
                  onClick={() => handleProjectClick(project.name, project.links.demo!)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-400 hover:bg-green-300 text-black font-bold font-mono rounded-lg transition-all duration-200 text-sm"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Demo
                </button>
              )}
              {project.isPlaceholder && (
                <div className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-700/50 text-gray-400 font-bold font-mono rounded-lg text-sm cursor-not-allowed">
                  <span className="mr-1">⏳</span>
                  En desarrollo
                </div>
              )}
              {project.links.github && !project.isPlaceholder && (
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
    </div>
  );
}