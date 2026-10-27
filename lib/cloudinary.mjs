export const widths = [320, 480, 640, 960, 1280];

export function imageUrl({ cloud = 'demo', publicId = 'sample', width = 640, shape = 'landscape', optimized = true }) {
  if (!/^[a-zA-Z0-9_-]+$/.test(cloud)) throw new Error('Invalid cloud name.');
  if (!publicId.trim() || /[?#\\]/.test(publicId)) throw new Error('Invalid Public ID. Enter an asset identifier, not a URL.');
  const asset = publicId.split('/').map(encodeURIComponent).join('/');
  const base = `https://res.cloudinary.com/${cloud}/image/upload`;
  if (!optimized) return `${base}/${asset}`;
  const w = widths.includes(Number(width)) ? Number(width) : 640;
  const h = Math.round(w * (shape === 'square' ? 1 : shape === 'portrait' ? 1.25 : 0.667));
  return `${base}/c_fill,g_auto,w_${w},h_${h}/q_auto/f_auto/${asset}`;
}

export function imageSrcSet(options) {
  return widths.map(width => `${imageUrl({ ...options, width })} ${width}w`).join(', ');
}
