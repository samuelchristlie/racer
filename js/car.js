import * as THREE from "three";
import { GAME_CONFIG } from "./config.js";

// Create the F1 car mesh
export function createCar() {
  const car = new THREE.Group();

  // Main body (monocoque) - low and sleek
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: GAME_CONFIG.carBodyColor,
    metalness: GAME_CONFIG.carBodyMetalness,
    roughness: GAME_CONFIG.carBodyRoughness,
  });

  // Nose cone
  const noseGeometry = new THREE.BoxGeometry(0.8, 0.3, 1.5);
  const nose = new THREE.Mesh(noseGeometry, bodyMaterial);
  nose.position.set(0, 0.35, 2.2);
  nose.castShadow = true;
  car.add(nose);

  // Main body
  const bodyGeometry = new THREE.BoxGeometry(1.4, 0.5, 3);
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.set(0, 0.45, 0);
  body.castShadow = true;
  car.add(body);

  // Cockpit opening (driver position)
  const cockpitGeometry = new THREE.BoxGeometry(0.7, 0.3, 1);
  const cockpitMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.3,
    roughness: 0.8,
  });
  const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
  cockpit.position.set(0, 0.8, 0);
  car.add(cockpit);

  // Engine cover behind cockpit
  const engineCoverGeometry = new THREE.BoxGeometry(1.2, 0.6, 1.5);
  const engineCover = new THREE.Mesh(engineCoverGeometry, bodyMaterial);
  engineCover.position.set(0, 0.65, -1.2);
  engineCover.castShadow = true;
  car.add(engineCover);

  // Side pods (cooling intakes)
  const sidePodGeometry = new THREE.BoxGeometry(0.6, 0.4, 1.8);
  const sidePodMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.4,
    roughness: 0.6,
  });

  const leftSidePod = new THREE.Mesh(sidePodGeometry, sidePodMaterial);
  leftSidePod.position.set(-1, 0.4, 0);
  leftSidePod.castShadow = true;
  car.add(leftSidePod);

  const rightSidePod = new THREE.Mesh(sidePodGeometry, sidePodMaterial);
  rightSidePod.position.set(1, 0.4, 0);
  rightSidePod.castShadow = true;
  car.add(rightSidePod);

  // Front wing
  const frontWingGeometry = new THREE.BoxGeometry(2.5, 0.08, 0.4);
  const wingMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.5,
    roughness: 0.5,
  });
  const frontWing = new THREE.Mesh(frontWingGeometry, wingMaterial);
  frontWing.position.set(0, 0.15, 3);
  frontWing.castShadow = true;
  car.add(frontWing);

  // Front wing end plates
  const endPlateGeometry = new THREE.BoxGeometry(0.08, 0.25, 0.4);
  const leftEndPlate = new THREE.Mesh(endPlateGeometry, wingMaterial);
  leftEndPlate.position.set(-1.25, 0.23, 3);
  car.add(leftEndPlate);

  const rightEndPlate = new THREE.Mesh(endPlateGeometry, wingMaterial);
  rightEndPlate.position.set(1.25, 0.23, 3);
  car.add(rightEndPlate);

  // Rear wing
  const rearWingGeometry = new THREE.BoxGeometry(2.2, 0.08, 0.5);
  const rearWing = new THREE.Mesh(rearWingGeometry, wingMaterial);
  rearWing.position.set(0, 1.2, -2.2);
  rearWing.castShadow = true;
  car.add(rearWing);

  // Rear wing end plates (larger)
  const rearEndPlateGeometry = new THREE.BoxGeometry(0.1, 0.6, 0.4);
  const leftRearEndPlate = new THREE.Mesh(rearEndPlateGeometry, wingMaterial);
  leftRearEndPlate.position.set(-1.1, 1.1, -2.2);
  car.add(leftRearEndPlate);

  const rightRearEndPlate = new THREE.Mesh(rearEndPlateGeometry, wingMaterial);
  rightRearEndPlate.position.set(1.1, 1.1, -2.2);
  car.add(rightRearEndPlate);

  // Rear wing supports
  const supportGeometry = new THREE.BoxGeometry(0.08, 0.6, 0.08);
  const leftSupport = new THREE.Mesh(supportGeometry, wingMaterial);
  leftSupport.position.set(-0.8, 0.85, -2.2);
  car.add(leftSupport);

  const rightSupport = new THREE.Mesh(supportGeometry, wingMaterial);
  rightSupport.position.set(0.8, 0.85, -2.2);
  car.add(rightSupport);

  // Halo (safety device)
  const haloGeometry = new THREE.TorusGeometry(0.4, 0.04, 8, 16, Math.PI);
  const haloMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.8,
    roughness: 0.2,
  });
  const halo = new THREE.Mesh(haloGeometry, haloMaterial);
  halo.position.set(0, 0.9, 0.3);
  halo.rotation.x = Math.PI / 2;
  halo.rotation.z = Math.PI;
  car.add(halo);

  // Wheels - F1 cars have larger rear wheels
  const wheelMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.3,
    roughness: 0.7,
  });
  const tireMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.1,
    roughness: 0.9,
  });

  // Front wheels (smaller)
  const frontWheelGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.35, 24);
  const frontWheelPositions = [
    { x: -1.4, z: 1.8 },
    { x: 1.4, z: 1.8 },
  ];

  frontWheelPositions.forEach((pos) => {
    // Tire
    const tire = new THREE.Mesh(frontWheelGeometry, tireMaterial);
    tire.rotation.z = Math.PI / 2;
    tire.position.set(pos.x, 0.35, pos.z);
    tire.castShadow = true;
    car.add(tire);

    // Rim
    const rimGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.36, 16);
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.9,
      roughness: 0.1,
    });
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    rim.rotation.z = Math.PI / 2;
    rim.position.set(pos.x, 0.35, pos.z);
    car.add(rim);
  });

  // Rear wheels (larger - F1 characteristic)
  const rearWheelGeometry = new THREE.CylinderGeometry(0.42, 0.42, 0.45, 24);
  const rearWheelPositions = [
    { x: -1.5, z: -1.3 },
    { x: 1.5, z: -1.3 },
  ];

  rearWheelPositions.forEach((pos) => {
    // Tire
    const tire = new THREE.Mesh(rearWheelGeometry, tireMaterial);
    tire.rotation.z = Math.PI / 2;
    tire.position.set(pos.x, 0.42, pos.z);
    tire.castShadow = true;
    car.add(tire);

    // Rim
    const rimGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.46, 16);
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.9,
      roughness: 0.1,
    });
    const rim = new THREE.Mesh(rimGeometry, rimMaterial);
    rim.rotation.z = Math.PI / 2;
    rim.position.set(pos.x, 0.42, pos.z);
    car.add(rim);
  });

  // Camera pod on top (F1 TV camera)
  const cameraPodGeometry = new THREE.BoxGeometry(0.15, 0.1, 0.15);
  const cameraPod = new THREE.Mesh(cameraPodGeometry, wingMaterial);
  cameraPod.position.set(0, 1.35, -0.3);
  car.add(cameraPod);

  // Number on the body (simple colored box)
  const numberPlateGeometry = new THREE.BoxGeometry(0.4, 0.25, 0.05);
  const numberPlateMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.5,
  });
  const numberPlate = new THREE.Mesh(numberPlateGeometry, numberPlateMaterial);
  numberPlate.position.set(0, 0.75, 0.76);
  car.add(numberPlate);

  return car;
}

