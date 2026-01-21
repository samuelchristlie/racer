import * as THREE from "three";

/**
 * SI UNIT PHYSICS SYSTEM
 * ======================
 *
 * This game uses International System of Units (SI) for all physics calculations:
 * - Distance: meters (m)
 * - Speed: meters per second (m/s)
 * - Acceleration: meters per second squared (m/s²)
 * - Mass: kilograms (kg)
 * - Force: newtons (N)
 * - Time: seconds (s)
 *
 * World Scale: 1 Three.js world unit = 1 meter exactly
 *
 * PHYSICS TUNING GUIDE
 * =====================
 *
 * To adjust car performance, modify these values in CAR_TYPES:
 *
 * 1. Mass (kg): Heavier cars accelerate slower but maintain momentum
 * 2. Engine Force (N): Higher = faster acceleration (F = ma, so a = F/m)
 * 3. Brake Force (N): Higher = quicker deceleration when braking
 * 4. Max Speed (m/s): Top speed limit
 *
 * Quick Force Calculations:
 * - To reach 100 km/h (27.8 m/s) in 2.5s: a = 27.8/2.5 = 11.1 m/s²
 * - For 800kg car: F = 800 * 11.1 ≈ 8,880 N (use ~28,000 N for accounting drag)
 *
 * To add a new car type:
 * 1. Add entry to CAR_TYPES object with unique key
 * 2. Set currentCarType to your new car's key
 * 3. Physics calculations automatically use the new values
 */

// Physics scale: 1 Three.js world unit = 1 meter (SI units)
export const PHYSICS_SCALE = 1.0;

// Car type definitions for extensibility (different masses, performance)
// Current implementation: single F1 car
export const CAR_TYPES = {
  f1: {
    name: "Formula 1",
    mass: 800, // kg (FIA minimum weight)
    maxSpeed: 89, // m/s (~320 km/h)
    engineForce: 28000, // N (0-100 km/h in ~2.5s)
    brakeForce: 16000, // N (strong braking)
    length: 5.5, // m
    width: 2.0, // m
  },
};

// Currently active car type
export const currentCarType = "f1";

// Game configuration constants (SI units: meters, m/s, m/s², kg, N)
export const GAME_CONFIG = {
  // Game state defaults (SI units)
  maxSpeed: CAR_TYPES[currentCarType].maxSpeed, // m/s (~320 km/h for F1)
  engineForce: CAR_TYPES[currentCarType].engineForce, // N
  deceleration: 0.01, // Not used - kept for reference
  brakeForce: CAR_TYPES[currentCarType].brakeForce, // N
  turnSpeed: 2.0, // rad/s (~180°/s at speed)
  totalLaps: 3,
  carMass: CAR_TYPES[currentCarType].mass, // kg

  // Scene (SI units - meters)
  backgroundColor: 0x87ceeb,
  fogColor: 0x87ceeb,
  fogNear: 100,
  fogFar: 500, // Increased for larger track visibility
  groundSize: 1200, // Increased for larger track
  groundColor: 0x1a4d1a, // Dark, saturated green grass

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

  // Track (SI units - meters)
  trackWidth: 12,
  trackLength: 500, // m (2.5x scale for realistic F1 speeds)
  trackCurveRadius: 150, // m (2.5x scale for high-speed cornering)
  trackColor: 0x1a1a1a, // Very dark asphalt
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

  // Lap counting (SI units - meters)
  checkpointDistance: 50, // m (scaled with track size)
  finishLineDistance: 25, // m (scaled with track size)

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

  // Steering gauge
  gaugeSteeringColor: 0xffffff,
  gaugeSteeringGap: 12,

  // Physics (SI units)
  gripFactor: 0.8, // Cornering grip factor (0-1, higher = more grip)
  friction: 0.3, // Rolling resistance coefficient (0-1)
  dragCoefficient: 1.5, // Aerodynamic drag (Cd·A for F1 car)

  // Debug visualization (SI units - arrows scale with m/s velocities)
  debugVelocityColor: 0x0088ff,
  debugFacingColor: 0x00ff00,
  debugVelocityScale: 0.02, // Scale velocity for arrow length (89 m/s * 0.02 ≈ 1.8 units)
  debugFacingLength: 5, // meters (fixed length for facing arrow)
  debugFacingLengthMin: 2, // meters (minimum length when moving)
  debugArrowHeight: 0.5, // meters above ground
  debugArrowHeadLength: 0.3, // meters (smaller arrow head)
  debugArrowHeadWidth: 0.2, // meters

  // Controller
  controllerDeadzone: 0.1,
  controllerButtonRT: 7,
  controllerButtonRB: 6,
  controllerAxisLeftStickX: 0,
  controllerAxisRightStickX: 2,
  controllerAxisRightStickY: 3,

  // Camera rotation
  cameraReturnSpeed: 0.95,
  cameraRotationMinThreshold: 0.001,
};
