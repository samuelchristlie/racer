import { GAME_CONFIG } from "./config.js";

// Get UI element references
export function createUI() {
  return {
    speedElement: document.getElementById("speed"),
    lapElement: document.getElementById("lap"),
    throttleFill: document.getElementById("throttleFill"),
    brakeFill: document.getElementById("brakeFill"),
    steeringFill: document.getElementById("steeringFill"),
  };
}

// Update UI elements (speed and lap counter)
export function updateUI(gameState, car, ui) {
  const { speedElement, lapElement } = ui;

  // Update speed display
  const displaySpeed = Math.abs(Math.round(gameState.velocity.length() * 100));
  speedElement.textContent = `${displaySpeed} km/h`;

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

  // Throttle: forward key (W or Arrow Up)
  // For keyboard, throttle is either 0% or 100%
  const throttleLevel = keys.forward ? 100 : 0;
  throttleFill.style.width = `${throttleLevel}%`;

  // Brake: brake key (Space) or backward key (S or Arrow Down)
  // For keyboard, brake is either 0% or 100%
  const brakeLevel = (keys.brake || keys.backward) ? 100 : 0;
  brakeFill.style.width = `${brakeLevel}%`;
}

// Update steering gauge display (left and right)
export function updateSteeringGauge(keys, ui) {
  const { steeringFill } = ui;

  // Steering fills from center line outward to the edges
  // Only one direction should be active at a time (both pressed = neutral)
  if (keys.left && !keys.right) {
    // Steering left: fill from center to left edge
    steeringFill.style.left = "auto";
    steeringFill.style.right = "50%";
    steeringFill.style.width = "50%";
  } else if (keys.right && !keys.left) {
    // Steering right: fill from center to right edge
    steeringFill.style.left = "50%";
    steeringFill.style.right = "auto";
    steeringFill.style.width = "50%";
  } else {
    // Neutral: both pressed or neither pressed
    steeringFill.style.width = "0%";
  }
}
