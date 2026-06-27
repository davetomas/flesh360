/* ========================================
   FLESH 360 — Viewer Masterplan Profesional
   Inspirado en patrón Estancia Villa María
   ======================================== */

// ===== Configuración del tour =====
const TOUR = {
  projectName: 'HACIENDA DEL SOL',
  defaultScene: 'acceso',
  scenes: {
    acceso: {
      num: 1,
      title: 'Acceso Principal',
      sub: 'Vista aérea · Entrada del complejo',
      category: 'Vista aérea',
      panorama: 'assets/panos/bariloche-360-lago.jpg',
      yaw: 0,
      pitch: 0,
      hotSpots: [
        { yaw: 60, pitch: -5, type: 'nav', target: 'lagunas', text: 'Acceder a Lagunas del Golf' },
        { yaw: 140, pitch: -8, type: 'nav', target: 'casco-frente', text: 'Acceder a El Casco' },
        { yaw: -30, pitch: 10, type: 'info', text: 'A 35 minutos de Aerop. Ezeiza' },
        { yaw: -90, pitch: 5, type: 'info', text: 'A 50 minutos de CABA' },
      ],
    },
    lagunas: {
      num: 2,
      title: 'Lagunas del Golf',
      sub: 'Vista aérea · 9 hoyos · 3 lagunas',
      category: 'Vista aérea',
      panorama: 'https://pannellum.org/images/cerro-toco-0.jpg',
      yaw: 0,
      pitch: 0,
      hotSpots: [
        { yaw: -120, pitch: -5, type: 'nav', target: 'acceso', text: 'Volver al Acceso' },
        { yaw: 60, pitch: -10, type: 'nav', target: 'polo', text: 'Canchas de Polo' },
        { yaw: 20, pitch: 5, type: 'info', text: '9 hoyos · Par 72' },
      ],
    },
    polo: {
      num: 5,
      title: 'Canchas de Polo',
      sub: 'Vista aérea · 2 canchas profesionales',
      category: 'Vista aérea',
      panorama: 'https://pannellum.org/images/from-tree.jpg',
      yaw: 0,
      pitch: 0,
      hotSpots: [
        { yaw: 180, pitch: -5, type: 'nav', target: 'lagunas', text: 'Volver a Lagunas' },
        { yaw: -60, pitch: -10, type: 'nav', target: 'casco-frente', text: 'Ir a El Casco' },
        { yaw: 30, pitch: 0, type: 'info', text: '2 canchas profesionales' },
      ],
    },
    alamos: {
      num: 3,
      title: 'Los Álamos',
      sub: 'Vista aérea · Bosque centenario',
      category: 'Vista aérea',
      panorama: 'https://pannellum.org/images/alma.jpg',
      yaw: 90,
      pitch: 0,
      hotSpots: [
        { yaw: 0, pitch: -5, type: 'nav', target: 'acceso', text: 'Volver al Acceso' },
        { yaw: 120, pitch: 0, type: 'info', text: 'Álamos centenarios · 12 ha' },
      ],
    },
    'casco-frente': {
      num: 4,
      title: 'El Casco · Vista Frontal',
      sub: 'Casona principal · Estilo colonial',
      category: 'El Casco',
      panorama: 'https://pannellum.org/images/cerro-toco-0.jpg',
      yaw: 0,
      pitch: 0,
      hotSpots: [
        { yaw: 180, pitch: -5, type: 'nav', target: 'casco-trasera', text: 'Ver vista trasera' },
        { yaw: -90, pitch: -10, type: 'nav', target: 'acceso', text: 'Volver al Acceso' },
        { yaw: 45, pitch: 0, type: 'info', text: 'Construcción de 1920 restaurada' },
      ],
    },
    'casco-trasera': {
      num: 4,
      title: 'El Casco · Vista Trasera',
      sub: 'Jardines · Pileta · Quincho',
      category: 'El Casco',
      panorama: 'https://pannellum.org/images/from-tree.jpg',
      yaw: 0,
      pitch: 0,
      hotSpots: [
        { yaw: 180, pitch: -5, type: 'nav', target: 'casco-frente', text: 'Volver al frente' },
        { yaw: 60, pitch: 0, type: 'info', text: 'Pileta climatizada 25m' },
      ],
    },
    'casco-nocturna': {
      num: 4,
      title: 'El Casco · Vista Nocturna',
      sub: 'Iluminación arquitectónica',
      category: 'El Casco',
      panorama: 'https://pannellum.org/images/alma.jpg',
      yaw: 180,
      pitch: 0,
      hotSpots: [
        { yaw: 0, pitch: -5, type: 'nav', target: 'casco-frente', text: 'Ver de día' },
        { yaw: 90, pitch: 0, type: 'info', text: 'Iluminación LED 360°' },
      ],
    },
  },

  // Albums de fotos (slideshow)
  albums: {
    club: {
      title: 'Club House',
      photos: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
        'https://images.unsplash.com/photo-1551776235-dde6d4829808?w=1200&q=80',
      ],
    },
    hipico: {
      title: 'Club Hípico',
      photos: [
        'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&q=80',
        'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80',
        'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?w=1200&q=80',
      ],
    },
    deportes: {
      title: 'Deportes',
      photos: [
        'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&q=80',
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80',
        'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&q=80',
      ],
    },
  },

  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
};

