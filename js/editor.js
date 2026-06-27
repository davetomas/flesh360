/* ========================================
   FLESH 360 — Editor
   Mockup interactivo del editor de tours
   ======================================== */

// ===== Estado del editor =====
const STATE = {
  currentSceneId: 'living',
  scenes: [
    {
      id: 'living',
      name: 'Bariloche · Vista aérea',
      subtitle: 'Lago Nahuel Huapi · Catedral · Centro',
      thumb: 'assets/panos/bariloche-360-lago.jpg',
      panorama: 'assets/panos/bariloche-360-lago.jpg',
      hotspots: [
        { yaw: 117, pitch: -5, target: 'kitchen', text: 'Ir a Cocina' },
        { yaw: -90, pitch: -10, target: 'outdoor', text: 'Salir al exterior' },
      ],
    },
    {
      id: 'kitchen',
      name: 'Cocina',
      subtitle: 'Cocina integrada · isla central',
      thumb: 'https://pannellum.org/images/cerro-toco-0.jpg',
      panorama: 'https://pannellum.org/images/cerro-toco-0.jpg',
      hotspots: [
        { yaw: 180, pitch: -5, target: 'living', text: 'Volver al Living' },
      ],
    },
    {
      id: 'outdoor',
      name: 'Exterior',
      subtitle: 'Jardín · acceso terraza',
      thumb: 'https://pannellum.org/images/from-tree.jpg',
      panorama: 'https://pannellum.org/images/from-tree.jpg',
      hotspots: [
        { yaw: 0, pitch: -5, target: 'living', text: 'Entrar al Living' },
      ],
    },
  ],
};

let viewer = null;

// ===== Init =====
window.addEventListener('load', () => {
  renderScenes();
  loadSceneInViewer(STATE.currentSceneId);
  bindUI();
});

// ===== Render scenes list =====
function renderScenes() {
  const list = document.getElementById('scenesList');
  list.innerHTML = STATE.scenes
    .map(
      (s, i) => `
    <div class="scene-card ${s.id === STATE.currentSceneId ? 'active' : ''}" data-scene-id="${s.id}">
      <div class="scene-thumb-sm"><img src="${s.thumb}" alt="${s.name}" loading="lazy"/></div>
      <div class="scene-card-info">
        <strong>${s.name}</strong>
        <small>${s.hotspots.length} hotspots</small>
      </div>
      <span class="scene-num">${String(i + 1).padStart(2, '0')}</span>
    </div>
  `
    )
    .join('');

  list.querySelectorAll('.scene-card').forEach((card) => {
    card.addEventListener('click', () => {
      STATE.currentSceneId = card.dataset.sceneId;
      renderScenes();
      loadSceneInViewer(STATE.currentSceneId);
      updateSceneForm();
    });
  });
}

// ===== Load scene in pannellum =====
function loadSceneInViewer(sceneId) {
  if (typeof pannellum === 'undefined') return;
  const scene = STATE.scenes.find((s) => s.id === sceneId);
  if (!scene) return;

  // Destruir visor previo si existe
  if (viewer && viewer.destroy) {
    try { viewer.destroy(); } catch (e) { /* noop */ }
  }

  viewer = pannellum.viewer('editorPano', {
    type: 'equirectangular',
    panorama: scene.panorama,
    autoLoad: true,
    showControls: false,
    showZoomCtrl: false,
    showFullscreenCtrl: false,
    compass: false,
    hfov: 100,
    autoRotate: 0,
    hotSpots: scene.hotspots.map((h) => ({
      pitch: h.pitch,
      yaw: h.yaw,
      type: 'scene',
      cssClass: 'custom-hotspot',
      text: h.text,
      createTooltipFunc: (div, args) => {
        const label = document.createElement('span');
        label.className = 'custom-hotspot-label';
        label.textContent = args;
        div.appendChild(label);
      },
      createTooltipArgs: h.text,
    })),
  });

  viewer.on('mousedown', updatePositionIndicator);
  viewer.on('mouseup', updatePositionIndicator);

  // Hack: poll position
  const poll = setInterval(() => {
    if (!viewer) { clearInterval(poll); return; }
    updatePositionIndicator();
  }, 200);

  // Doble click para "agregar hotspot"
  setTimeout(() => {
    const panoEl = document.getElementById('editorPano');
    panoEl.addEventListener('dblclick', () => {
      const yaw = viewer.getYaw().toFixed(1);
      const pitch = viewer.getPitch().toFixed(1);
      showToast(`Hotspot añadido en yaw ${yaw}°, pitch ${pitch}° (demo)`);
      markUnsaved();
    });
  }, 500);
}

function updatePositionIndicator() {
  if (!viewer) return;
  try {
    document.getElementById('yawValue').textContent = `Yaw: ${viewer.getYaw().toFixed(0)}°`;
    document.getElementById('pitchValue').textContent = `Pitch: ${viewer.getPitch().toFixed(0)}°`;
  } catch (e) { /* noop */ }
}

function updateSceneForm() {
  const scene = STATE.scenes.find((s) => s.id === STATE.currentSceneId);
  if (!scene) return;
  document.getElementById('sceneName').value = scene.name;
  document.getElementById('sceneSub').value = scene.subtitle;
}

