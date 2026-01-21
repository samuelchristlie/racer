import * as THREE from "three";
import { GAME_CONFIG } from "./config.js";

// Update camera to follow the car
export function updateCamera(camera, car) {
  // Fixed camera offset
  const targetPosition = new THREE.Vector3();
  targetPosition.copy(car.position);
  targetPosition.y += GAME_CONFIG.cameraHeight;

  const offset = new THREE.Vector3(0, 0, GAME_CONFIG.cameraDistance);
  offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), car.rotation.y);
  targetPosition.add(offset);

  camera.position.lerp(targetPosition, 0.5);

  const lookTarget = car.position.clone();
  // Look slightly down (lower Y offset)
  lookTarget.y -= 3;
  const lookOffset = GAME_CONFIG.cameraLookOffset.clone();
  lookOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), car.rotation.y);
  lookTarget.add(lookOffset);

  camera.lookAt(lookTarget);
}
