import { GAME_CONFIG } from "./config.js";

// Poll controller input and update keys object
export function pollController(keys) {
  const gamepads = navigator.getGamepads();

  // Find first connected gamepad
  const gamepad = gamepads[0];
  if (!gamepad) {
    return; // No controller connected
  }

  const { controllerDeadzone, controllerButtonRT, controllerButtonRB, controllerAxisLeftStickX } =
    GAME_CONFIG;

  // RT (button 7) for throttle - analog trigger returns 0-1 value
  const rtValue = gamepad.buttons[controllerButtonRT]?.value ?? 0;
  if (rtValue > controllerDeadzone) {
    keys.forward = rtValue;
  } else if (rtValue < controllerDeadzone) {
    keys.forward = 0;
  }

  // RB (button 6) for brake - analog bumper returns 0-1 value
  const rbValue = gamepad.buttons[controllerButtonRB]?.value ?? 0;
  if (rbValue > controllerDeadzone) {
    keys.brake = rbValue;
  } else if (rbValue < controllerDeadzone) {
    keys.brake = 0;
  }

  // Left joystick axis 0 for steering (-1 to +1)
  const axisValue = gamepad.axes[controllerAxisLeftStickX] ?? 0;

  if (axisValue < -controllerDeadzone) {
    // Steering left
    keys.left = Math.abs(axisValue);
    keys.right = 0;
  } else if (axisValue > controllerDeadzone) {
    // Steering right
    keys.right = axisValue;
    keys.left = 0;
  } else {
    // In deadzone - clear both steering directions
    keys.left = 0;
    keys.right = 0;
  }
}
