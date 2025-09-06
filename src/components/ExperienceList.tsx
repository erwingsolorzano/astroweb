import { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, Briefcase, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import experienceData from '../content/experience.json';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function ExperienceList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedJobs, setExpandedJobs] = useState<Set<number>(new Set());

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate job cards on scroll
      gsap.fromTo('.job-card', 
        {
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate timeline dots
      gsap.fromTo('.timeline-dot',
        {
          scale: 0,
          rotation: -180
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate timeline lines
      gsap.fromTo('.timeline-line',
        {
          scaleY: 0,
          transformOrigin: "top"
        },
        {
          scaleY: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleJobExpansion = (index: number) => {
    const newExpanded = new Set(expandedJobs);
    const isExpanding = !expandedJobs.has(index);
    
    if (isExpanding) {
      newExpanded.add(index);
    } else {
      newExpanded.delete(index);
    }
    
    setExpandedJobs(newExpanded);

    // GSAP animation for expanding/collapsing
    const achievementsEl = document.querySelector(`#achievements-${index}`);
    const buttonEl = document.querySelector(`#expand-btn-${index}`);
    const iconEl = document.querySelector(`#expand-icon-${index}`);

    if (achievementsEl && buttonEl && iconEl) {
      if (isExpanding) {
        // Expanding animation
        gsap.set(achievementsEl, { height: 'auto' });
        gsap.from(achievementsEl, {
          height: 0,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out"
        });
        
        gsap.fromTo(achievementsEl.children,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.4,
            stagger: 0.1,
            delay: 0.2,
            ease: "power2.out"
          }
        );

        // Button pulse effect
        gsap.to(buttonEl, {
          scale: 1.1,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });

        // Icon rotation
        gsap.to(iconEl, {
          rotation: 180,
          duration: 0.3,
          ease: "power2.out"
        });

      } else {
        // Collapsing animation
        gsap.to(achievementsEl, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in"
        });

        // Icon rotation back
        gsap.to(iconEl, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  };

  return (
    <div ref={containerRef} className="space-y-8">
      {experienceData.map((job, index) => (
        <div key={index} className="group relative job-card">
          {/* Timeline line */}
          {index < experienceData.length - 1 && (
            <div className="timeline-line absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-green-400/50 to-transparent"></div>
          )}
          
          {/* Timeline dot */}
          <div className="timeline-dot absolute left-4 top-6 w-4 h-4 bg-green-400 rounded-full border-2 border-black shadow-lg"></div>
          
          {/* Content card */}
          <div className="ml-12 bg-gradient-to-br from-gray-900/90 via-black/90 to-green-950/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-green-500/30 hover:shadow-green-500/20 transition-all duration-500">
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
            
            {/* Expand Button */}
            <div className="mb-4">
              <button
                id={`expand-btn-${index}`}
                onClick={() => toggleJobExpansion(index)}
                className="group/btn inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600/80 to-emerald-600/80 hover:from-green-500 hover:to-emerald-500 text-black font-bold font-mono rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/50 relative overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                
                {/* Pulse effect */}
                <div className="absolute inset-0 bg-green-400/30 rounded-lg animate-pulse"></div>
                
                {/* Content */}
                <Zap className="w-4 h-4 relative z-10 group-hover/btn:animate-bounce" />
                <span className="relative z-10">
                  {expandedJobs.has(index) ? 'Ocultar logros' : 'Ver logros'}
                </span>
                <ChevronDown 
                  id={`expand-icon-${index}`}
                  className="w-4 h-4 relative z-10 transition-transform duration-300" 
                />
              </button>
            </div>
            
            {/* Achievements - Hidden by default */}
            <div 
              id={`achievements-${index}`}
              className={`overflow-hidden ${expandedJobs.has(index) ? 'block' : 'hidden'}`}
            >
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
                      <span className="text-green-400 font-mono text-sm mt-0.5">></span>
                      <span className="text-sm font-mono leading-relaxed">{achievement}</span>
                    </div>
                  ))}
                </div>
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
        </div>
      ))}
    </div>
  );
}