// ===== Estado =====
let viewer = null;
let currentScene = TOUR.defaultScene;
let autoRotate = true;
let soundOn = false;
let isNight = false;
let lang = 'ES';
let currentAlbum = { id: null, index: 0 };

// ===== Init =====
window.addEventListener('load', initViewer);

function initViewer() {
  if (typeof pannellum === 'undefined') {
    showToast('Error: no se cargó el visor 360°');
    return;
  }

  // Simulación de progreso de carga
  simulateLoading();

  // Convertir escenas para Pannellum
  const scenes = {};
  Object.entries(TOUR.scenes).forEach(([id, s]) => {
    scenes[id] = {
      type: 'equirectangular',
      panorama: s.panorama,
      yaw: s.yaw,
      pitch: s.pitch,
      hfov: 100,
      hotSpots: (s.hotSpots || []).map((h) => ({
        yaw: h.yaw,
        pitch: h.pitch,
        cssClass: h.type === 'nav' ? 'hs-nav' : 'hs-info',
        createTooltipFunc: createTooltip,
        createTooltipArgs: h.text,
        clickHandlerFunc: h.type === 'nav' ? () => loadScene(h.target) : null,
      })),
    };
  });

  viewer = pannellum.viewer('panorama', {
    default: {
      firstScene: TOUR.defaultScene,
      autoLoad: true,
      sceneFadeDuration: 1500,
      autoRotate: -1.2,
      autoRotateInactivityDelay: 3000,
      showControls: false,
      compass: false,
      hfov: 100,
      minHfov: 50,
      maxHfov: 120,
      mouseZoom: true,
    },
    scenes,
  });

  viewer.on('load', onSceneLoaded);
  viewer.on('error', (e) => { console.error(e); showToast('No se pudo cargar la escena'); });

  // Actualizar compass según yaw
  setInterval(updateCompass, 100);

  bindUI();
}

// ===== Loading simulation =====
function simulateLoading() {
  const fill = document.getElementById('loaderFill');
  const msg = document.getElementById('loadingMsg');
  const steps = [
    { p: 25, m: 'Inicializando WebGL…' },
    { p: 55, m: 'Cargando panorama 360°…' },
    { p: 80, m: 'Construyendo hotspots…' },
    { p: 100, m: 'Listo' },
  ];
  let i = 0;
  const tick = () => {
    if (i >= steps.length) return;
    fill.style.width = steps[i].p + '%';
    msg.textContent = steps[i].m;
    i++;
    if (i < steps.length) setTimeout(tick, 350 + Math.random() * 250);
  };
  tick();
}

// ===== Tooltip =====
function createTooltip(div, text) {
  const tip = document.createElement('span');
  tip.className = 'custom-tooltip';
  tip.textContent = text;
  div.appendChild(tip);
}

// ===== Load scene =====
function loadScene(id) {
  if (!TOUR.scenes[id] || !viewer) return;
  currentScene = id;
  viewer.loadScene(id);
  updateUI(id);
  closeSideMenu();
}

function onSceneLoaded() {
  document.getElementById('loading').classList.add('hidden');
  updateUI(currentScene);
}

function updateUI(id) {
  const s = TOUR.scenes[id];
  if (!s) return;

  document.getElementById('sceneTitle').textContent = s.title;

  // Zone pill (esquina superior izquierda)
  const pill = document.getElementById('zonePill');
  document.getElementById('zoneNum').textContent = s.num;
  document.getElementById('zoneName').textContent = s.title;
  document.getElementById('zoneSub').textContent = s.sub;
  pill.classList.add('visible');

  // Menu items activos
  document.querySelectorAll('.menu-item[data-scene]').forEach((el) => {
    el.classList.toggle('active', el.dataset.scene === id);
  });

  // Plan points activos
  document.querySelectorAll('.plan-point').forEach((el) => {
    el.classList.toggle('active', el.dataset.scene === id);
  });
}

// ===== Compass =====
function updateCompass() {
  if (!viewer) return;
  try {
    const yaw = viewer.getYaw();
    const needle = document.getElementById('compassNeedle');
    if (needle) needle.style.transform = `rotate(${-yaw}deg)`;
  } catch (e) { /* noop */ }
}

