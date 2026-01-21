import { GAME_CONFIG } from "./config.js";

// Get UI element references
export function createUI() {
  return {
    speedElement: document.getElementById("speed"),
    lapElement: document.getElementById("lap"),
    throttleFill: document.getElementById("throttleFill"),
    brakeFill: document.getElementById("brakeFill"),
  };
}

// Update UI elements (speed and lap counter)
export function updateUI(gameState, car, ui) {
  const { speedElement, lapElement } = ui;

  // Update speed display
  const displaySpeed = Math.abs(Math.round(gameState.speed * 100));
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
