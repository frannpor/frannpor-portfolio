/**
 * Builds the displacement and specular maps for one exact glass size, so a wide bar refracts along a
 * real rounded-rectangle bezel instead of stretching a map drawn for a square.
 */
export type GlassMaps = { displacement: string; specular: string };

const cache = new Map<string, GlassMaps>();

export function buildGlassMaps(width: number, height: number, radius: number): GlassMaps | null {
  if (width < 2 || height < 2) return null;
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  const key = `${width}x${height}r${radius}@${scale}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const w = Math.round(width * scale);
  const h = Math.round(height * scale);
  const r = Math.min(radius, height / 2, width / 2) * scale;
  const bezel = Math.max(6, Math.min(height * 0.42, 22)) * scale;
  const shift = document.createElement("canvas");
  const shine = document.createElement("canvas");
  shift.width = shine.width = w;
  shift.height = shine.height = h;
  const shiftContext = shift.getContext("2d");
  const shineContext = shine.getContext("2d");
  if (!shiftContext || !shineContext) return null;
  const shiftPixels = shiftContext.createImageData(w, h);
  const shinePixels = shineContext.createImageData(w, h);
  const cx = w / 2;
  const cy = h / 2;
  const hx = w / 2 - r;
  const hy = h / 2 - r;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x + .5 - cx;
      const py = y + .5 - cy;
      const qx = Math.abs(px) - hx;
      const qy = Math.abs(py) - hy;
      const ox = Math.max(qx, 0);
      const oy = Math.max(qy, 0);
      const outside = Math.hypot(ox, oy);
      // Signed distance to the rounded rectangle; negative inside.
      const distance = outside + Math.min(Math.max(qx, qy), 0) - r;
      let nx = 0;
      let ny = 0;
      if (outside > 0) { nx = ox / outside * Math.sign(px); ny = oy / outside * Math.sign(py); }
      else if (qx > qy) nx = Math.sign(px);
      else ny = Math.sign(py);

      const depth = Math.max(0, Math.min(1, 1 + distance / bezel));
      // Convex lens: the bezel samples from further inside, strongest at the rim.
      const bend = depth * depth;
      const index = (y * w + x) * 4;
      shiftPixels.data[index] = 128 - nx * bend * 127;
      shiftPixels.data[index + 1] = 128 - ny * bend * 127;
      shiftPixels.data[index + 2] = 128;
      shiftPixels.data[index + 3] = 255;

      // Light from the top left catches the upper rim and, more softly, the lower one.
      const facing = Math.max(0, -nx * .55 - ny * .83);
      const back = Math.max(0, nx * .55 + ny * .83) * .35;
      const light = Math.pow(depth, 3) * (facing + back) * 200;
      // Dispersion: the outermost rim splits white light into a faint spectrum that turns with the edge.
      const rim = Math.pow(Math.max(0, (depth - .78) / .22), 2) * 70;
      const hue = Math.atan2(ny, nx);
      shinePixels.data[index] = Math.min(255, light + rim * (.5 + .5 * Math.cos(hue)));
      shinePixels.data[index + 1] = Math.min(255, light + rim * (.5 + .5 * Math.cos(hue - 2.094)));
      shinePixels.data[index + 2] = Math.min(255, light + rim * (.5 + .5 * Math.cos(hue + 2.094)));
      shinePixels.data[index + 3] = 255;
    }
  }
  shiftContext.putImageData(shiftPixels, 0, 0);
  shineContext.putImageData(shinePixels, 0, 0);
  const maps = { displacement: shift.toDataURL(), specular: shine.toDataURL() };
  cache.set(key, maps);
  return maps;
}
