# Despliegue en Hostinger — Guía paso a paso

Tu sitio FLESH 360 está listo para subir a Hostinger. Como yo no tengo acceso a tu panel, vas a hacer la subida vos (5 minutos).

---

## Opción A — Por File Manager (más fácil, recomendado)

### 1. Entrá al panel de Hostinger
- Abrí https://hpanel.hostinger.com/
- Login con tu cuenta

### 2. Andá a tu hosting
- Click en **Sitios web** en el menú lateral
- Click en **Administrar** sobre el dominio donde vas a subir el sitio

### 3. Abrí el Administrador de Archivos
- En el dashboard del hosting, click en **Administrador de archivos**
- Se abre una ventana tipo Explorador

### 4. Navegá a `public_html/`
- Click en la carpeta `public_html/`
- Esta es la raíz donde Hostinger sirve los archivos web

### 5. Subí los archivos
Tenés 2 sub-opciones:

**A.1 — Arrastrar y soltar (más rápido)**
- Abrí en tu PC la carpeta `H:\FLESH STUDIO\FLESH - WEB 360 MASTERPLAN`
- Seleccioná TODO el contenido (Ctrl+A) **excepto**:
  - ❌ `node_modules/` (si existe)
  - ❌ `.claude/` (configuración local)
  - ❌ `DEPLOY_HOSTINGER.md` (esta guía)
  - ❌ Cualquier archivo `.zip`
- Arrastralos a la ventana del File Manager → suelta en `public_html/`
- Esperá a que termine de subir (puede tardar 30-60s)

**A.2 — Subir un ZIP (alternativa)**
- En tu PC: click derecho sobre la carpeta del proyecto → **Comprimir en ZIP**
- En File Manager → botón **Upload** → seleccioná el ZIP
- Una vez subido, click derecho sobre el ZIP en Hostinger → **Extract**
- Eliminá el ZIP original

### 6. Listo
- Visitá `https://tudominio.com/` para ver el landing
- `https://tudominio.com/viewer.html` para el tour 360°
- `https://tudominio.com/editor.html` para el editor

---

## Opción B — Por FTP (si preferís FileZilla)

### 1. Obtené las credenciales FTP
- En Hostinger → **Cuenta FTP** (menú del hosting)
- Anotá:
  - Host: `ftp.tudominio.com`
  - Usuario: el que figura
  - Contraseña: la que figura (o creá una nueva)
  - Puerto: 21

### 2. Conectate con FileZilla
- Descargá FileZilla si no lo tenés: https://filezilla-project.org/
- Pegá las credenciales en la barra superior y click **Conexión rápida**

### 3. Subí los archivos
- Panel izquierdo (tu PC): andá a `H:\FLESH STUDIO\FLESH - WEB 360 MASTERPLAN`
- Panel derecho (servidor): andá a `/public_html/`
- Seleccioná los archivos del proyecto y arrastrá al panel derecho

---

## Estructura final en Hostinger

Tu `public_html/` debería quedar así:

```
public_html/
├── index.html              ← Landing principal
├── viewer.html             ← Visor masterplan 360°
├── editor.html             ← Editor visual
├── README.md
├── css/
│   ├── styles.css
│   ├── landing.css
│   ├── viewer.css
│   └── editor.css
├── js/
│   ├── main.js
│   ├── viewer.js
│   └── editor.js
└── assets/
    ├── panos/              ← (vacío, para tus fotos 360° reales)
    └── icons/              ← (vacío)
```

---

## Verificación post-deploy

Una vez subido, abrí estas URLs y revisá:

| URL | Qué debería verse |
|---|---|
| `tudominio.com/` | Landing FLESH 360 con hero animado |
| `tudominio.com/viewer.html` | Tour Hacienda del Sol con menú lateral y plano |
| `tudominio.com/editor.html` | Editor con escenas, canvas y propiedades |

**Si algo no carga:**
- Limpiá cache del navegador (Ctrl+F5)
- Revisá que las carpetas `css/` y `js/` estén en `public_html/` (no en subcarpeta)
- Abrí DevTools (F12) y mirá la pestaña **Network** para ver errores 404

---

## Configurar SSL (HTTPS)

Hostinger ya incluye SSL gratis. Para activarlo:
1. En el panel del hosting → **SSL**
2. Click **Activar SSL** sobre tu dominio
3. Esperá ~5 minutos a que se propague
4. En **Forzar HTTPS** activá el toggle

---

## Conectar tu dominio (si todavía no apunta a Hostinger)

Si tu dominio está en otro proveedor (Namecheap, GoDaddy, etc.):
1. En Hostinger → copia los **Nameservers** (algo como `ns1.dns-parking.com`, `ns2.dns-parking.com`)
2. En tu proveedor del dominio → cambiá los Nameservers por esos
3. Esperá hasta 24hs para que se propague (suele tardar menos)

---

## Reemplazar las fotos 360° de muestra por las reales

Cuando tengas tus propias fotos 360° equirectangulares (4K-8K):

1. Subilas a `public_html/assets/panos/` con nombres claros: `acceso.jpg`, `lagunas.jpg`, etc.
2. Editá `js/viewer.js` y cambiá los URLs de Pannellum por:
   ```js
   panorama: 'assets/panos/acceso.jpg',
   ```
3. Volvé a subir el archivo modificado por File Manager
4. ¡Listo!

---

## Cambios rápidos sin tocar código

| Qué cambiar | Archivo | Línea aprox. |
|---|---|---|
| Nombre del proyecto demo | `js/viewer.js` | `projectName: 'HACIENDA DEL SOL'` |
| Número WhatsApp | Buscar `5492944152161` en `viewer.html`, `index.html`, `js/main.js` |
| Email contacto | Buscar `contacto.flesh@gmail.com` |
| Colores de marca | `css/styles.css` líneas 16-19 (`--accent`) |

---

## ¿Problemas?

- **No carga el viewer**: revisá que `https://cdn.jsdelivr.net/...` esté accesible (Pannellum se carga de CDN)
- **Hotspots no aparecen**: verificá la consola del navegador (F12)
- **Imágenes 360° lentas**: en producción, hacé hosting de las imágenes en `assets/panos/` en vez de usar las del CDN de Pannellum

---

**Creado**: 2026-05-29
**Por**: FLESH 360 · Flesh Studio
