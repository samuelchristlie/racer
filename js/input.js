// Setup keyboard input handlers
export function setupInput(keys, gameState) {
  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "KeyW":
        keys.forward = 1;
        break;
      case "KeyS":
        keys.backward = 1;
        break;
      case "KeyA":
        keys.left = 1;
        break;
      case "KeyD":
        keys.right = 1;
        break;
      case "Space":
        keys.brake = 1;
        break;
      case "ArrowUp":
        gameState.cameraRotation = 0;
        gameState.cameraInputActive = true;
        break;
      case "ArrowDown":
        gameState.cameraRotation = Math.PI;
        gameState.cameraInputActive = true;
        break;
      case "ArrowLeft":
        gameState.cameraRotation = Math.PI / 2;
        gameState.cameraInputActive = true;
        break;
      case "ArrowRight":
        gameState.cameraRotation = -Math.PI / 2;
        gameState.cameraInputActive = true;
        break;
    }
  });

  document.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "KeyW":
        keys.forward = 0;
        break;
      case "KeyS":
        keys.backward = 0;
        break;
      case "KeyA":
        keys.left = 0;
        break;
      case "KeyD":
        keys.right = 0;
        break;
      case "Space":
        keys.brake = 0;
        break;
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
        gameState.cameraInputActive = false;
        break;
    }
  });
}

// Setup debug toggle key handler
export function setupDebugToggle(callback) {
  document.addEventListener("keydown", (e) => {
    if (e.code === "KeyH") {
      callback();
    }
  });
}
