# FLESH 360 — Masterplans 360° Interactivos

Prototipo de plataforma tipo [Pano.cool](https://pano.cool) para crear, editar y compartir tours virtuales 360°. **HTML / CSS / JS puro · Sin build step · Listo para Hostinger.**

---

## Estructura del proyecto

```
FLESH - WEB 360 MASTERPLAN/
├── index.html          → Landing page (marketing)
├── viewer.html         → Visor 360° público (tour completo)
├── editor.html         → Editor visual de tours (mockup interactivo)
├── css/
│   ├── styles.css      → Sistema de diseño global
│   ├── landing.css     → Estilos del landing
│   ├── viewer.css      → Estilos del visor
│   └── editor.css      → Estilos del editor
├── js/
│   ├── main.js         → Lógica del landing + demo 360° hero
│   ├── viewer.js       → Lógica del visor (Pannellum + tour)
│   └── editor.js       → Lógica del editor (mockup)
└── assets/
    ├── panos/          → (vacío) Tus fotos 360° aquí
    └── icons/          → (vacío) Iconos personalizados
```

## Tecnologías

- **HTML / CSS / Vanilla JS** — sin frameworks ni build step
- **[Pannellum](https://pannellum.org/) 2.5.6** — visor 360° (cargado vía CDN)
- **Google Fonts** — Inter + Space Grotesk + JetBrains Mono
- **SVG inline** — para todos los iconos (no requiere assets externos)

## Cómo probar localmente

Abrí cualquiera de los HTML directamente en el navegador:
- `index.html` — landing
- `viewer.html` — visor con tour completo de 3 escenas
- `editor.html` — editor mockup

> **Nota**: para que carguen las imágenes de Pannellum desde CDN, necesitás conexión a internet la primera vez.

## Despliegue en Hostinger

### Opción A — Subir por File Manager
1. Entrá al panel de Hostinger → **Hosting** → **Administrar**
2. Click en **Administrador de Archivos**
3. Andá a la carpeta `public_html/` (o subcarpeta si querés un subdominio)
4. Arrastrá toda esta carpeta del proyecto (`index.html`, `viewer.html`, `editor.html`, `css/`, `js/`, `assets/`)
5. Listo — tu sitio queda en `https://tu-dominio.com`

### Opción B — Subir por FTP
1. Obtené credenciales FTP desde el panel de Hostinger
2. Conectate con FileZilla o WinSCP
3. Subí todo el contenido a `public_html/`

### Opción C — Git (si tu plan lo soporta)
1. Subí esta carpeta a un repo de GitHub
2. En Hostinger: **Git** → conectá el repo → deploy automático

## Imágenes 360° de muestra

Actualmente usa imágenes de demostración de Pannellum.org cargadas vía CDN. Cuando tengas tus propias fotos 360°:

1. Subilas a `assets/panos/` (formato JPG/PNG **equirectangular**, idealmente 4K-8K)
2. En `js/viewer.js`, reemplazá los URLs `https://pannellum.org/images/...` por rutas locales tipo `assets/panos/living.jpg`

**Resolución recomendada**:
- Mínimo: 4096 × 2048 px
- Óptimo: 6000 × 3000 px o 8192 × 4096 px
- Aspect ratio siempre **2:1**

## Próximos pasos (Fases 2-5)

Este prototipo cubre la **Fase 1** del roadmap. Las próximas fases requieren backend:

| Fase | Necesita | Costo aprox. |
|---|---|---|
| 2. Auth + DB | Firebase o Supabase | Gratis hasta cierto uso |
| 3. Storage real de tours | Firebase Storage / Supabase Storage | Gratis hasta 1 GB |
| 4. Tiling de imágenes 4K+ | Edge function con sharp | Gratis (depende del proveedor) |
| 5. Embed + analytics | Cualquier backend | — |

### Migración a Firebase (recomendado)

Cuando quieras dar el salto a la Fase 2, hay que agregar:
- `firebase-config.js` con las credenciales
- Auth (email + Google) para login
- Firestore para guardar proyectos / escenas / hotspots
- Storage para imágenes 360°

## Personalización rápida

### Cambiar colores de marca
Editá en `css/styles.css` (líneas 16-19):
```css
--accent: #7c5cff;     /* Color principal */
--accent-2: #ff5ca8;   /* Color secundario */
--accent-3: #00e0ff;   /* Color terciario (highlights) */
```

### Cambiar logo
1. Sustituí la `<span class="logo-mark">F</span>` por un `<img src="assets/logo.svg" />` en `index.html`, `viewer.html` y `editor.html`
2. Ajustá el CSS `.logo-mark` en `styles.css` si hace falta

### Cambiar tipografía
Editá los `<link>` de Google Fonts en cada HTML y la variable `--font-display` / `--font-sans` en `styles.css`.

## Funciones del prototipo

### ✅ Implementadas
- Landing responsive con animaciones, hero con demo 360° en vivo
- Visor 360° multi-escena con transiciones suaves
- Hotspots clicables entre escenas
- Floorplan 2D interactivo con puntos de navegación
- Controles: zoom, auto-rotate, pantalla completa, compartir
- Atajos de teclado (F, 1/2/3, Esc)
- Editor mockup con:
  - Panel de escenas (drag & drop simulado)
  - Canvas central con visor
  - Panel de propiedades (escena, hotspots, diseño)
  - Toolbar flotante (select, hotspot, info, medir)
  - Color picker dinámico
  - Capturar vista actual como inicial
  - Doble click para agregar hotspot

### ⏳ Faltan (requieren backend)
- Upload real de fotos 360°
- Persistencia de tours (DB)
- Auth de usuarios
- Compartir con link único
- Analytics
- Embed real (iframe)
- Tiling automático de imágenes grandes

---

**Creado por**: Flesh Studio
**Contacto**: contacto.flesh@gmail.com
**Fecha**: 2026-05-27
