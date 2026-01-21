// Setup keyboard input handlers
export function setupInput(keys) {
  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
        keys.forward = 1;
        break;
      case "KeyS":
      case "ArrowDown":
        keys.backward = 1;
        break;
      case "KeyA":
      case "ArrowLeft":
        keys.left = 1;
        break;
      case "KeyD":
      case "ArrowRight":
        keys.right = 1;
        break;
      case "Space":
        keys.brake = 1;
        break;
    }
  });

  document.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
        keys.forward = 0;
        break;
      case "KeyS":
      case "ArrowDown":
        keys.backward = 0;
        break;
      case "KeyA":
      case "ArrowLeft":
        keys.left = 0;
        break;
      case "KeyD":
      case "ArrowRight":
        keys.right = 0;
        break;
      case "Space":
        keys.brake = 0;
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
