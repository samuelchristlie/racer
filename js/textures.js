import * as THREE from "three";

/**
 * Procedural texture generation using Perlin noise
 * Creates textures to enhance sense of speed and visual detail
 */

// Simple Perlin noise implementation
class PerlinNoise {
  constructor(seed = Math.random()) {
    this.p = new Uint8Array(512);
    this.permutation = new Uint8Array(256);

    // Initialize permutation array with seed
    for (let i = 0; i < 256; i++) {
      this.permutation[i] = i;
    }

    // Shuffle using seed
    let random = this.seededRandom(seed);
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [this.permutation[i], this.permutation[j]] = [this.permutation[j], this.permutation[i]];
    }

    // Duplicate permutation array
    for (let i = 0; i < 512; i++) {
      this.p[i] = this.permutation[i & 255];
    }
  }

  seededRandom(seed) {
    return function() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  }

  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  lerp(a, b, t) {
    return a + t * (b - a);
  }

  grad(hash, x, y) {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
  }

  noise2D(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);

    const u = this.fade(x);
    const v = this.fade(y);

    const A = this.p[X] + Y;
    const B = this.p[X + 1] + Y;

    return this.lerp(
      this.lerp(this.grad(this.p[A], x, y), this.grad(this.p[B], x - 1, y), u),
      this.lerp(this.grad(this.p[A + 1], x, y - 1), this.grad(this.p[B + 1], x - 1, y - 1), u),
      v
    );
  }

  // Fractal Brownian Motion for more detail
  fbm(x, y, octaves = 4, persistence = 0.5) {
    let total = 0;
    let frequency = 1;
    let amplitude = 1;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      total += this.noise2D(x * frequency, y * frequency) * amplitude;
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= 2;
    }

    return total / maxValue;
  }
}

/**
 * Create a procedural asphalt/road texture with subtle noise
 * @param {number} baseColor - Hex color for the base road (0x333333)
 * @param {number} width - Texture width in pixels
 * @param {number} height - Texture height in pixels
 * @returns {THREE.CanvasTexture}
 */
export function createRoadTexture(baseColor = 0x333333, width = 512, height = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const perlin = new PerlinNoise(42); // Fixed seed for consistency

  // Convert hex to RGB
  const r = (baseColor >> 16) & 255;
  const g = (baseColor >> 8) & 255;
  const b = baseColor & 255;

  // Create noise pattern
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;

      // High frequency noise for fine grain only
      let noise = perlin.noise2D(x * 0.3, y * 0.3);

      // Add some random grain
      noise += (Math.random() - 0.5) * 0.3;

      // Normalize to -1 to 1, then to 0 to 1
      noise = (noise + 1) * 0.5;

      // Apply very subtle variation to base color
      const variation = (noise - 0.5) * 12; // +/- 6 brightness (very subtle)

      data[i] = Math.max(0, Math.min(255, r + variation));     // R
      data[i + 1] = Math.max(0, Math.min(255, g + variation)); // G
      data[i + 2] = Math.max(0, Math.min(255, b + variation)); // B
      data[i + 3] = 255; // Alpha
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8); // Repeat more for better sense of speed

  return texture;
}

/**
 * Create a procedural grass texture with noise
 * @param {number} baseColor - Hex color for the base grass (0x3d9140)
 * @param {number} width - Texture width in pixels
 * @param {number} height - Texture height in pixels
 * @returns {THREE.CanvasTexture}
 */
export function createGrassTexture(baseColor = 0x3d9140, width = 512, height = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const perlin = new PerlinNoise(123); // Different seed for grass

  // Convert hex to RGB
  const baseR = (baseColor >> 16) & 255;
  const baseG = (baseColor >> 8) & 255;
  const baseB = baseColor & 255;

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;

      // High frequency noise for subtle grass texture
      const nx = x / width * 32;
      const ny = y / height * 32;

      // Fine grain only (no large patches)
      let noise = perlin.noise2D(nx, ny);

      // Add fine grain
      noise += perlin.noise2D(x * 0.15, y * 0.15) * 0.3;

      // Add tiny random grain
      noise += (Math.random() - 0.5) * 0.2;

      // Normalize to -1 to 1, then to 0 to 1
      noise = (noise + 1) * 0.5;

      // Apply very subtle variation to base color
      const variation = (noise - 0.5) * 16; // +/- 8 brightness (subtle)

      data[i] = Math.max(0, Math.min(255, baseR + variation));     // R
      data[i + 1] = Math.max(0, Math.min(255, baseG + variation)); // G
      data[i + 2] = Math.max(0, Math.min(255, baseB + variation)); // B
      data[i + 3] = 255; // Alpha
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // Repeat more for grass to create sense of speed
  texture.repeat.set(20, 20);

  return texture;
}