// ===== Bind UI =====
function bindUI() {
  // Side menu
  document.getElementById('menuToggle').addEventListener('click', openSideMenu);
  document.getElementById('menuClose').addEventListener('click', closeSideMenu);

  // Menu items: escenas
  document.querySelectorAll('.menu-item[data-scene]').forEach((el) => {
    el.addEventListener('click', () => loadScene(el.dataset.scene));
  });

  // Menu items: acciones
  document.querySelectorAll('.menu-item[data-action]').forEach((el) => {
    el.addEventListener('click', () => {
      const action = el.dataset.action;
      if (action === 'openMap') openModal('planModal');
      if (action === 'openInfo') openModal('infoModal');
      if (action === 'openLocation') openModal('locationModal');
      if (action === 'openVideo') {
        document.getElementById('videoIframe').src = TOUR.videoUrl;
        openModal('videoModal');
      }
      if (action === 'openAlbum') {
        openAlbum(el.dataset.album);
      }
      closeSideMenu();
    });
  });

  // Plan points (en el plano modal)
  document.querySelectorAll('.plan-point').forEach((el) => {
    el.addEventListener('click', () => {
      loadScene(el.dataset.scene);
      closeModal('planModal');
    });
  });

  // Bottom controls
  document.getElementById('btnAutoRotate').addEventListener('click', (e) => {
    autoRotate = !autoRotate;
    if (autoRotate) {
      viewer.startAutoRotate(-1.2);
      e.currentTarget.classList.add('active');
    } else {
      viewer.stopAutoRotate();
      e.currentTarget.classList.remove('active');
    }
  });
  document.getElementById('btnZoomIn').addEventListener('click', () => {
    viewer.setHfov(Math.max(viewer.getHfov() - 15, 50), 300);
  });
  document.getElementById('btnZoomOut').addEventListener('click', () => {
    viewer.setHfov(Math.min(viewer.getHfov() + 15, 120), 300);
  });
  document.getElementById('btnSound').addEventListener('click', (e) => {
    soundOn = !soundOn;
    e.currentTarget.classList.toggle('active', soundOn);
    showToast(soundOn ? 'Sonido ambiente activado' : 'Sonido silenciado');
  });
  document.getElementById('btnOpenPlan').addEventListener('click', () => openModal('planModal'));
  document.getElementById('btnInfo').addEventListener('click', () => openModal('infoModal'));

  // Top actions
  document.getElementById('btnLang').addEventListener('click', (e) => {
    lang = lang === 'ES' ? 'EN' : 'ES';
    e.currentTarget.querySelector('span').textContent = lang;
    showToast(lang === 'ES' ? 'Idioma: Español' : 'Language: English');
  });
  document.getElementById('btnNight').addEventListener('click', (e) => {
    isNight = !isNight;
    e.currentTarget.classList.toggle('active', isNight);
    if (isNight && TOUR.scenes['casco-nocturna']) {
      loadScene('casco-nocturna');
    } else if (!isNight && currentScene === 'casco-nocturna') {
      loadScene('casco-frente');
    } else {
      showToast(isNight ? 'Modo nocturno activado' : 'Modo día');
    }
  });
  document.getElementById('btnShare').addEventListener('click', () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: TOUR.projectName, url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url);
      showToast('Link copiado al portapapeles');
    }
  });
  document.getElementById('btnFullscreen').addEventListener('click', toggleFullscreen);

  // Cerrar modales
  ['planClose', 'infoClose', 'albumClose', 'videoClose', 'locationClose'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => {
      const modal = el.closest('.info-modal, .plan-modal');
      if (modal) closeModal(modal.id);
      if (modal && modal.id === 'videoModal') {
        document.getElementById('videoIframe').src = '';
      }
    });
  });

  // Click fuera de modal cierra
  document.querySelectorAll('.info-modal, .plan-modal').forEach((m) => {
    m.addEventListener('click', (e) => {
      if (e.target === m) {
        closeModal(m.id);
        if (m.id === 'videoModal') document.getElementById('videoIframe').src = '';
      }
    });
  });

  // Album controls
  document.getElementById('albumPrev').addEventListener('click', () => navAlbum(-1));
  document.getElementById('albumNext').addEventListener('click', () => navAlbum(1));

  // Keyboard
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.info-modal.open, .plan-modal.open').forEach((m) => closeModal(m.id));
      closeSideMenu();
    }
    if (e.key === 'm' || e.key === 'M') openModal('planModal');
    if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    if (e.key === 'ArrowLeft' && document.getElementById('albumModal').classList.contains('open')) navAlbum(-1);
    if (e.key === 'ArrowRight' && document.getElementById('albumModal').classList.contains('open')) navAlbum(1);
  });
}

// ===== Side menu =====
function openSideMenu() {
  document.getElementById('sideMenu').classList.add('open');
}
function closeSideMenu() {
  document.getElementById('sideMenu').classList.remove('open');
}

// ===== Modals =====
function openModal(id) {
  document.getElementById(id).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// ===== Album =====
function openAlbum(id) {
  const album = TOUR.albums[id];
  if (!album) return;
  currentAlbum = { id, index: 0 };
  document.getElementById('albumTitle').textContent = album.title;
  updateAlbumImage();
  openModal('albumModal');
}
function navAlbum(delta) {
  if (!currentAlbum.id) return;
  const photos = TOUR.albums[currentAlbum.id].photos;
  currentAlbum.index = (currentAlbum.index + delta + photos.length) % photos.length;
  updateAlbumImage();
}
function updateAlbumImage() {
  const album = TOUR.albums[currentAlbum.id];
  if (!album) return;
  document.getElementById('albumImg').src = album.photos[currentAlbum.index];
  document.getElementById('albumCounter').textContent = `${currentAlbum.index + 1} / ${album.photos.length}`;
}

// ===== Fullscreen =====
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

// ===== Toast =====
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
