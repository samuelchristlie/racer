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
function calculateCarPhysics(car, keys, gameState) {
  const { velocity } = gameState;

  // Calculate car's facing direction
  const facingDir = new THREE.Vector3(
    Math.sin(car.rotation.y),
    0,
    Math.cos(car.rotation.y),
  );

  // Clone velocity for calculation (don't modify state yet)
  const calculatedVelocity = velocity.clone();
  const speed = calculatedVelocity.length();
  const isMoving = speed > 0.0001;

  // Return physics state object
  return {
    velocity: calculatedVelocity,
    speed: speed,
    facingDirection: facingDir,
    isMoving: isMoving,
  };
}

// Update car physics and state
export function updateCar(car, gameState, keys) {
  const { velocity } = gameState;

  // Calculate car's facing direction
  const facingDir = new THREE.Vector3(
    Math.sin(car.rotation.y),
    0,
    Math.cos(car.rotation.y),
  );

  // Apply input force (multiply by analog value 0-1)
  if (keys.forward > 0) {
    const acceleration = facingDir.clone().multiplyScalar(gameState.acceleration * keys.forward);
    velocity.add(acceleration);
  } else if (keys.backward > 0) {
    const acceleration = facingDir.clone().multiplyScalar(-gameState.acceleration * 0.5 * keys.backward);
    velocity.add(acceleration);
  }

  // Apply braking (force opposite to velocity)
  if (keys.brake > 0 && velocity.lengthSq() > 0.0001) {
    const brakeDir = velocity.clone().normalize();
    const brakeForce = brakeDir.multiplyScalar(-gameState.brakeForce * keys.brake);
    velocity.add(brakeForce);
  }

  // Apply friction when coasting
  if (keys.forward <= 0 && keys.backward <= 0 && keys.brake <= 0) {
    const friction = velocity.clone().multiplyScalar(-GAME_CONFIG.friction);
    velocity.add(friction);
  }

  // Apply air resistance (scales with speed squared)
  const speed = velocity.length();
  if (speed > 0.001) {
    const airResistance = velocity
      .clone()
      .normalize()
      .multiplyScalar(-GAME_CONFIG.airResistance * speed * speed);
    velocity.add(airResistance);
  }

  // Clamp velocity to max speed
  velocity.clampLength(0, gameState.maxSpeed);

  // Apply grip correction (blend velocity toward facing direction)
  if (velocity.lengthSq() > 0.0001) {
    const currentSpeed = velocity.length();
    const desiredVelocity = facingDir.clone().multiplyScalar(currentSpeed);
    velocity.lerp(desiredVelocity, GAME_CONFIG.gripFactor);
  }

  // Update car rotation (only when moving)
  if (speed > 0.01) {
    const turnMultiplier = velocity.dot(facingDir) > 0 ? 1 : -1;
    if (keys.left > 0) {
      car.rotation.y += gameState.turnSpeed * keys.left * turnMultiplier;
    }
    if (keys.right > 0) {
      car.rotation.y -= gameState.turnSpeed * keys.right * turnMultiplier;
    }
  }

  // Stop very small velocities
  if (velocity.lengthSq() < 0.000001) {
    velocity.set(0, 0, 0);
  }

  // Move car
  car.position.add(velocity);

  // Return physics state for debug visualization
  return calculateCarPhysics(car, keys, gameState);
}
