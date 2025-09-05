# Portafolio Moderno - Alex Rivera

Un portafolio web moderno, minimalista y ultra rápido construido con **Astro + React** y **Tailwind CSS**, inspirado en el diseño de Apple.

## 🚀 Características

- **Ultra rápido**: Construido con Astro para máximo rendimiento
- **Interactivo**: Islas React para funcionalidad dinámica
- **Responsive**: Diseño adaptativo para todos los dispositivos  
- **Accesible**: Cumple estándares WCAG con navegación por teclado
- **SEO optimizado**: Metadatos completos, sitemap y schema.org
- **Analytics**: Integración con Plausible (privacy-friendly) o Google Analytics
- **Formulario de contacto**: Integrado con EmailJS
- **Modo oscuro**: Toggle suave entre temas claro y oscuro

## 🛠️ Stack Tecnológico

- **Framework**: Astro 5.0
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter (con fallbacks del sistema)
- **Email**: EmailJS
- **Analytics**: Plausible / Google Analytics

## 📦 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Header.tsx      # Navegación sticky con scrollspy
│   ├── HeroAbout.tsx   # Sección hero con info personal
│   ├── EducationList.tsx # Lista de educación
│   ├── ProjectsGrid.tsx  # Grid de proyectos
│   ├── ContactForm.tsx   # Formulario de contacto
│   ├── Footer.tsx       # Footer del sitio
│   ├── Section.tsx      # Wrapper de secciones
│   └── Badge.tsx        # Componente de badges
├── content/            # Datos estructurados (JSON)
│   ├── about.json      # Información personal
│   ├── education.json  # Datos de educación
│   ├── projects.json   # Lista de proyectos
│   └── contact.json    # Textos del formulario
├── layouts/
│   └── BaseLayout.astro # Layout base con SEO
├── lib/                # Utilidades
│   ├── analytics.ts    # Funciones de analytics
│   ├── email.ts        # Helpers de EmailJS  
│   └── seo.ts          # Utilidades de SEO
└── pages/
    ├── index.astro     # Página principal
    └── 404.astro       # Página de error 404
```

## 🚀 Inicio Rápido

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/portfolio-astro-react.git
cd portfolio-astro-react
```

2. **Instala dependencias**
```bash
npm install
# o
pnpm install
```

3. **Configura variables de entorno**
```bash
cp .env.example .env
```

Edita `.env` con tus datos:
```env
# EmailJS (requerido para el formulario de contacto)
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id  
VITE_EMAILJS_PUBLIC_KEY=tu_public_key

# Analytics (elige uno)
PUBLIC_PLAUSIBLE_DOMAIN=tu-dominio.com
# PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Configuración del sitio
PUBLIC_SITE_URL=https://tu-dominio.com
```

4. **Personaliza tu contenido**

Edita los archivos JSON en `src/content/`:
- `about.json`: Tu información personal
- `education.json`: Tu formación académica  
- `projects.json`: Tus proyectos
- `contact.json`: Textos del formulario

5. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

Visita `http://localhost:4321` para ver tu portafolio.

## 📧 Configuración de EmailJS

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configura un servicio de email (Gmail, Outlook, etc.)
3. Crea un template de email con estas variables:
   - `{{from_name}}` - Nombre del remitente
   - `{{from_email}}` - Email del remitente  
   - `{{message}}` - Mensaje
   - `{{to_email}}` - Tu email (destino)
4. Copia las credenciales a tu archivo `.env`

## 📊 Configuración de Analytics

### Plausible (Recomendado)
1. Crea una cuenta en [Plausible](https://plausible.io/)
2. Añade tu dominio 
3. Configura `PUBLIC_PLAUSIBLE_DOMAIN` en `.env`

### Google Analytics
1. Crea una propiedad en [Google Analytics](https://analytics.google.com/)
2. Obtén tu Measurement ID (G-XXXXXXXXXX)
3. Configura `PUBLIC_GA_MEASUREMENT_ID` en `.env`

## 🌙 Modo Oscuro

El modo oscuro se activa automáticamente según las preferencias del sistema del usuario. Los usuarios también pueden alternar manualmente usando el botón en el header.

## 🎨 Personalización

### Colores
Modifica los colores en `tailwind.config.mjs`:

```js
colors: {
  // Tu paleta de colores personalizada
}
```

### Fuentes
Las fuentes se cargan desde `@fontsource/inter`. Para cambiar:

1. Instala la nueva fuente: `npm install @fontsource/tu-fuente`
2. Impórtala en `BaseLayout.astro`
3. Actualiza la configuración en `tailwind.config.mjs`

### Animaciones
Las animaciones usan Framer Motion y respetan `prefers-reduced-motion`. Personaliza en cada componente según sea necesario.

## 📱 Performance

Este portafolio está optimizado para obtener puntuaciones de Lighthouse 95+:

- **Performance**: Lazy loading de imágenes, código splitting
- **SEO**: Meta tags completos, schema.org, sitemap  
- **Accessibility**: Navegación por teclado, contraste AA, ARIA labels
- **Best Practices**: HTTPS, sin librerías vulnerables

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Sube la carpeta `dist/` a Netlify
```

### Otros Proveedores
El proyecto genera archivos estáticos en `dist/` que puedes subir a cualquier hosting.

## 📄 Licencia

MIT License - consulta el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)  
5. Abre un Pull Request

## 📞 Contacto

Alex Rivera - [alex@ejemplo.com](mailto:alex@ejemplo.com)

Proyecto: [https://github.com/alexrivera/portfolio-astro-react](https://github.com/alexrivera/portfolio-astro-react)