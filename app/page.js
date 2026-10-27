'use client';

import { useState } from 'react';
import { imageUrl, imageSrcSet } from '../lib/cloudinary.mjs';

const samples = [
  { id: 'sample', name: 'A touch of color', category: 'Nature', alt: 'Pink flowers and green foliage in a Cloudinary sample image' },
  { id: 'cld-sample-2', name: 'Room to breathe', category: 'Landscape', alt: 'Mountain landscape in a Cloudinary sample image' },
  { id: 'cld-sample-3', name: 'In motion', category: 'Sports', alt: 'Basketball players in a Cloudinary sample image' },
  { id: 'cld-sample-4', name: 'A moment to savor', category: 'Food', alt: 'Food in a Cloudinary sample image' },
];

function Photo({ src, srcSet, sizes, alt, className = '', eager = false }) {
  const [failed, setFailed] = useState(false);
  return failed ? <div className={`photo-error ${className}`} role="status">Unable to load the image. Check your connection and Public ID.</div> :
    <img className={className} src={src} srcSet={srcSet} sizes={sizes} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={() => setFailed(true)} />;
}

export default function Home() {
  const [selected, setSelected] = useState(samples[0]);
  const [shape, setShape] = useState('landscape');
  const [width, setWidth] = useState(640);
  const [tab, setTab] = useState('optimized');
  const [cloud, setCloud] = useState(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo');
  const [cloudDraft, setCloudDraft] = useState(cloud);
  const [idDraft, setIdDraft] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const options = { cloud, publicId: selected.id, width, shape };
  const original = imageUrl({ ...options, optimized: false });
  const optimized = imageUrl(options);
  const current = tab === 'optimized' ? optimized : original;

  function useOwnImage(event) {
    event.preventDefault();
    try {
      imageUrl({ cloud: cloudDraft.trim(), publicId: idDraft.trim() });
      setCloud(cloudDraft.trim());
      setSelected({ id: idDraft.trim(), name: 'Your image in the lab', category: 'My image', alt: 'User-selected image for comparing transformations' });
      setError('');
    } catch (e) { setError(e.message); }
  }

  return <>
    <header className="header"><a href="#" className="brand"><span className="brand-icon">m<span>↗</span></span>media lab<span className="brand-dot">.</span></a><nav aria-label="Main navigation"><a href="#laboratorio">Lab</a><a href="#galeria">Gallery</a><a href="#sobre">About the project <span>↗</span></a></nav><span className="stack">NEXT.JS + CLOUDINARY</span></header>
    <main>
      <section className="hero"><div className="eyebrow"><span className="live-dot"/> AN EXPERIMENT WITH THE VISUAL WEB</div><h1>Fewer bytes.<br/><span>More image.</span></h1><div className="hero-bottom"><p>The same file. New possibilities.<br/>Explore how cropping, quality, and format transform image delivery.</p><a className="pill-link" href="#laboratorio">Try the lab <span>↘</span></a></div><div className="hero-number" aria-hidden="true">01 / LAB</div></section>

      <section id="laboratorio" className="lab-section"><div className="section-top"><div><span className="eyebrow">SEE THE DIFFERENCE</span><h2>One image. Many choices.</h2></div><span className="small-note">Interactive · No upload</span></div>
        <div className="lab-grid"><div className="preview-panel"><div className="preview-toolbar"><div className="segmented" aria-label="Image version"><button aria-pressed={tab === 'optimized'} onClick={() => setTab('optimized')}>Optimized <span>✦</span></button><button aria-pressed={tab === 'original'} onClick={() => setTab('original')}>Original</button></div><a href={current} target="_blank" rel="noreferrer" className="open-image">Open image ↗</a></div>
          <div className={`preview-stage ${shape}`}><Photo key={current} src={current} alt={selected.alt} eager className="main-photo"/><span className="image-badge">{tab === 'optimized' ? `${width} × ${Math.round(width * (shape === 'square' ? 1 : shape === 'portrait' ? 1.25 : 0.667))} px` : 'Original file'}</span></div>
          <div className="preview-caption"><span>{selected.name}</span><span>{tab === 'optimized' ? 'Automatic crop, quality, and format' : 'No URL transformations'}</span></div></div>
        <aside className="controls"><span className="control-number">FINE-TUNE DELIVERY</span><h3>What does your screen need?</h3><p>Adjust the settings and watch the image and its URL change.</p><fieldset><legend>01 — Crop shape</legend><div className="shape-options">{[['landscape', '▭', 'Landscape'], ['square', '□', 'Square'], ['portrait', '▯', 'Portrait']].map(([value, icon, label]) => <button key={value} aria-pressed={shape === value} onClick={() => { setShape(value); setTab('optimized'); }}><span>{icon}</span>{label}</button>)}</div></fieldset><label className="width-label" htmlFor="width">02 — Delivery width <strong>{width} px</strong></label><select id="width" value={width} onChange={e => { setWidth(Number(e.target.value)); setTab('optimized'); }}>{[320,480,640,960,1280].map(w => <option key={w} value={w}>{w} pixels</option>)}</select><div className="auto-feature"><span>✦</span><div><strong>Smarter delivery</strong><p><code>q_auto</code> adjusts quality.<br/><code>f_auto</code> negotiates the format with your browser.</p></div></div><div className="honest-note">Compare the images visually. Byte savings depend on the image, dimensions, and browser. This lab does not estimate performance gains.</div></aside></div>
        <div className="url-box"><div><span className="eyebrow">THE TRANSFORMATION IS IN THE URL</span><button onClick={async () => { try { await navigator.clipboard.writeText(current); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { setError('Unable to copy automatically. Select the URL below.'); } }}>{copied ? 'Copied ✓' : 'Copy URL ↗'}</button></div><code>{current}</code></div>
      </section>

      <section id="galeria" className="gallery-section"><div className="section-top"><div><span className="eyebrow">CHANGE YOUR PERSPECTIVE</span><h2>Choose your next image.</h2></div><p className="small-note">Public sample images<br/>from Cloudinary · demo cloud</p></div><div className="gallery">{samples.map((item, i) => <button className={`card ${selected.id === item.id && cloud === 'demo' ? 'selected' : ''}`} key={item.id} onClick={() => { setCloud('demo'); setSelected(item); setError(''); }} aria-pressed={selected.id === item.id && cloud === 'demo'}><div className="card-image"><Photo key={item.id} src={imageUrl({ publicId: item.id, width: 480 })} srcSet={imageSrcSet({ publicId: item.id })} sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 23vw" alt={item.alt}/><span className="card-arrow">↗</span></div><div className="card-meta"><span>{item.category}</span><span>0{i + 1}</span></div><h3>{item.name}</h3></button>)}</div></section>

      <section className="own-image"><div><span className="eyebrow">FROM THE DEMO TO YOUR PROJECT</span><h2>Try an image of your own.</h2><p>Already have a public image on Cloudinary? Enter your cloud name and Public ID. No secret key needed.</p></div><form onSubmit={useOwnImage}><label>Cloud name<input required value={cloudDraft} onChange={e => setCloudDraft(e.target.value)} placeholder="my-cloud" autoCapitalize="none" spellCheck="false"/></label><label>Public ID<input required value={idDraft} onChange={e => setIdDraft(e.target.value)} placeholder="folder/my-image" spellCheck="false"/></label><button className="dark-button" type="submit">Use my image ↗</button><p role="status" className="form-message">{error || 'Use a public asset with transformations allowed. No files are uploaded.'}</p></form></section>

      <section id="sobre" className="about"><span className="eyebrow">LEARN → APPLY → SHARE</span><h2>A small project.<br/>Decisions that matter.</h2><div className="about-grid"><article><span>01</span><h3>Crop with intention</h3><p>Adapt the same asset to cards and portraits with <code>c_fill</code> and <code>g_auto</code>. Check that the main subject stays visible.</p></article><article><span>02</span><h3>Deliver what is needed</h3><p>The gallery uses <code>srcSet</code> and <code>sizes</code> to offer different widths. The browser selects a variant for the screen.</p></article><article><span>03</span><h3>Verify before you share</h3><p>Inspect requests in the browser Network tab. Record file size, format, viewport, and conditions before sharing results.</p></article></div></section>
    </main><footer><a className="brand" href="#">media lab.</a><p>Learning project · Next.js + Cloudinary</p><a href="https://cloudinary.com/documentation/image_transformations" target="_blank" rel="noreferrer">Explore the docs ↗</a></footer>
  </>;
}
