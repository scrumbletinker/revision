/* Small SVG figure helpers for exam questions. Colours come from CSS variables so they work in dark mode. */
window.FIG = (function () {
  const W = 340, H = 240, L = 52, R = 14, T = 14, B = 44;
  const n = (v) => Math.round(v * 10) / 10;

  /** Line graph. o = { x: {label, max, step, min?}, y: {label, max, step, min?}, lines: [{pts: [[x,y]...], label?, dash?}], dots?: [[x,y]], caption? } */
  function graph(o) {
    const x0 = o.x.min || 0, y0 = o.y.min || 0;
    const sx = (v) => L + (v - x0) / (o.x.max - x0) * (W - L - R);
    const sy = (v) => H - B - (v - y0) / (o.y.max - y0) * (H - T - B);
    let g = '';
    for (let v = x0; v <= o.x.max + 1e-9; v += o.x.step) {
      g += `<line x1="${n(sx(v))}" y1="${T}" x2="${n(sx(v))}" y2="${H - B}" class="fg-grid"/>`;
      g += `<text x="${n(sx(v))}" y="${H - B + 15}" text-anchor="middle" class="fg-t">${+v.toFixed(3)}</text>`;
    }
    for (let v = y0; v <= o.y.max + 1e-9; v += o.y.step) {
      g += `<line x1="${L}" y1="${n(sy(v))}" x2="${W - R}" y2="${n(sy(v))}" class="fg-grid"/>`;
      g += `<text x="${L - 6}" y="${n(sy(v)) + 4}" text-anchor="end" class="fg-t">${+v.toFixed(3)}</text>`;
    }
    g += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" class="fg-axis"/><line x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" class="fg-axis"/>`;
    g += `<text x="${(L + W - R) / 2}" y="${H - 8}" text-anchor="middle" class="fg-l">${o.x.label}</text>`;
    g += `<text x="14" y="${(T + H - B) / 2}" text-anchor="middle" class="fg-l" transform="rotate(-90 14 ${(T + H - B) / 2})">${o.y.label}</text>`;
    (o.lines || []).forEach((ln) => {
      g += `<polyline fill="none" class="fg-line${ln.dash ? ' fg-dash' : ''}" points="${ln.pts.map(([a, b]) => `${n(sx(a))},${n(sy(b))}`).join(' ')}"/>`;
      if (ln.label) { const [a, b] = ln.pts[ln.pts.length - 1]; g += `<text x="${n(sx(a)) - 4}" y="${n(sy(b)) - 6}" text-anchor="end" class="fg-l">${ln.label}</text>`; }
    });
    (o.dots || []).forEach(([a, b]) => { g += `<g class="fg-x"><line x1="${n(sx(a) - 4)}" y1="${n(sy(b) - 4)}" x2="${n(sx(a) + 4)}" y2="${n(sy(b) + 4)}"/><line x1="${n(sx(a) - 4)}" y1="${n(sy(b) + 4)}" x2="${n(sx(a) + 4)}" y2="${n(sy(b) - 4)}"/></g>`; });
    return wrap(`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.caption || 'Graph'}">${g}</svg>`, o.caption);
  }

  /** A table. rows[0] is the header row. */
  function table(rows, caption) {
    return wrap(`<table class="fg-table"><thead><tr>${rows[0].map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`, caption);
  }

  function wrap(inner, caption) {
    return `<figure class="fg">${inner}${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
  }

  /** Raw SVG drawn by hand (viewBox given), wrapped as a figure. */
  function svg(viewBox, body, caption) {
    return wrap(`<svg viewBox="${viewBox}" role="img" aria-label="${caption || 'Diagram'}">${body}</svg>`, caption);
  }

  // ---- circuit symbols (draw on a horizontal or vertical wire at x,y) ----
  const sym = {
    cell: (x, y) => `<line x1="${x - 4}" y1="${y - 14}" x2="${x - 4}" y2="${y + 14}" class="fg-axis"/><line x1="${x + 4}" y1="${y - 8}" x2="${x + 4}" y2="${y + 8}" class="fg-thick"/><rect x="${x - 3}" y="${y - 2}" width="6" height="4" class="fg-bg"/>`,
    resistor: (x, y) => `<rect x="${x - 18}" y="${y - 7}" width="36" height="14" class="fg-comp"/>`,
    lamp: (x, y) => `<circle cx="${x}" cy="${y}" r="11" class="fg-comp"/><line x1="${x - 8}" y1="${y - 8}" x2="${x + 8}" y2="${y + 8}" class="fg-axis"/><line x1="${x - 8}" y1="${y + 8}" x2="${x + 8}" y2="${y - 8}" class="fg-axis"/>`,
    meter: (x, y, l) => `<circle cx="${x}" cy="${y}" r="11" class="fg-comp"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" class="fg-sym">${l}</text>`,
    ldr: (x, y) => `<circle cx="${x}" cy="${y}" r="16" class="fg-comp"/><rect x="${x - 11}" y="${y - 5}" width="22" height="10" class="fg-comp"/><path d="M${x - 22} ${y - 26} l9 9 M${x - 15} ${y - 28} l9 9" class="fg-axis"/><path d="M${x - 13} ${y - 17} l0 -5 l-5 0 M${x - 6} ${y - 19} l0 -5 l-5 0" class="fg-axis"/>`,
    thermistor: (x, y) => `<rect x="${x - 16}" y="${y - 7}" width="32" height="14" class="fg-comp"/><path d="M${x - 20} ${y + 12} l8 0 l24 -24" class="fg-axis"/>`,
    switch: (x, y) => `<circle cx="${x - 12}" cy="${y}" r="2.5" class="fg-dot"/><circle cx="${x + 12}" cy="${y}" r="2.5" class="fg-dot"/><line x1="${x - 12}" y1="${y}" x2="${x + 10}" y2="${y - 10}" class="fg-axis"/>`
  };
  // a white-out rectangle under a symbol so wires don't run through it
  const gap = (x, y, w, h) => `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" class="fg-bg"/>`;

  return { graph, table, svg, sym, gap };
})();
