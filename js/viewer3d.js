/* ========================================
   FLESH 360 — Visor 3D del Hero
   Adaptado del visor Catedral de Bariloche
   Three.js + GLTFLoader + DRACO + base fija + joystick + intro fly-in
   ======================================== */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const stage = document.getElementById('v3dStage');
const app = document.getElementById('v3dApp');
if (!stage || !app) {
  console.warn('Visor 3D: contenedor no encontrado');
} else {

  // ===== Setup =====
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const sizeOf = () => {
    const r = stage.getBoundingClientRect();
    return { w: Math.max(320, r.width), h: Math.max(220, r.height) };
  };

  const { w: w0, h: h0 } = sizeOf();
  renderer.setSize(w0, h0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  app.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // Fondo: gradiente oscuro azul-noche + niebla atmosférica suave
  const bgCanvas = document.createElement('canvas');
  bgCanvas.width = 2; bgCanvas.height = 512;
  const bgCtx = bgCanvas.getContext('2d');
  const bgGrad = bgCtx.createLinearGradient(0, 0, 0, 512);
  bgGrad.addColorStop(0.0, '#0a0e1a');  // arriba: azul noche profundo
  bgGrad.addColorStop(0.4, '#0d1420');  // cielo medio
  bgGrad.addColorStop(0.75, '#111820'); // horizonte oscuro
  bgGrad.addColorStop(1.0, '#0a0c10');  // suelo: casi negro
  bgCtx.fillStyle = bgGrad;
  bgCtx.fillRect(0, 0, 2, 512);
  scene.background = new THREE.CanvasTexture(bgCanvas);

  // Niebla atmosférica (profundidad + misterio) — misma paleta azul noche
  scene.fog = new THREE.FogExp2(0x0d1420, 0.018);

  // Campo de estrellas (1200 puntos blancos dispersos)
  const starGeo = new THREE.BufferGeometry();
  const starCount = 1200;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3]     = (Math.random() - 0.5) * 400;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 400;
    starPos[i * 3 + 2] = (Math.random() - 0.5) * 400;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.35,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.75,
  });
  scene.add(new THREE.Points(starGeo, starMat));

  const camera = new THREE.PerspectiveCamera(50, w0 / h0, 0.01, 100000);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.autoRotate = true;
  controls.autoRotateSpeed = -0.6; // negativo = sentido horario (visto desde arriba)
  controls.enablePan = false; // base fija
  controls.minPolarAngle = 0.0;
  controls.maxPolarAngle = Math.PI * 0.495; // nunca por debajo del piso

  // Luces (premium, con relleno coral cálido para combinar con FLESH brand)
  const hemi = new THREE.HemisphereLight(0xffffff, 0x2a1f1c, 1.1);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xffffff, 1.1);
  dir.position.set(1, 2, 1.5);
  scene.add(dir);
  const dir2 = new THREE.DirectionalLight(0xff8c7a, 0.55); // coral suave de relleno
  dir2.position.set(-1, 1, -1.5);
  scene.add(dir2);

  // ===== Loader del modelo =====
  let model;
  let homePos = new THREE.Vector3();
  let homeTarget = new THREE.Vector3();
  let modelR = 5;
  let intro = null;

  const draco = new DRACOLoader();
  draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);

  loader.load(
    'assets/3d/catedral.glb',
    (gltf) => {
      model = gltf.scene;
      model.traverse((o) => {
        if (o.isMesh && o.material) o.material.side = THREE.DoubleSide;
      });

      // RealityScan exporta con Z arriba — corregir a Y arriba
      model.rotation.x = -Math.PI / 2;
      model.updateMatrixWorld(true);

      // Centrar en X/Z, apoyar la BASE en y=0
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 10 / maxDim;
      model.scale.setScalar(scale);
      model.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
      scene.add(model);

      // Vista hero: 3/4 lateral
      modelR = (maxDim * scale) * 0.5;
      homeTarget.set(0, size.y * scale * 0.30, 0);

      const dist = modelR / Math.sin((camera.fov / 2) * Math.PI / 180) * 1.0;
      const phi0 = THREE.MathUtils.degToRad(63);
      const theta0 = 0.85;
      homePos.copy(homeTarget).add(new THREE.Vector3().setFromSphericalCoords(dist, phi0, theta0));

      camera.near = dist / 2000;
      camera.far = dist * 2000;
      camera.updateProjectionMatrix();
      controls.target.copy(homeTarget);
      controls.minDistance = modelR * 0.5;
      controls.maxDistance = dist * 2.6;

      // Intro: fly-in desde arriba → hero
      const start = homeTarget.clone().add(
        new THREE.Vector3().setFromSphericalCoords(dist * 1.15, THREE.MathUtils.degToRad(14), theta0 - 0.5)
      );
      camera.position.copy(start);
      controls.update();
      controls.enabled = false;
      intro = { t: 0, dur: 2.6, from: start.clone(), to: homePos.clone() };

      const ld = document.getElementById('v3dLoader');
      if (ld) {
        ld.style.opacity = '0';
        setTimeout(() => ld.style.display = 'none', 500);
      }
    },
    (ev) => {
      if (ev.lengthComputable) {
        const pct = Math.round((ev.loaded / ev.total) * 100);
        const fill = document.getElementById('v3dBarFill');
        const lbl = document.getElementById('v3dLoaderLbl');
        if (fill) fill.style.width = pct + '%';
        if (lbl) lbl.textContent = `Cargando modelo 3D… ${pct}%`;
      }
    },
    (err) => {
      const lbl = document.getElementById('v3dLoaderLbl');
      if (lbl) lbl.textContent = 'Error al cargar el modelo.';
      console.error('v3d loader error:', err);
    }
  );

  // ===== Joystick =====
  const joy = document.getElementById('v3dJoy');
  const knob = document.getElementById('v3dKnob');
  let joyVec = { x: 0, y: 0 };
  let joyActive = false;
  const JOY_MAX = 30;

  function setKnob(dx, dy) {
    const len = Math.hypot(dx, dy);
    if (len > JOY_MAX) { dx = dx / len * JOY_MAX; dy = dy / len * JOY_MAX; }
    if (knob) knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    joyVec.x = dx / JOY_MAX;
    joyVec.y = dy / JOY_MAX;
  }
  function resetKnob() {
    if (knob) knob.style.transform = 'translate(-50%, -50%)';
    joyVec.x = 0; joyVec.y = 0;
  }
  function joyStart(e) {
    joyActive = true;
    joy.classList.add('drag');
    controls.autoRotate = false;
    joyMove(e);
  }
  function joyMove(e) {
    if (!joyActive) return;
    const r = joy.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    setKnob(p.clientX - (r.left + r.width / 2), p.clientY - (r.top + r.height / 2));
    e.preventDefault();
  }
  function joyEnd() {
    joyActive = false;
    joy.classList.remove('drag');
    resetKnob();
  }

  if (joy) {
    joy.addEventListener('pointerdown', (e) => { joy.setPointerCapture(e.pointerId); joyStart(e); });
    joy.addEventListener('pointermove', joyMove);
    joy.addEventListener('pointerup', joyEnd);
    joy.addEventListener('pointercancel', joyEnd);
  }

  // Aplicar joystick a la cámara (órbita)
  const _off = new THREE.Vector3();
  const _sph = new THREE.Spherical();
  function orbitBy(dTheta, dPhi) {
    _off.copy(camera.position).sub(controls.target);
    _sph.setFromVector3(_off);
    _sph.theta -= dTheta;
    _sph.phi = Math.max(controls.minPolarAngle + 0.02,
              Math.min(controls.maxPolarAngle - 0.02, _sph.phi - dPhi));
    _off.setFromSpherical(_sph);
    camera.position.copy(controls.target).add(_off);
  }
  function dollyBy(factor) {
    _off.copy(camera.position).sub(controls.target);
    let len = _off.length() * factor;
    len = Math.max(controls.minDistance, Math.min(controls.maxDistance, len));
    _off.setLength(len);
    camera.position.copy(controls.target).add(_off);
  }

  // ===== Zoom (hold) =====
  let zoomDir = 0;
  function holdBtn(el, dir) {
    if (!el) return;
    const dn = (e) => { zoomDir = dir; e.preventDefault(); };
    const up = () => { zoomDir = 0; };
    el.addEventListener('pointerdown', dn);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointerleave', up);
    el.addEventListener('pointercancel', up);
  }
  holdBtn(document.getElementById('v3dZin'), -1);
  holdBtn(document.getElementById('v3dZout'), 1);

  // Reset
  document.getElementById('v3dReset')?.addEventListener('click', () => {
    intro = { t: 0, dur: 1.1, from: camera.position.clone(), to: homePos.clone() };
    controls.enabled = false;
    controls.autoRotate = true;
  });

  // ===== Resize (con debounce para evitar feedback loops) =====
  let resizeTimer = null;
  function resize() {
    if (resizeTimer) cancelAnimationFrame(resizeTimer);
    resizeTimer = requestAnimationFrame(() => {
      const { w, h } = sizeOf();
      if (Math.abs(w - renderer.domElement.width) < 2 && Math.abs(h - renderer.domElement.height) < 2) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false); // false = no actualizar el style del canvas
    });
  }
  window.addEventListener('resize', resize);
  // Resize inicial cuando el navegador termina layout
  requestAnimationFrame(() => requestAnimationFrame(resize));

  // ===== Animation loop =====
  function easeInOut(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  let last = performance.now();

  function animate(now) {
    requestAnimationFrame(animate);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    if (intro) {
      intro.t += dt / intro.dur;
      const k = easeInOut(Math.min(1, intro.t));
      camera.position.lerpVectors(intro.from, intro.to, k);
      camera.lookAt(controls.target);
      if (intro.t >= 1) { intro = null; controls.enabled = true; }
    } else {
      if (joyVec.x || joyVec.y) orbitBy(joyVec.x * 1.6 * dt, -joyVec.y * 1.6 * dt);
      if (zoomDir) dollyBy(1 + zoomDir * 0.9 * dt);
    }

    controls.update();
    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);
}
