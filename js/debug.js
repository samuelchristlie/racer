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
export function updateDebugArrows(car, physics, keys) {
  if (!gameState.debugMode) return;

  const carPos = car.position.clone();
  carPos.y = GAME_CONFIG.debugArrowHeight;

  // Update velocity arrow (blue) - shows where car is actually going
  // Arrow is always visible (length 0 when stopped)
  const velDir = physics.velocity.clone().normalize();
  const velLength = Math.max(0, physics.speed * GAME_CONFIG.debugVelocityScale);
  velocityArrow.position.copy(carPos);
  velocityArrow.setDirection(velDir);
  // Keep head size constant, shaft length may be 0
  velocityArrow.setLength(velLength, GAME_CONFIG.debugArrowHeadLength, GAME_CONFIG.debugArrowHeadWidth);

  // Update facing/throttle arrow (green) - fixed to car, shows throttle input level
  // Arrow is always visible (length 0 when stopped, longer with throttle when moving)
  facingArrow.position.copy(carPos);
  facingArrow.setDirection(physics.facingDirection);

  // Scale arrow shaft based on throttle input (head stays constant)
  // When stopped, show length 0. When moving, show length based on throttle.
  const arrowLength = physics.isMoving
    ? (GAME_CONFIG.debugFacingLengthMin +
       (GAME_CONFIG.debugFacingLength - GAME_CONFIG.debugFacingLengthMin) * keys.forward)
    : 0;
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
