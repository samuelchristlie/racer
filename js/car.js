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

  // Nose cone - Narrower and slightly thinner
  const noseGeometry = new THREE.BoxGeometry(0.5, 0.25, 1.5);
  const nose = new THREE.Mesh(noseGeometry, bodyMaterial);
  nose.position.set(0, 0.35, 2.2);
  nose.castShadow = true;
  car.add(nose);

  // Main body - Narrower (was 1.4) and Thinner (was 0.5)
  const bodyGeometry = new THREE.BoxGeometry(0.85, 0.4, 3);
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.set(0, 0.45, 0);
  body.castShadow = true;
  car.add(body);

  // Cockpit opening (driver position) - Adjusted for narrower body
  const cockpitGeometry = new THREE.BoxGeometry(0.5, 0.3, 1);
  const cockpitMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.3,
    roughness: 0.8,
  });
  const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
  cockpit.position.set(0, 0.75, 0); // Lowered slightly
  car.add(cockpit);

  // Engine cover behind cockpit - Narrower (was 1.2)
  const engineCoverGeometry = new THREE.BoxGeometry(0.65, 0.6, 1.5);
  const engineCover = new THREE.Mesh(engineCoverGeometry, bodyMaterial);
  engineCover.position.set(0, 0.65, -1.2);
  engineCover.castShadow = true;
  car.add(engineCover);

  // Side Pods - Simple Box Geometry (Replaces complex mesh to fix face issues)
  const sidePodGeometry = new THREE.BoxGeometry(0.35, 0.35, 1.8);

  const leftSidePod = new THREE.Mesh(sidePodGeometry, bodyMaterial);
  // Positioned at side
  leftSidePod.position.set(-0.55, 0.25, 0);
  leftSidePod.castShadow = true;
  car.add(leftSidePod);

  const rightSidePod = new THREE.Mesh(sidePodGeometry, bodyMaterial);
  // Positioned at side
  rightSidePod.position.set(0.55, 0.25, 0);
  rightSidePod.castShadow = true;
  car.add(rightSidePod);

  // Floor (Undertray) - Joined, thin, and black
  const floorGeometry = new THREE.BoxGeometry(1.4, 0.05, 2.5);
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111, // Carbon black
    metalness: 0.2,
    roughness: 0.8,
  });

  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  // Positioned low (y=0.22) to sit just below the main body
  floor.position.set(0, 0.22, 0);
  floor.castShadow = true;
  car.add(floor);

  // Front wing - Thinner (height reduced from 0.08 to 0.03)
  const frontWingGeometry = new THREE.BoxGeometry(2.5, 0.03, 0.4);
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
  const endPlateGeometry = new THREE.BoxGeometry(0.04, 0.25, 0.4);
  const leftEndPlate = new THREE.Mesh(endPlateGeometry, wingMaterial);
  leftEndPlate.position.set(-1.25, 0.23, 3);
  car.add(leftEndPlate);

  const rightEndPlate = new THREE.Mesh(endPlateGeometry, wingMaterial);
  rightEndPlate.position.set(1.25, 0.23, 3);
  car.add(rightEndPlate);

  // Rear wing - Narrower width (2.2 -> 1.6) and thinner height
  const rearWingGeometry = new THREE.BoxGeometry(1.6, 0.04, 0.5);
  const rearWing = new THREE.Mesh(rearWingGeometry, wingMaterial);
  rearWing.position.set(0, 1.2, -2.2);
  rearWing.castShadow = true;
  car.add(rearWing);

  // Rear wing end plates - Moved inward to match new wing width
  const rearEndPlateGeometry = new THREE.BoxGeometry(0.05, 0.6, 0.4);
  const leftRearEndPlate = new THREE.Mesh(rearEndPlateGeometry, wingMaterial);
  leftRearEndPlate.position.set(-0.8, 1.1, -2.2); // Adjusted x from -1.1 to -0.8
  car.add(leftRearEndPlate);

  const rightRearEndPlate = new THREE.Mesh(rearEndPlateGeometry, wingMaterial);
  rightRearEndPlate.position.set(0.8, 1.1, -2.2); // Adjusted x from 1.1 to 0.8
  car.add(rightRearEndPlate);

  // Rear diffuser - Black box slightly smaller than engine cover, positioned behind it
  const diffuserGeometry = new THREE.BoxGeometry(0.6, 0.5, 0.4); // Much taller and slightly smaller than engine cover
  const diffuserMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111, // Black
    metalness: 0.1,
    roughness: 0.8,
  });
  const diffuser = new THREE.Mesh(diffuserGeometry, diffuserMaterial);
  diffuser.position.set(0, 0.55, -1.95); // Positioned directly behind the engine cover, adjusted height
  diffuser.castShadow = true;
  car.add(diffuser);

  // Rear wing supports
  const supportGeometry = new THREE.BoxGeometry(0.05, 0.6, 0.08);
  const leftSupport = new THREE.Mesh(supportGeometry, wingMaterial);
  leftSupport.position.set(-0.3, 0.85, -2.2); // Adjusted closer to center
  car.add(leftSupport);

  const rightSupport = new THREE.Mesh(supportGeometry, wingMaterial);
  rightSupport.position.set(0.3, 0.85, -2.2); // Adjusted closer to center
  car.add(rightSupport);

  // Halo (safety device)
  const haloGeometry = new THREE.TorusGeometry(0.35, 0.04, 8, 16, Math.PI);
  const haloMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    metalness: 0.8,
    roughness: 0.2,
  });
  const halo = new THREE.Mesh(haloGeometry, haloMaterial);
  halo.position.set(0, 0.85, 0.3);
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

  // Front wheels (smaller) - SIZE KEPT SAME
  const frontWheelGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.35, 24);
  const frontWheelPositions = [
    { x: -0.9, z: 1.8 },
    { x: 0.9, z: 1.8 },
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

  // Rear wheels (larger - F1 characteristic) - Moved inward
  const rearWheelGeometry = new THREE.CylinderGeometry(0.42, 0.42, 0.45, 24);
  const rearWheelPositions = [
    { x: -1.0, z: -1.3 }, // Adjusted x from -1.5 to -1.0
    { x: 1.0, z: -1.3 }, // Adjusted x from 1.5 to 1.0
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
  const cameraPodGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.15);
  const cameraPod = new THREE.Mesh(cameraPodGeometry, wingMaterial);
  cameraPod.position.set(0, 1.25, -0.3);
  car.add(cameraPod);

  // Number on the body (simple colored box)
  const numberPlateGeometry = new THREE.BoxGeometry(0.3, 0.25, 0.05);
  const numberPlateMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.5,
  });
  const numberPlate = new THREE.Mesh(numberPlateGeometry, numberPlateMaterial);
  numberPlate.position.set(0, 0.7, 0.76);
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
    const accelerationVec = facingDir
      .clone()
      .multiplyScalar(engineAcceleration * deltaTime);
    velocity.add(accelerationVec);
  } else if (keys.backward > 0) {
    // Reverse with half the force
    const engineForce = -GAME_CONFIG.engineForce * 0.5 * keys.backward; // N
    appliedForces.engine = engineForce;
    const engineAcceleration = engineForce / carMass; // m/s²
    const accelerationVec = facingDir
      .clone()
      .multiplyScalar(engineAcceleration * deltaTime);
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
    const frictionVec = velocity
      .clone()
      .multiplyScalar(-frictionDeceleration * deltaTime);
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