// Calculate car physics state (separated from state mutation for reuse)
// All values in SI units: meters, m/s, m/s², kg, N
function calculateCarPhysics(car, keys, gameState, appliedForces) {
  const { velocity } = gameState;

  // Calculate car's facing direction
  const facingDir = new THREE.Vector3(
    Math.sin(car.rotation.y),
    0,
    Math.cos(car.rotation.y),
  );

  // Clone velocity for calculation (don't modify state yet)
  const calculatedVelocity = velocity.clone();
  const speed = calculatedVelocity.length(); // m/s
  const isMoving = speed > 0.01;

  // Return physics state object
  return {
    velocity: calculatedVelocity,
    speed: speed,
    facingDirection: facingDir,
    isMoving: isMoving,
    forces: appliedForces,
  };
}

// Update car physics and state (SI units: meters, m/s, m/s², kg, N)
// deltaTime: time in seconds since last frame (for frame-independent physics)
export function updateCar(car, gameState, keys, deltaTime) {
  const { velocity } = gameState;
  const carMass = GAME_CONFIG.carMass; // kg

  // Calculate car's facing direction
  const facingDir = new THREE.Vector3(
    Math.sin(car.rotation.y),
    0,
    Math.cos(car.rotation.y),
  );

  // Track applied forces for debug display (in newtons)
  const appliedForces = {
    engine: 0,
    brake: 0,
    drag: 0,
    friction: 0,
  };

  // Apply engine force using F = ma → a = F/m
  if (keys.forward > 0) {
    const engineForce = GAME_CONFIG.engineForce * keys.forward; // N
    appliedForces.engine = engineForce;
    const engineAcceleration = engineForce / carMass; // m/s²
    const accelerationVec = facingDir.clone().multiplyScalar(engineAcceleration * deltaTime);
    velocity.add(accelerationVec);
  } else if (keys.backward > 0) {
    // Reverse with half the force
    const engineForce = -GAME_CONFIG.engineForce * 0.5 * keys.backward; // N
    appliedForces.engine = engineForce;
    const engineAcceleration = engineForce / carMass; // m/s²
    const accelerationVec = facingDir.clone().multiplyScalar(engineAcceleration * deltaTime);
    velocity.add(accelerationVec);
  }

  // Apply braking force (opposite to velocity direction)
  if (keys.brake > 0 && velocity.lengthSq() > 0.0001) {
    const brakeDir = velocity.clone().normalize();
    const brakeForce = GAME_CONFIG.brakeForce * keys.brake; // N
    appliedForces.brake = brakeForce;
    const brakeAcceleration = brakeForce / carMass; // m/s²
    const brakeVec = brakeDir.multiplyScalar(-brakeAcceleration * deltaTime);
    velocity.add(brakeVec);
  }

  // Apply rolling resistance (friction) when coasting
  if (keys.forward <= 0 && keys.backward <= 0 && keys.brake <= 0) {
    // Rolling resistance: F = µ · m · g (simplified as fraction per second)
    const frictionCoeff = GAME_CONFIG.friction; // per-second coefficient
    const frictionDeceleration = frictionCoeff * 9.81; // m/s² (using g = 9.81 m/s²)
    appliedForces.friction = frictionDeceleration * carMass;
    const frictionVec = velocity.clone().multiplyScalar(-frictionDeceleration * deltaTime);
    velocity.add(frictionVec);
  }

  // Apply aerodynamic drag: F = 0.5 · ρ · Cd · A · v²
  // Simplified: F = dragCoefficient · v²
  const speed = velocity.length(); // m/s
  if (speed > 0.01) {
    const dragForce = GAME_CONFIG.dragCoefficient * speed * speed; // N
    appliedForces.drag = dragForce;
    const dragAcceleration = dragForce / carMass; // m/s²
    const dragDir = velocity.clone().normalize();
    const dragVec = dragDir.multiplyScalar(-dragAcceleration * deltaTime);
    velocity.add(dragVec);
  }

  // Clamp velocity to max speed
  velocity.clampLength(0, GAME_CONFIG.maxSpeed);

  // Apply grip correction (blend velocity toward facing direction for cornering)
  // This simulates tire grip - higher value = tighter cornering
  if (velocity.lengthSq() > 0.0001) {
    const currentSpeed = velocity.length();
    const desiredVelocity = facingDir.clone().multiplyScalar(currentSpeed);
    // Grip factor is per-second, scale by deltaTime
    const gripFactor = 1 - Math.pow(1 - GAME_CONFIG.gripFactor, deltaTime);
    velocity.lerp(desiredVelocity, gripFactor);
  }

  // Update car rotation (only when moving) - turn speed is in rad/s
  if (speed > 0.1) {
    const turnMultiplier = velocity.dot(facingDir) > 0 ? 1 : -1;
    const turnAmount = GAME_CONFIG.turnSpeed * deltaTime; // radians
    if (keys.left > 0) {
      car.rotation.y += turnAmount * keys.left * turnMultiplier;
    }
    if (keys.right > 0) {
      car.rotation.y -= turnAmount * keys.right * turnMultiplier;
    }
  }

  // Stop very small velocities
  if (velocity.lengthSq() < 0.0001) {
    velocity.set(0, 0, 0);
  }

  // Move car (position += velocity * deltaTime)
  const displacement = velocity.clone().multiplyScalar(deltaTime);
  car.position.add(displacement);

  // Return physics state for debug visualization
  return calculateCarPhysics(car, keys, gameState, appliedForces);
}
