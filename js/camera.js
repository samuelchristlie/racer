import * as THREE from "three";
import { GAME_CONFIG } from "./config.js";

// Update camera to follow the car
// deltaTime: time in seconds since last frame (for frame-independent behavior)
export function updateCamera(camera, car, gameState, deltaTime) {
  // Calculate total rotation (car rotation + camera offset)
  const totalRotation = car.rotation.y + gameState.cameraRotation;

  // Fixed camera offset
  const targetPosition = new THREE.Vector3();
  targetPosition.copy(car.position);
  targetPosition.y += GAME_CONFIG.cameraHeight;

  const offset = new THREE.Vector3(0, 0, GAME_CONFIG.cameraDistance);
  offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), totalRotation);
  targetPosition.add(offset);

  camera.position.lerp(targetPosition, 0.5);

  const lookTarget = car.position.clone();
  // Look slightly down (lower Y offset)
  lookTarget.y -= 3;
  const lookOffset = GAME_CONFIG.cameraLookOffset.clone();
  lookOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), totalRotation);
  lookTarget.add(lookOffset);

  camera.lookAt(lookTarget);

  // Smooth return to default position only when no camera input is active
  if (!gameState.cameraInputActive) {
    // Check if rotation is significant enough to decay
    if (Math.abs(gameState.cameraRotation) > GAME_CONFIG.cameraRotationMinThreshold) {
      gameState.cameraRotation *= GAME_CONFIG.cameraReturnSpeed;
    } else {
      gameState.cameraRotation = 0;
    }
  }
}
