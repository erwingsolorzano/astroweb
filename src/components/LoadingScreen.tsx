import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingMessages = [
  "Inicializando sistema...",
  "Cargando módulos principales...",
  "Estableciendo conexiones...",
  "Compilando experiencia...",
  "Renderizando portfolio...",
  "Sistema listo."
];

const codeSnippets = [
  "const developer = new ErwingSolorzano();",
  "developer.initialize();",
  "loading.modules(['React', 'TypeScript', 'Astro']);",
  "system.compile(experience);",
  "portfolio.render();",
  "console.log('Welcome to the Matrix...');"
];

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps = {}) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentCode, setCurrentCode] = useState('');
  const [messageComplete, setMessageComplete] = useState(false);
  const [codeComplete, setCodeComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Typewriter effect for messages
  useEffect(() => {
    if (currentMessageIndex >= loadingMessages.length) {
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          setShowContent(true);
          onComplete?.();
        }, 1000);
      }, 500);
      return;
    }

    const message = loadingMessages[currentMessageIndex];
    const code = codeSnippets[currentMessageIndex];
    let messageCharIndex = 0;
    let codeCharIndex = 0;

    setCurrentMessage('');
    setCurrentCode('');
    setMessageComplete(false);
    setCodeComplete(false);

    // Type message
    const messageInterval = setInterval(() => {
      if (messageCharIndex < message.length) {
        setCurrentMessage(message.substring(0, messageCharIndex + 1));
        messageCharIndex++;
      } else {
        setMessageComplete(true);
        clearInterval(messageInterval);
      }
    }, 50);

    // Type code (starts after a small delay)
    setTimeout(() => {
      const codeInterval = setInterval(() => {
        if (codeCharIndex < code.length) {
          setCurrentCode(code.substring(0, codeCharIndex + 1));
          codeCharIndex++;
        } else {
          setCodeComplete(true);
          clearInterval(codeInterval);
          
          // Move to next message after both are complete
          setTimeout(() => {
            setCurrentMessageIndex(prev => prev + 1);
            setProgress(((currentMessageIndex + 1) / loadingMessages.length) * 100);
          }, 800);
        }
      }, 30);
    }, 200);

    return () => {
      clearInterval(messageInterval);
    };
  }, [currentMessageIndex]);

  // Auto-hide loading screen after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!showContent) {
        setShowContent(true);
      }
    }, 8000); // Fallback timeout

    return () => clearTimeout(timer);
  }, [showContent]);

  return (
    <>
      <AnimatePresence>
        {!showContent && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          >
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}></div>
            </div>

            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-green-400 rounded-full"
                  initial={{
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                    opacity: 0
                  }}
                  animate={{
                    y: [null, -100],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto px-4 sm:px-6 w-full">
              {/* Logo/Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-12"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-400/50 border border-green-400/50">
                  <span className="text-black font-bold text-3xl font-mono">AR</span>
                </div>
              </motion.div>

              {/* Terminal Window */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gray-900/90 backdrop-blur-sm rounded-lg border border-green-400/30 shadow-2xl shadow-green-400/20 mb-8"
              >
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-green-400/10 border-b border-green-400/30 rounded-t-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-green-400 font-mono text-xs sm:text-sm">erwing@portfolio:~$</span>
                </div>

                {/* Terminal Content */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 min-h-[100px] sm:min-h-[120px]">
                  {/* System Message */}
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400 font-mono text-sm"></span>
                    <span className="text-green-200 font-mono text-xs sm:text-sm break-words">
                      {currentMessage}
                      {!messageComplete && <span className="animate-pulse text-green-400">|</span>}
                    </span>
                  </div>

                  {/* Code Line */}
                  {currentCode && (
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400 font-mono text-sm">$</span>
                      <span className="text-green-300 font-mono text-xs sm:text-sm break-words">
                        {currentCode}
                        {!codeComplete && <span className="animate-pulse text-green-400">|</span>}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
              >
                <div className="w-full bg-gray-800 rounded-full h-1.5 sm:h-2 border border-green-400/30">
                  <motion.div
                    className="bg-gradient-to-r from-green-400 to-green-500 h-full rounded-full shadow-lg shadow-green-400/50"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs font-mono text-green-300">
                  <span>Inicializando...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </motion.div>

              {/* Loading dots */}
              <div className="flex justify-center space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>

              {/* Footer */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-green-400/60 font-mono text-xs mt-6 sm:mt-8 px-2"
              >
                Creado y desarrollado por Erwing Solorzano © 2025
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content with entrance animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.8, delay: showContent ? 0.2 : 0 }}
        className={showContent ? 'block' : 'hidden'}
      >
        {/* Content will be rendered by parent component */}
      </motion.div>
    </>
  );
}