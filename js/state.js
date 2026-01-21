import * as THREE from "three";
import { GAME_CONFIG } from "./config.js";

// Game state (SI units: meters, m/s, m/s², kg, N)
export const gameState = {
  velocity: new THREE.Vector3(0, 0, 0), // m/s
  maxSpeed: GAME_CONFIG.maxSpeed, // m/s
  engineForce: GAME_CONFIG.engineForce, // N
  brakeForce: GAME_CONFIG.brakeForce, // N
  turnSpeed: GAME_CONFIG.turnSpeed, // rad/s
  carMass: GAME_CONFIG.carMass, // kg
  currentLap: 1,
  totalLaps: GAME_CONFIG.totalLaps,
  checkpoint: 0,
  debugMode: false,
  cameraRotation: 0,
  cameraInputActive: false,
};

// Input state (0-1 analog values for controller support)
export const keys = {
  forward: 0,
  backward: 0,
  left: 0,
  right: 0,
  brake: 0,
};

// Reset game state to initial values
export function resetGameState() {
  gameState.velocity.set(0, 0, 0);
  gameState.currentLap = 1;
  gameState.checkpoint = 0;
}
