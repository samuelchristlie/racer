import * as THREE from "three";

// Game configuration constants
export const GAME_CONFIG = {
  // Game state defaults
  maxSpeed: 2,
  acceleration: 0.02,
  deceleration: 0.01,
  brakeForce: 0.05,
  turnSpeed: 0.03,
  totalLaps: 3,

  // Scene
  backgroundColor: 0x87ceeb,
  fogColor: 0x87ceeb,
  fogNear: 50,
  fogFar: 200,
  groundSize: 500,
  groundColor: 0x3d9140,

  // Camera
  cameraFOV: 75,
  cameraNear: 0.1,
  cameraFar: 1000,
  cameraHeight: 3,
  cameraDistance: -5,
  cameraLookOffset: new THREE.Vector3(0, 2, 10),

  // Lighting
  ambientLightIntensity: 0.5,
  directionalLightIntensity: 0.8,
  directionalLightPosition: new THREE.Vector3(50, 100, 50),
  shadowMapSize: 2048,
  shadowCameraNear: 0.5,
  shadowCameraFar: 500,
  shadowCameraLeft: -100,
  shadowCameraRight: 100,
  shadowCameraTop: 100,
  shadowCameraBottom: -100,

  // Track
  trackWidth: 22.5,
  trackLength: 200,
  trackCurveRadius: 60,
  trackColor: 0x333333,
  curveSegments: 32,
  finishLineColor: 0xffffff,
  checkColor: 0x000000,

  // Car
  carBodyColor: 0xff0000,
  carBodyMetalness: 0.6,
  carBodyRoughness: 0.4,
  carTopColor: 0xcc0000,
  windshieldColor: 0x333333,
  windshieldOpacity: 0.7,
  wheelColor: 0x111111,
  headlightColor: 0xffff00,
  taillightColor: 0xff0000,

  // Lap counting
  checkpointDistance: 20,
  finishLineDistance: 10,

  // Car positioning
  carStartZOffset: 5,

  // Input gauge
  gaugeThrottleColor: 0x00ff88,
  gaugeBrakeColor: 0xff4444,
  gaugeEmptyColor: "rgba(0, 0, 0, 0.6)",
  gaugeHeight: 12,
  gaugeGap: 4,
  gaugeBottomOffset: 20,
  gaugeThrottleRatio: 0.67,
};
