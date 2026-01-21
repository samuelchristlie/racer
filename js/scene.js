import * as THREE from "three";
import { GAME_CONFIG } from "./config.js";

// Create scene, camera, and renderer
export function createScene() {
  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(GAME_CONFIG.backgroundColor);
  scene.fog = new THREE.Fog(
    GAME_CONFIG.fogColor,
    GAME_CONFIG.fogNear,
    GAME_CONFIG.fogFar,
  );

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    GAME_CONFIG.cameraFOV,
    window.innerWidth / window.innerHeight,
    GAME_CONFIG.cameraNear,
    GAME_CONFIG.cameraFar,
  );

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(
    0xffffff,
    GAME_CONFIG.ambientLightIntensity,
  );
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    GAME_CONFIG.directionalLightIntensity,
  );
  directionalLight.position.copy(GAME_CONFIG.directionalLightPosition);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = GAME_CONFIG.shadowMapSize;
  directionalLight.shadow.mapSize.height = GAME_CONFIG.shadowMapSize;
  directionalLight.shadow.camera.near = GAME_CONFIG.shadowCameraNear;
  directionalLight.shadow.camera.far = GAME_CONFIG.shadowCameraFar;
  directionalLight.shadow.camera.left = GAME_CONFIG.shadowCameraLeft;
  directionalLight.shadow.camera.right = GAME_CONFIG.shadowCameraRight;
  directionalLight.shadow.camera.top = GAME_CONFIG.shadowCameraTop;
  directionalLight.shadow.camera.bottom = GAME_CONFIG.shadowCameraBottom;
  scene.add(directionalLight);

  // Ground
  const groundGeometry = new THREE.PlaneGeometry(
    GAME_CONFIG.groundSize,
    GAME_CONFIG.groundSize,
  );
  const groundMaterial = new THREE.MeshStandardMaterial({
    color: GAME_CONFIG.groundColor,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  return { scene, camera, renderer };
}