// ===== Bind UI =====
function bindUI() {
  // Tabs en panel derecho
  document.querySelectorAll('.ptab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.ptab;
      document.querySelectorAll('.ptab').forEach((t) => t.classList.remove('active'));
      document.querySelectorAll('.ptab-content').forEach((c) => c.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`[data-ptab-content="${target}"]`).classList.add('active');
    });
  });

  // Top tabs (mockup)
  document.querySelectorAll('.tab-btn').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      if (tab.dataset.tab === 'preview') {
        showToast('Vista previa: cambiando al modo visualización');
      } else if (tab.dataset.tab === 'settings') {
        showToast('Ajustes del proyecto (próximamente)');
      }
    });
  });

  // Herramientas canvas
  document.querySelectorAll('.tool-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tool = btn.dataset.tool;
      if (tool === 'undo' || tool === 'redo') {
        showToast(`${tool === 'undo' ? 'Deshacer' : 'Rehacer'} (sin cambios en demo)`);
        return;
      }
      document.querySelectorAll('.tool-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const labels = {
        select: 'Modo: Seleccionar',
        hotspot: 'Modo: Click en el visor para añadir hotspot',
        info: 'Modo: Punto de información',
        measure: 'Modo: Medir distancias',
      };
      if (labels[tool]) showToast(labels[tool]);
    });
  });

  // Add scene
  document.getElementById('btnAddScene').addEventListener('click', () => {
    showToast('+ Nueva escena (en producción: abre uploader)');
  });

  // Upload zone (drag & drop simulado)
  const uploadZone = document.getElementById('uploadZone');
  uploadZone.addEventListener('click', () => {
    showToast('Selector de archivos (demo)');
  });
  ['dragover', 'dragenter'].forEach((evt) => {
    uploadZone.addEventListener(evt, (e) => {
      e.preventDefault();
      uploadZone.classList.add('dragover');
    });
  });
  ['dragleave', 'drop'].forEach((evt) => {
    uploadZone.addEventListener(evt, (e) => {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
    });
  });
  uploadZone.addEventListener('drop', (e) => {
    if (e.dataTransfer.files.length > 0) {
      showToast(`📸 ${e.dataTransfer.files.length} archivo(s) listos (demo, no se sube aún)`);
    }
  });

  // Color swatches
  document.querySelectorAll('.color-swatch').forEach((sw) => {
    sw.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach((s) => s.classList.remove('active'));
      sw.classList.add('active');
      const color = sw.style.background;
      document.documentElement.style.setProperty('--accent', color);
      showToast(`Color de marca actualizado`);
    });
  });

  // FOV slider
  const fovSlider = document.getElementById('initialFov');
  fovSlider.addEventListener('input', (e) => {
    document.getElementById('fovValue').textContent = `${e.target.value}°`;
    if (viewer) viewer.setHfov(Number(e.target.value), 100);
  });

  // Capture view
  document.getElementById('captureView').addEventListener('click', () => {
    if (!viewer) return;
    document.getElementById('initialYaw').value = viewer.getYaw().toFixed(1);
    document.getElementById('initialPitch').value = viewer.getPitch().toFixed(1);
    showToast('📌 Vista inicial capturada');
    markUnsaved();
  });

  // Auto-rotate toggle
  document.getElementById('autoRotateChk').addEventListener('change', (e) => {
    if (!viewer) return;
    if (e.target.checked) {
      viewer.startAutoRotate(-1.5);
    } else {
      viewer.stopAutoRotate();
    }
  });

  // Delete hotspot
  document.querySelectorAll('.hs-delete').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const item = e.target.closest('.hotspot-item');
      item.style.opacity = '0.3';
      setTimeout(() => item.remove(), 200);
      showToast('Hotspot eliminado');
      markUnsaved();
    });
  });

  // Project name save
  document.getElementById('projectName').addEventListener('input', markUnsaved);
  document.getElementById('sceneName').addEventListener('input', markUnsaved);
  document.getElementById('sceneSub').addEventListener('input', markUnsaved);

  // Preview
  document.getElementById('btnPreview').addEventListener('click', () => {
    window.open('viewer.html', '_blank');
  });

  // Publish
  document.getElementById('btnPublish').addEventListener('click', () => {
    document.getElementById('publishModal').classList.add('open');
  });
  document.getElementById('publishClose').addEventListener('click', () => {
    document.getElementById('publishModal').classList.remove('open');
  });
  document.getElementById('publishModal').addEventListener('click', (e) => {
    if (e.target.id === 'publishModal') e.currentTarget.classList.remove('open');
  });

  // Esc cierra modales
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.info-modal.open').forEach((m) => m.classList.remove('open'));
    }
  });
}

// ===== Save indicator =====
let saveTimer;
function markUnsaved() {
  const ind = document.getElementById('saveIndicator');
  ind.textContent = 'Guardando…';
  ind.style.color = 'var(--accent-3)';
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    ind.textContent = 'Guardado';
    ind.style.color = 'var(--text-3)';
  }, 1200);
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
