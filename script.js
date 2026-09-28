/* ============================================
   SREENANDHA'S BIRTHDAY - Interactive JavaScript
   ============================================ */

// ===================== ALWAYS START FROM THE GIFT INTRO =====================
// Stop the browser restoring the old scroll spot or jumping to a #section on reload.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
if (location.hash) history.replaceState(null, '', location.pathname + location.search);
window.scrollTo(0, 0);
window.addEventListener('load', () => window.scrollTo(0, 0));
// Coming back via the back/forward button restores a cached page — reload it fresh instead.
window.addEventListener('pageshow', e => {
  if (e.persisted) location.reload();
});

// ===================== PIXEL SPRITES =====================
// Each sprite is a grid of palette keys; '.' is transparent.
const PALETTE = {
  k: '#4a2c1a', // outline
  b: '#c98a5a', // box
  d: '#a0643d', // box shade
  r: '#e0574a', // red
  R: '#9e2f25', // red dark
  w: '#ffffff',
  p: '#f3e3c3', // paper
  q: '#dcc39a', // paper shade
  s: '#d9d4c7', // silver
  g: '#8fb3c9', // glass
  l: '#f6ecd2', // label
  t: '#e8b98a', // tan ribbon
  T: '#c48b5a', // tan ribbon dark
  y: '#f2c14e', // yellow
  Y: '#fff1b8', // yellow light
  n: '#7a4a2c', // leather
  c: '#d2483c'  // cassette red
};

const SPRITES = {
  gift: [
    '...RRR....RRR...',
    '..RrrrR..RrrrR..',
    '..RrrrrRRrrrrR..',
    '...RRrrrrrrRR...',
    '.kkkkkkrrkkkkkk.',
    '.kbbbbbrrbbbbbk.',
    '.kbbbbbrrbbbbbk.',
    '.kkkkkkrrkkkkkk.',
    '..kbbbbrrbbbbk..',
    '..kbbbbrrbbbbk..',
    '..kbbbbrrbbbbk..',
    '..kbbbbrrbbbbk..',
    '..kddddrrddddk..',
    '..kddddRRddddk..',
    '..kkkkkkkkkkkk..'
  ],
  heart: [
    '.RR...RR.',
    'RrrR.RrrR',
    'RrwrRrrrR',
    'RrrrrrrrR',
    '.RrrrrrR.',
    '..RrrrR..',
    '...RrR...',
    '....R....'
  ],
  star: [
    '...y...',
    '...y...',
    '..yYy..',
    'yyYYYyy',
    '..yYy..',
    '...y...',
    '...y...'
  ],
  mushroom: [
    '....kkkk....',
    '..kkrrwrkk..',
    '.krrrrrrrrk.',
    'krwwrrrrwrrk',
    'krwwrrrrrrrk',
    'krrrrrwwrrrk',
    'kkkkkkkkkkkk',
    '...kppppk...',
    '...kppqpk...',
    '...kppqpk...',
    '..kkkkkkkk..'
  ],
  camera: [
    '....kkkk........',
    '...kssssk..kkk..',
    'kkkkkkkkkkkkkkkk',
    'kssssssssssssssk',
    'knnnkkkkkknnnnnk',
    'knnkwwggggknnnnk',
    'knnkwgkkggknnnnk',
    'knnkggkkggknnnnk',
    'knnkggggggknnnnk',
    'knnnkkkkkknnnnnk',
    'kssssssssssssssk',
    'kkkkkkkkkkkkkkkk'
  ],
  envelope: [
    'kkkkkkkkkkkkkkkk',
    'kkppppppppppppkk',
    'kpkppppppppppkpk',
    'kppkppppppppkppk',
    'kpppkppppppkpppk',
    'kppppkppppkppppk',
    'kpppppkrrkpppppk',
    'kppppppkkppppppk',
    'kqppppppppppppqk',
    'kqppppppppppppqk',
    'kqqqqqqqqqqqqqqk',
    'kkkkkkkkkkkkkkkk'
  ],
  cassette: [
    'kkkkkkkkkkkkkkkk',
    'kcccccccccccccck',
    'kcllllllllllllck',
    'kclkkkkkkkkkklck',
    'kclkwkkkkkkwklck',
    'kclkkkkkkkkkklck',
    'kcllllllllllllck',
    'kcccckkkkkkcccck',
    'kccckwwwwwwkccck',
    'kkkkkkkkkkkkkkkk'
  ],
  bow: [
    '.kkk........kkk.',
    'ktttkk....kktttk',
    'kttTTtkkkktTTttk',
    'kttTTTkTTkTTTttk',
    'kttTTtkTTktTTttk',
    'ktttkkkkkkkktttk',
    '.kkk.kTTTTk.kkk.',
    '.....kTkkTk.....',
    '....kTk..kTk....',
    '....kk....kk....'
  ]
};

