import * as THREE from "three";
import { GAME_CONFIG } from "./config.js";
import { gameState, keys } from "./state.js";
import { createScene } from "./scene.js";
import { createTrack } from "./track.js";
import { createCar, updateCar } from "./car.js";
import { updateCamera } from "./camera.js";
import { setupInput, setupDebugToggle } from "./input.js";
import { pollController } from "./controller.js";
import { createUI, updateUI, updateInputGauge, updateSteeringGauge, createDebugInfo, updateDebugInfo } from "./ui.js";
import { createDebugArrows, updateDebugArrows, setDebugMode } from "./debug.js";

// Initialize scene, camera, and renderer
const { scene, camera, renderer, clock } = createScene();

// Create and add track to scene
const track = createTrack();
scene.add(track);

// Create and add car to scene
const car = createCar();
car.position.set(0, 0, GAME_CONFIG.trackCurveRadius + GAME_CONFIG.carStartZOffset);
scene.add(car);

// Setup input handlers
setupInput(keys, gameState);

// Setup debug toggle
setupDebugToggle(() => {
  setDebugMode(!gameState.debugMode);
});

// Create debug arrows
createDebugArrows(scene);

// Create UI references and debug overlay
const ui = createUI();
createDebugInfo();

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Get delta time in seconds for frame-independent physics
  const deltaTime = Math.min(clock.getDelta(), 0.1); // Cap at 0.1s to prevent huge jumps

  pollController(keys, gameState);
  const physics = updateCar(car, gameState, keys, deltaTime);
  updateCamera(camera, car, gameState, deltaTime);
  updateUI(gameState, car, ui);
  updateDebugInfo(gameState, car, physics, ui);
  updateInputGauge(keys, ui);
  updateSteeringGauge(keys, ui);
  updateDebugArrows(car, physics, keys);

  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start game
animate();
