export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center space-y-6">

          {/* Texto principal */}
          <div className="flex flex-col items-center justify-center space-y-1 text-center text-slate-300 sm:flex-row sm:space-y-0 sm:space-x-2">
            <span>© {currentYear} Erwing Solorzano.</span>
            <span>Menos ruido, más intención.</span>
          </div>

          {/* Tecnologías */}
          <div className="flex flex-col items-center justify-center space-y-2 text-center text-sm text-slate-400 sm:flex-row sm:space-y-0 sm:space-x-3">
            <span>Construido con</span>
            <div className="flex items-center space-x-3">
              <img src="./astro.svg" alt="Astro" className="h-5 w-5" title="Astro" />
              <img src="./react.svg" alt="React" className="h-5 w-5" title="React" />
              <img src="./tailwind.svg" alt="Tailwind" className="h-5 w-5" title="Tailwind" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