function renderSprite(name) {
  const rows = SPRITES[name];
  if (!rows) return '';
  const w = Math.max(...rows.map(r => r.length));
  let rects = '';
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const fill = PALETTE[ch];
      if (fill) rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${fill}"/>`;
    });
  });
  return `<svg viewBox="0 0 ${w} ${rows.length}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${rects}</svg>`;
}

document.querySelectorAll('.sprite[data-sprite]').forEach(el => {
  el.innerHTML = renderSprite(el.dataset.sprite);
});

document.addEventListener('DOMContentLoaded', () => {

  const confettiColors = ['#d2483c', '#f2c14e', '#9cc47c', '#b8764a', '#fff1b8', '#ffffff'];

  // ===================== CONFETTI HELPER =====================
  function burstConfetti(originX, originY, count = 36) {
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      const size = Math.random() > 0.5 ? 8 : 12;
      confetti.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${confettiColors[Math.floor(Math.random() * confettiColors.length)]};
        box-shadow: 0 0 0 2px #4a2c1a;
        left: ${originX}px;
        top: ${originY}px;
        pointer-events: none;
        z-index: 10001;
      `;
      document.body.appendChild(confetti);

      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 220 + 120;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity - 220;
      const rotation = Math.round(Math.random() * 4) * 90;

      confetti.animate([
        { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${vx}px, ${vy + 520}px) rotate(${rotation}deg)`, opacity: 0 }
      ], {
        duration: Math.random() * 1500 + 1500,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fill: 'forwards'
      });

      setTimeout(() => confetti.remove(), 3200);
    }
  }

  function centerOf(el) {
    const rect = el.getBoundingClientRect();
    return [rect.left + rect.width / 2, rect.top + rect.height / 2];
  }

  // ===================== GIFT INTRO =====================
  const intro = document.getElementById('intro');
  const introGift = document.getElementById('introGift');
  let introOpened = false;

  function openGift() {
    if (introOpened) return;
    introOpened = true;
    introGift.classList.add('opening');
    setTimeout(() => {
      burstConfetti(...centerOf(introGift.querySelector('.intro-box')), 60);
    }, 450);
    setTimeout(() => {
      intro.classList.add('hidden');
      document.body.classList.remove('locked');
      startAgeGag();
    }, 900);
  }

  // ===================== TIME LOCK =====================
  // The gift stays locked until 11:59:55 PM. From 11:40 PM a countdown appears and
  // ticks down to the unlock. Uses the viewer's own device clock / time zone.
  const TIMER_FROM = new Date(2026, 8, 28, 23, 40, 0);  // 28 Sep 2026, 11:40 PM (month is 0-indexed)
  const UNLOCK_AT = new Date(2026, 8, 28, 23, 59, 55);  // 28 Sep 2026, 11:59:55 PM
  const introTitle = introGift.querySelector('.intro-title');
  const introTimer = document.getElementById('introTimer');
  const introCta = document.getElementById('introCta');
  const introTitleText = introTitle.textContent;
  let giftLocked = false;
  let lockTimer = null;

  function updateLock() {
    const now = new Date();
    const locked = now < UNLOCK_AT;
    const left = UNLOCK_AT - now;

    if (locked && now >= TIMER_FROM) {
      const m = Math.floor(left / 60000);
      const s = Math.floor((left % 60000) / 1000);
      introTimer.textContent = [m, s].map(n => String(n).padStart(2, '0')).join(':');
      introTimer.hidden = false;
    } else {
      introTimer.hidden = true;
    }
    if (!locked) clearInterval(lockTimer);

    giftLocked = locked;
    introGift.classList.toggle('locked', locked);
    introGift.setAttribute('aria-label', locked ? 'Gift locked until 11:59 PM' : 'Open your gift');
    introTitle.textContent = locked ? 'Something special is coming…' : introTitleText;
    introCta.textContent = locked ? 'Unlocks at 11:59 PM 🔒' : 'Click to open your gift';
  }

  updateLock();
  lockTimer = setInterval(updateLock, 1000);

  introGift.addEventListener('click', () => {
    if (giftLocked) {
      // Not yet! A little "nope" shake
      introGift.classList.remove('nope');
      void introGift.offsetWidth; // restart the animation
      introGift.classList.add('nope');
      return;
    }
    // Opening the gift is a real tap, so the browser allows the music box to start here
    startBackgroundMusic();
    openGift();
  });

  // ===================== SPARKLE PARTICLES =====================
  const sparkleContainer = document.getElementById('sparkleContainer');
  function createSparkle() {
    const sparkle = document.createElement('div');
    const size = Math.random() > 0.6 ? 6 : 4;
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    sparkle.style.animationDuration = Math.random() * 3 + 3 + 's';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    sparkleContainer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 8000);
  }
  setInterval(createSparkle, 500);

  // ===================== SPARKLE BURST HELPER =====================
  function createSparklesBurst(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
      const sparkle = document.createElement('div');
      const size = Math.random() > 0.5 ? 6 : 8;
      sparkle.classList.add('sparkle');
      sparkle.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 100) + 'px';
      sparkle.style.top = (rect.top + (Math.random() - 0.5) * 50) + 'px';
      sparkle.style.width = size + 'px';
      sparkle.style.height = size + 'px';
      sparkle.style.animationDuration = Math.random() * 1.5 + 1 + 's';
      sparkleContainer.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 3000);
    }
  }

  // ===================== AGE ANIMATION (81 → oops → 19) =====================
  // Starts once the gift is opened so it isn't hidden behind the intro.
  const ageNumber = document.getElementById('ageNumber');
  const ageOops = document.getElementById('ageOops');
  function startAgeGag() {
    if (!ageNumber || !ageOops) return;
    setTimeout(() => {
      ageNumber.classList.add('shake');
    }, 1800);

    setTimeout(() => {
      ageOops.textContent = 'oops 😅';
      ageOops.classList.add('visible');
    }, 2300);

    setTimeout(() => {
      ageOops.classList.remove('visible');
      ageOops.classList.add('hidden');
      ageNumber.classList.remove('shake');
      ageNumber.textContent = '19';
      ageNumber.classList.add('corrected');
      createSparklesBurst(ageNumber);
    }, 3500);
  }

  // ===================== REVEAL ON SCROLL =====================
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });
  revealElements.forEach(el => revealObserver.observe(el));

  // ===================== COUNT-UP TIMER =====================
  // Counts the time elapsed since September 18, 2025
  const bondStart = new Date(2025, 8, 18, 0, 0, 0); // Month is 0-indexed (8 = September)

  function updateCountdown() {
    const diff = Math.max(0, new Date() - bondStart);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ===================== ENVELOPE → LETTER =====================
  const letterStage = document.getElementById('letterStage');
  const envelope = document.getElementById('envelope');
  envelope.addEventListener('click', () => {
    if (letterStage.classList.contains('opening')) return;
    letterStage.classList.add('opening');
    burstConfetti(...centerOf(envelope), 30);
    setTimeout(() => letterStage.classList.add('opened'), 650);
  });

  // ===================== BACK TO TOP =====================
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.pageYOffset > 500);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===================== SYNTH MUSIC BOX (offline fallback) =====================
  // A soft music-box "Happy Birthday" made with Web Audio — used only if the
  // Internet Archive recording can't be loaded (e.g. no internet).
  const synthMelody = (() => {
    const BEAT = 0.62; // seconds per beat
    const LOOP_BEATS = 29;
    const hz = n => 440 * Math.pow(2, (n - 69) / 12);
    const [G4, A4, B4, C5, D5, E5, F5, G5] = [67, 69, 71, 72, 74, 76, 77, 79];
    // [midi note, start beat] — played an octave up for a music-box sparkle
    const NOTES = [
      [G4, 0], [G4, 0.75], [A4, 1], [G4, 2], [C5, 3], [B4, 4],
      [G4, 6], [G4, 6.75], [A4, 7], [G4, 8], [D5, 9], [C5, 10],
      [G4, 12], [G4, 12.75], [G5, 13], [E5, 14], [C5, 15], [B4, 16], [A4, 17],
      [F5, 18], [F5, 18.75], [E5, 19], [C5, 20], [D5, 21], [C5, 22]
    ];
    // soft low notes under each bar
    const BASS = [[48, 1], [43, 4], [43, 7], [48, 10], [48, 13], [41, 16], [48, 19], [43, 21], [48, 22]];

    let ctx, master, timer = null, loopStart = 0, running = false;

    function setup() {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = 0;
      // gentle echo for a dreamy, far-away feel
      const delay = ctx.createDelay();
      const feedback = ctx.createGain();
      const wet = ctx.createGain();
      delay.delayTime.value = 0.34;
      feedback.gain.value = 0.3;
      wet.gain.value = 0.25;
      master.connect(ctx.destination);
      master.connect(delay);
      delay.connect(feedback).connect(delay);
      delay.connect(wet).connect(ctx.destination);
    }

    function tone(freq, when, peak, decay, harmonic) {
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(peak, when + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, when + decay);
      g.connect(master);
      [[1, 1], [harmonic, 0.18]].forEach(([mult, level]) => {
        const osc = ctx.createOscillator();
        const lg = ctx.createGain();
        osc.frequency.value = freq * mult;
        lg.gain.value = level;
        osc.connect(lg).connect(g);
        osc.start(when);
        osc.stop(when + decay + 0.05);
      });
    }

    function scheduleLoop() {
      NOTES.forEach(([n, b]) => tone(hz(n + 12), loopStart + b * BEAT, 0.5, 1.8, 3));
      BASS.forEach(([n, b]) => tone(hz(n), loopStart + b * BEAT, 0.35, 2.4, 2));
      loopStart += LOOP_BEATS * BEAT;
      // queue the next loop shortly before this one ends
      timer = setTimeout(scheduleLoop, (loopStart - ctx.currentTime - 1) * 1000);
    }

    return {
      start() {
        if (running) return;
        if (!ctx) setup();
        ctx.resume();
        running = true;
        const now = ctx.currentTime;
        master.gain.cancelScheduledValues(now);
        master.gain.setValueAtTime(master.gain.value, now);
        master.gain.linearRampToValueAtTime(0.16, now + 2.5); // soft fade-in
        if (!timer) {
          loopStart = now + 0.3;
          scheduleLoop();
        }
      },
      stop() {
        if (!running) return;
        running = false;
        const now = ctx.currentTime;
        master.gain.cancelScheduledValues(now);
        master.gain.setValueAtTime(master.gain.value, now);
        master.gain.linearRampToValueAtTime(0, now + 1.2); // soft fade-out
        setTimeout(() => {
          if (running) return;
          clearTimeout(timer);
          timer = null;
          ctx.suspend();
        }, 1300);
      }
    };
  })();

  // ===================== BACKGROUND MUSIC BOX (Internet Archive API) =====================
  // "Happy Birthday Music Box Loop" by Serge Quadrado (CC BY-NC 3.0), looked up
  // through the Internet Archive metadata API when the page loads.
  const MUSIC_BOX_ITEM = 'jamendo-410246';
  const BGM_VOLUME = 0.35;
  const bgm = document.getElementById('bgm');
  let bgmReady = false;
  let bgmFade = null;

  fetch(`https://archive.org/metadata/${MUSIC_BOX_ITEM}`)
    .then(r => r.json())
    .then(data => {
      const file = data.files.find(f => /\.mp3$/i.test(f.name));
      if (!file) throw new Error('no mp3');
      bgm.src = `https://archive.org/download/${MUSIC_BOX_ITEM}/${encodeURIComponent(file.name)}`;
      bgm.load();
      bgmReady = true;
    })
    .catch(() => { bgmReady = false; });

  // Smoothly move the <audio> volume, pausing it once silent
  function fadeBgm(target) {
    clearInterval(bgmFade);
    if (target > 0 && bgm.paused) {
      bgm.volume = 0;
      bgm.play().catch(() => { bgmReady = false; background.active = false; refresh(); });
    }
    bgmFade = setInterval(() => {
      const step = 0.02;
      const v = bgm.volume;
      if (Math.abs(v - target) <= step) {
        bgm.volume = target;
        clearInterval(bgmFade);
        if (target === 0) bgm.pause();
      } else {
        bgm.volume = v + (target > v ? step : -step);
      }
    }, 80);
  }

  bgm.addEventListener('error', () => {
    if (!bgm.src) return;
    bgmReady = false;
    if (background.active) { background.active = false; refresh(); } // switch to the synth
  });

  const background = {
    active: false,
    start() {
      if (this.active) return;
      this.active = true;
      if (bgmReady) fadeBgm(BGM_VOLUME);
      else synthMelody.start();
    },
    stop() {
      if (!this.active) return;
      this.active = false;
      if (!bgm.paused) fadeBgm(0);
      synthMelody.stop();
    }
  };

  // ===================== SONG PREVIEWS (iTunes Search API) =====================
  // If a song's MP3 isn't in /music, play its official 30-second iTunes preview.
  // iTunes has no CORS headers, so this uses its JSONP callback instead of fetch.
  function itunesPreview(term) {
    return new Promise((resolve, reject) => {
      const cb = 'itunesCb' + Math.random().toString(36).slice(2);
      const script = document.createElement('script');
      const timeout = setTimeout(() => { cleanup(); reject(); }, 10000);
      function cleanup() {
        clearTimeout(timeout);
        delete window[cb];
        script.remove();
      }
      window[cb] = data => {
        cleanup();
        const hit = (data.results || []).find(r => r.previewUrl);
        hit ? resolve(hit.previewUrl) : reject();
      };
      script.onerror = () => { cleanup(); reject(); };
      script.src = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=5&callback=${cb}`;
      document.head.appendChild(script);
    });
  }

  // ===================== RECORD PLAYER + MUSIC TOGGLE =====================
  // The background music box plays whenever sound is on and no song is playing.
  const player = document.getElementById('player');
  const turntable = document.getElementById('turntable');
  const nowPlaying = document.getElementById('nowPlaying');
  const musicToggle = document.getElementById('musicToggle');
  const tracks = [...document.querySelectorAll('.playlist-track')];
  let current = -1;
  let soundOn = false;
  let inPlaylist = false;
  player.volume = 0.8;

  function trackInfo(track) {
    return {
      name: track.querySelector('.track-name').textContent,
      artist: track.querySelector('.track-artist').textContent
    };
  }

  // Work out each song's source ahead of time, so a tap can start it instantly
  // (iPhones only allow audio that starts directly from a tap).
  tracks.forEach(track => {
    const { name, artist } = trackInfo(track);
    const probe = new Audio();
    probe.preload = 'metadata';
    probe.addEventListener('loadedmetadata', () => { track.dataset.play = track.dataset.src; });
    probe.addEventListener('error', () => {
      itunesPreview(`${name} ${artist}`)
        .then(url => { track.dataset.play = url; track.dataset.preview = '1'; })
        .catch(() => { track.dataset.play = ''; });
    });
    probe.src = track.dataset.src;
  });

  function songPlaying() {
    return current >= 0 && !player.paused;
  }

  // Keep the music box, record, and floating button in sync with what's audible
  function refresh() {
    const song = songPlaying();
    if (soundOn && !song && !document.hidden && !inPlaylist) background.start();
    else background.stop();
    turntable.classList.toggle('playing', song);
    musicToggle.classList.toggle('paused', !soundOn);
    if (current < 0) return;
    const track = tracks[current];
    if (track.dataset.play === '') return; // keep the "couldn't load" note visible
    const { name, artist } = trackInfo(track);
    nowPlaying.textContent = `${song ? '♪' : '❚❚'} ${name} — ${artist}`;
  }

  function playTrack(index) {
    const track = tracks[index];
    tracks.forEach(t => t.classList.remove('is-playing'));
    current = index;
    soundOn = true;
    const src = track.dataset.play;
    if (src === undefined) {
      nowPlaying.textContent = '♪ still loading… tap again in a sec';
      refresh();
      return;
    }
    if (src === '') {
      nowPlaying.textContent = `⚠ couldn't load this song — add ${track.dataset.src}`;
      refresh();
      return;
    }
    track.classList.add('is-playing');
    player.src = src;
    player.play().catch(() => refresh());
  }

  player.addEventListener('play', refresh);
  player.addEventListener('pause', refresh);
  player.addEventListener('error', () => {
    if (current < 0 || !player.src) return;
    tracks[current].classList.remove('is-playing');
    nowPlaying.textContent = `⚠ couldn't play this song`;
    refresh();
  });
  // Roll on to the next song when one finishes
  player.addEventListener('ended', () => playTrack((current + 1) % tracks.length));

  function resumeSong() {
    soundOn = true;
    player.play().catch(() => {});
  }

  // Floating button: mute / unmute everything
  musicToggle.addEventListener('click', () => {
    soundOn = !soundOn;
    if (!soundOn && songPlaying()) player.pause();
    refresh();
  });

  // Record player: play / pause the current song
  turntable.addEventListener('click', () => {
    if (current < 0 || !player.src) playTrack(Math.max(current, 0));
    else if (player.paused) resumeSong();
    else player.pause();
  });

  tracks.forEach((track, i) => {
    track.addEventListener('click', () => {
      if (i === current && player.src && !player.paused) player.pause();
      else if (i === current && player.src) resumeSong();
      else playTrack(i);
      createSparklesBurst(track);
    });
  });

  // Hush the music while the tab is in the background
  document.addEventListener('visibilitychange', refresh);

  // Fade the music box out while the playlist section fills the middle of the
  // screen, and bring it back once you scroll away from it
  new IntersectionObserver(([entry]) => {
    inPlaylist = entry.isIntersecting;
    refresh();
  }, { rootMargin: '-45% 0px -45% 0px' }).observe(document.getElementById('playlist'));

  function startBackgroundMusic() {
    soundOn = true;
    refresh();
  }

  // ===================== GALLERY HOVER TILT =====================
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      item.style.transform = `perspective(600px) rotate(0deg) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.04)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });

  // ===================== BIRTHDAY CONFETTI ON NAME CLICK =====================
  const heroName = document.querySelector('.hero-name');
  heroName.addEventListener('click', () => {
    burstConfetti(...centerOf(heroName), 40);
  });

});
