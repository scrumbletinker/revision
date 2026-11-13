/* Shared bits for the Spanish aids: spoken Spanish and the accent keys. */
(function () {
  'use strict';
  const synth = window.speechSynthesis;
  let voice = null;

  function findVoice() {
    if (!synth) return null;
    const vs = synth.getVoices() || [];
    voice = vs.find((v) => /^es[-_]ES/i.test(v.lang)) || vs.find((v) => /^es/i.test(v.lang)) || null;
    return voice;
  }
  if (synth) { findVoice(); synth.addEventListener && synth.addEventListener('voiceschanged', findVoice); }

  const ES = {
    /** True once a Spanish voice is available on this device. */
    canSpeak() { return !!(synth && (voice || findVoice())); },
    /** Is "read words aloud" switched on? (saved per device) */
    speakOn() { return GCSE.state.esSpeak !== false; },
    setSpeak(on) { GCSE.state.esSpeak = !!on; GCSE.save(); },
    say(text, force) {
      if (!synth || (!force && !ES.speakOn())) return;
      const v = voice || findVoice();
      if (!v) return;
      try {
        synth.cancel();
        const u = new SpeechSynthesisUtterance(String(text).replace(/[¿?¡!]/g, ''));
        u.voice = v; u.lang = v.lang; u.rate = 0.9;
        synth.speak(u);
      } catch (e) { /* ignore */ }
    },
    /** Row of á é í ó ú ñ buttons that type into the given input. */
    accentKeys(input) {
      const row = GCSE.el('div', { class: 'accents' });
      ['á', 'é', 'í', 'ó', 'ú', 'ñ'].forEach((ch) => {
        const b = GCSE.el('button', { type: 'button', class: 'acc' }, ch);
        // mousedown/preventDefault keeps focus (and the phone keyboard) on the input
        b.addEventListener('pointerdown', (e) => e.preventDefault());
        b.addEventListener('click', () => {
          if (input.disabled) return;
          const st = input.selectionStart ?? input.value.length, en = input.selectionEnd ?? input.value.length;
          input.value = input.value.slice(0, st) + ch + input.value.slice(en);
          input.focus();
          input.setSelectionRange(st + 1, st + 1);
        });
        row.appendChild(b);
      });
      return row;
    },
    /** Speaker toggle button for the start screen. */
    speakToggle(host) {
      function render() {
        if (!ES.canSpeak()) { host.innerHTML = '<span class="small muted">🔈 No Spanish voice found on this device, so words won\'t be read aloud.</span>'; return; }
        host.innerHTML = `<button class="pill ${ES.speakOn() ? 'on' : ''}" type="button">🗣️ Read Spanish aloud: ${ES.speakOn() ? 'on' : 'off'}</button>`;
        host.querySelector('button').onclick = () => { ES.setSpeak(!ES.speakOn()); render(); if (ES.speakOn()) ES.say('¡Hola! Vamos.'); };
      }
      render();
      if (synth && synth.addEventListener) synth.addEventListener('voiceschanged', render);
    }
  };
  window.ES = ES;
})();
