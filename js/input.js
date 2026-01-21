// Setup keyboard input handlers
export function setupInput(keys) {
  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
        keys.forward = true;
        break;
      case "KeyS":
      case "ArrowDown":
        keys.backward = true;
        break;
      case "KeyA":
      case "ArrowLeft":
        keys.left = true;
        break;
      case "KeyD":
      case "ArrowRight":
        keys.right = true;
        break;
      case "Space":
        keys.brake = true;
        break;
    }
  });

  document.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
        keys.forward = false;
        break;
      case "KeyS":
      case "ArrowDown":
        keys.backward = false;
        break;
      case "KeyA":
      case "ArrowLeft":
        keys.left = false;
        break;
      case "KeyD":
      case "ArrowRight":
        keys.right = false;
        break;
      case "Space":
        keys.brake = false;
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
