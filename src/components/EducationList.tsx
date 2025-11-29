import { motion } from 'framer-motion';
import { Terminal, Calendar, Building2, Link } from 'lucide-react';
import educationData from '../content/education.json';

export default function EducationList() {
  return (
    <div className="space-y-6">
      {educationData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="group relative"
        >
          {/* Terminal-style border */}
          <div className="border-2 border-green-400/50 bg-black/90 backdrop-blur-sm hover:border-green-400 transition-all duration-300">
            {/* Header bar like terminal window */}
            <div className="flex items-center justify-between px-4 py-2 bg-green-400/10 border-b border-green-400/30">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-xs font-mono text-green-400 uppercase tracking-wider">
                  {item.degree}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {/* Institution and Program */}
              <div className="mb-4">
                <h3 className="text-xl font-bold font-mono text-green-400 mb-1">
                  {item.program}
                </h3>
                <div className="flex items-center space-x-2 mb-4">
                  <Building2 className="w-4 h-4 text-green-400" />
                  <p className="text-green-200 font-mono text-sm">
                    {item.institution}
                  </p>
                </div>
              </div>
              
              {/* Date range */}
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-4 h-4 text-green-400" />
                <span className="text-green-300 font-mono text-sm">
                  {item.start} - {item.end}
                </span>
              </div>
              
              {/* Highlights */}
              {item.highlights && item.highlights.length > 0 && (
                <div className="space-y-2">
                  {item.highlights.map((highlight, highlightIndex) => (
                    <div
                      key={highlightIndex}
                      className="flex items-start space-x-3 text-green-200"
                    >
                      <span className="text-green-400 font-mono text-sm mt-0.5">&gt;</span>
                      <span className="text-sm font-mono leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              )}
              {item.fileUrl &&
                <div className="mt-4">
                  <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-green-300 hover:underline">
                    <Link className="w-4 h-4 inline-block mr-1" />
                    Ver certificado
                  </a>
                </div>
              }
            </div>
          </div>
          
          {/* Terminal prompt line */}
          <div className="mt-2 text-green-400 font-mono text-xs opacity-60">
            user@portfolio:~/education$ ls -la {item.institution.toLowerCase().replace(/\s+/g, '-')}
          </div>
        </motion.div>
      ))}
    </div>
  );
}