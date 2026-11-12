export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div aria-hidden="true" className="h-[22px] bg-checker" />
      <div className="label flex flex-col gap-2 bg-forest px-5 py-[22px] text-cream sm:flex-row sm:justify-between md:px-10">
        <span>© {currentYear} Erwing Solórzano</span>
        <span>Hecho con Astro y React</span>
      </div>
    </footer>
  );
}
