import * as THREE from "three";
import { GAME_CONFIG } from "./config.js";

// Game state
export const gameState = {
  velocity: new THREE.Vector3(0, 0, 0),
  maxSpeed: GAME_CONFIG.maxSpeed,
  acceleration: GAME_CONFIG.acceleration,
  deceleration: GAME_CONFIG.deceleration,
  brakeForce: GAME_CONFIG.brakeForce,
  turnSpeed: GAME_CONFIG.turnSpeed,
  currentLap: 1,
  totalLaps: GAME_CONFIG.totalLaps,
  checkpoint: 0,
  debugMode: false,
};

// Input state
export const keys = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  brake: false,
};

// Reset game state to initial values
export function resetGameState() {
  gameState.velocity.set(0, 0, 0);
  gameState.currentLap = 1;
  gameState.checkpoint = 0;
}
