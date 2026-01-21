import * as THREE from "three";
import { GAME_CONFIG } from "./config.js";

// Create the oval track
export function createTrack() {
  const trackGroup = new THREE.Group();

  // Straight sections
  const straightGeometry = new THREE.PlaneGeometry(
    GAME_CONFIG.trackLength,
    GAME_CONFIG.trackWidth,
  );
  const trackMaterial = new THREE.MeshStandardMaterial({
    color: GAME_CONFIG.trackColor,
  });

  const straight1 = new THREE.Mesh(straightGeometry, trackMaterial);
  straight1.rotation.x = -Math.PI / 2;
  straight1.position.set(
    0,
    0.01,
    GAME_CONFIG.trackCurveRadius + GAME_CONFIG.trackWidth / 2,
  );
  trackGroup.add(straight1);

  const straight2 = new THREE.Mesh(straightGeometry, trackMaterial);
  straight2.rotation.x = -Math.PI / 2;
  straight2.position.set(
    0,
    0.01,
    -GAME_CONFIG.trackCurveRadius - GAME_CONFIG.trackWidth / 2,
  );
  trackGroup.add(straight2);

  // Curved sections (semi-circles)
  const curveGeometry = new THREE.RingGeometry(
    GAME_CONFIG.trackCurveRadius,
    GAME_CONFIG.trackCurveRadius + GAME_CONFIG.trackWidth,
    GAME_CONFIG.curveSegments,
    1,
    0,
    Math.PI,
  );
  const curveMaterial = new THREE.MeshStandardMaterial({
    color: GAME_CONFIG.trackColor,
    side: THREE.DoubleSide,
  });

  const curve1 = new THREE.Mesh(curveGeometry, curveMaterial);
  curve1.rotation.x = -Math.PI / 2;
  curve1.rotation.z = -Math.PI / 2;
  curve1.position.set(GAME_CONFIG.trackLength / 2, 0.01, 0);
  trackGroup.add(curve1);

  const curve2 = new THREE.Mesh(curveGeometry, curveMaterial);
  curve2.rotation.x = -Math.PI / 2;
  curve2.rotation.z = Math.PI / 2;
  curve2.position.set(-GAME_CONFIG.trackLength / 2, 0.01, 0);
  trackGroup.add(curve2);

  // Start/finish line
  const lineGeometry = new THREE.PlaneGeometry(GAME_CONFIG.trackWidth, 2);
  const lineMaterial = new THREE.MeshStandardMaterial({
    color: GAME_CONFIG.finishLineColor,
  });
  const finishLine = new THREE.Mesh(lineGeometry, lineMaterial);
  finishLine.rotation.x = -Math.PI / 2;
  finishLine.position.set(
    0,
    0.02,
    GAME_CONFIG.trackCurveRadius +
      GAME_CONFIG.trackWidth / 2 -
      GAME_CONFIG.trackWidth / 2,
  );
  trackGroup.add(finishLine);

  // Checkered pattern for finish line
  const checkSize = GAME_CONFIG.trackWidth / 10;
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      const checkGeometry = new THREE.PlaneGeometry(checkSize, 1);
      const checkMaterial = new THREE.MeshStandardMaterial({
        color: GAME_CONFIG.checkColor,
      });
      const check = new THREE.Mesh(checkGeometry, checkMaterial);
      check.rotation.x = -Math.PI / 2;
      check.position.set(
        -GAME_CONFIG.trackWidth / 2 +
          checkSize / 2 +
          i * checkSize,
        0.03,
        GAME_CONFIG.trackCurveRadius,
      );
      trackGroup.add(check);
    }
  }

  return trackGroup;
}
