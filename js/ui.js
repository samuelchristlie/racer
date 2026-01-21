import { GAME_CONFIG } from "./config.js";

// Get UI element references
export function createUI() {
  return {
    speedElement: document.getElementById("speed"),
    lapElement: document.getElementById("lap"),
    throttleFill: document.getElementById("throttleFill"),
    brakeFill: document.getElementById("brakeFill"),
    steeringFill: document.getElementById("steeringFill"),
    debugElement: document.getElementById("debug-info"),
  };
}

// Create debug info element (called if not already in HTML)
export function createDebugInfo() {
  let debugElement = document.getElementById("debug-info");
  if (!debugElement) {
    debugElement = document.createElement("div");
    debugElement.id = "debug-info";
    debugElement.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      color: white;
      font-family: monospace;
      font-size: 14px;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
      pointer-events: none;
      display: none;
    `;
    document.body.appendChild(debugElement);
  }
  return debugElement;
}

// Update debug info overlay (SI units: m/s, m, rad, kg, N)
export function updateDebugInfo(gameState, car, physics, ui) {
  const { debugElement } = ui;
  if (!debugElement) return;

  // Only show when debug mode is active
  if (!gameState.debugMode) {
    debugElement.style.display = "none";
    return;
  }

  debugElement.style.display = "block";

  const speedMs = physics.speed; // m/s
  const speedKmh = speedMs * 3.6; // km/h
  const pos = car.position;
  const heading = car.rotation.y % (2 * Math.PI);

  debugElement.innerHTML = `
    DEBUG MODE<br>
    Velocity: ${speedMs.toFixed(1)} m/s (${speedKmh.toFixed(1)} km/h)<br>
    Heading: ${heading.toFixed(2)} rad<br>
    Position: (${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}) m<br>
    Mass: ${GAME_CONFIG.carMass} kg<br>
    Engine Force: ${physics.forces.engine.toFixed(0)} N<br>
    Brake Force: ${physics.forces.brake.toFixed(0)} N<br>
    Drag Force: ${physics.forces.drag.toFixed(0)} N<br>
    Friction Force: ${physics.forces.friction.toFixed(0)} N
  `;
}

// Update UI elements (speed and lap counter)
export function updateUI(gameState, car, ui) {
  const { speedElement, lapElement } = ui;

  // Update speed display (convert SI m/s to km/h)
  const speedMs = gameState.velocity.length(); // m/s
  const speedKmh = speedMs * 3.6; // km/h
  speedElement.textContent = `${Math.round(speedKmh)} km/h`;

  // Lap counting (simple checkpoint system)
  const distFromStart = Math.sqrt(
    Math.pow(car.position.x, 2) +
      Math.pow(
        car.position.z -
          (GAME_CONFIG.trackCurveRadius + GAME_CONFIG.trackWidth / 2),
        2,
      ),
  );

  if (distFromStart < GAME_CONFIG.finishLineDistance && gameState.checkpoint === 1) {
    gameState.currentLap++;
    gameState.checkpoint = 0;
    lapElement.textContent = `Lap: ${gameState.currentLap}/${gameState.totalLaps}`;

    if (gameState.currentLap > gameState.totalLaps) {
      alert("Race Complete!");
      gameState.currentLap = 1;
      lapElement.textContent = `Lap: ${gameState.currentLap}/${gameState.totalLaps}`;
    }
  }

  // Checkpoint (opposite side of track)
  const distFromCheckpoint = Math.sqrt(
    Math.pow(car.position.x, 2) +
      Math.pow(
        car.position.z +
          (GAME_CONFIG.trackCurveRadius + GAME_CONFIG.trackWidth / 2),
        2,
      ),
  );

  if (
    distFromCheckpoint < GAME_CONFIG.checkpointDistance &&
    gameState.checkpoint === 0
  ) {
    gameState.checkpoint = 1;
  }
}

// Update input gauge display (throttle and brake)
export function updateInputGauge(keys, ui) {
  const { throttleFill, brakeFill } = ui;

  // Throttle: forward key (W or Arrow Up) or RT (controller)
  // Analog value 0-1, convert to percentage
  const throttleLevel = keys.forward * 100;
  throttleFill.style.width = `${throttleLevel}%`;

  // Brake: brake key (Space) or RB (controller) or backward key (S or Arrow Down)
  // Analog value 0-1, convert to percentage
  const brakeLevel = Math.max(keys.brake, keys.backward) * 100;
  brakeFill.style.width = `${brakeLevel}%`;
}

// Update steering gauge display (left and right)
export function updateSteeringGauge(keys, ui) {
  const { steeringFill } = ui;

  // Steering fills from center line outward to the edges
  // Only one direction should be active at a time (both pressed = neutral)
  if (keys.left > 0 && keys.right <= 0) {
    // Steering left: fill from center to left edge (analog 0-1 becomes 0-50%)
    steeringFill.style.left = "auto";
    steeringFill.style.right = "50%";
    steeringFill.style.width = `${keys.left * 50}%`;
  } else if (keys.right > 0 && keys.left <= 0) {
    // Steering right: fill from center to right edge (analog 0-1 becomes 0-50%)
    steeringFill.style.left = "50%";
    steeringFill.style.right = "auto";
    steeringFill.style.width = `${keys.right * 50}%`;
  } else {
    // Neutral: both pressed or neither pressed
    steeringFill.style.width = "0%";
  }
}
