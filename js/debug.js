import * as THREE from "three";
import { GAME_CONFIG } from "./config.js";
import { gameState } from "./state.js";

let velocityArrow = null;
let facingArrow = null;
let scene = null;

// Create debug arrow helpers and add to scene
export function createDebugArrows(targetScene) {
  scene = targetScene;

  // Create velocity arrow (blue)
  velocityArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, 0),
    1,
    GAME_CONFIG.debugVelocityColor,
  );
  velocityArrow.visible = false;
  // Always render on top
  velocityArrow.line.material.depthTest = false;
  velocityArrow.line.material.renderOrder = 999;
  velocityArrow.cone.material.depthTest = false;
  velocityArrow.cone.material.renderOrder = 999;
  scene.add(velocityArrow);

  // Create facing direction arrow (green) - shows throttle direction
  facingArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, 0),
    GAME_CONFIG.debugFacingLength,
    GAME_CONFIG.debugFacingColor,
  );
  facingArrow.visible = false;
  // Always render on top
  facingArrow.line.material.depthTest = false;
  facingArrow.line.material.renderOrder = 999;
  facingArrow.cone.material.depthTest = false;
  facingArrow.cone.material.renderOrder = 999;
  scene.add(facingArrow);
}

// Update debug arrow positions, directions, and lengths
export function updateDebugArrows(car, keys) {
  if (!gameState.debugMode) return;

  const carPos = car.position.clone();
  carPos.y = GAME_CONFIG.debugArrowHeight;

  // Update velocity arrow (blue) - shows where car is actually going
  const { velocity } = gameState;
  if (velocity.lengthSq() > 0.0001) {
    const velDir = velocity.clone().normalize();
    const velLength = velocity.length() * GAME_CONFIG.debugVelocityScale;
    velocityArrow.position.copy(carPos);
    velocityArrow.setDirection(velDir);
    // Keep head size constant
    velocityArrow.setLength(velLength, GAME_CONFIG.debugArrowHeadLength, GAME_CONFIG.debugArrowHeadWidth);
  }

  // Update facing/throttle arrow (green) - fixed to car, shows throttle input level
  const facingDir = new THREE.Vector3(
    Math.sin(car.rotation.y),
    0,
    Math.cos(car.rotation.y),
  );
  facingArrow.position.copy(carPos);
  facingArrow.setDirection(facingDir);

  // Scale arrow shaft based on throttle input (head stays constant)
  const throttleLevel = keys.forward ? 1 : 0;
  const arrowLength = GAME_CONFIG.debugFacingLengthMin +
    (GAME_CONFIG.debugFacingLength - GAME_CONFIG.debugFacingLengthMin) * throttleLevel;
  facingArrow.setLength(arrowLength, GAME_CONFIG.debugArrowHeadLength, GAME_CONFIG.debugArrowHeadWidth);
}

// Toggle debug mode visibility
export function setDebugMode(enabled) {
  gameState.debugMode = enabled;

  if (velocityArrow && facingArrow) {
    velocityArrow.visible = enabled;
    facingArrow.visible = enabled;
  }
}
