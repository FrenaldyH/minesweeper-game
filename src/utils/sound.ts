let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

const playTone = (
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.1
) => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
};

export const sounds = {
  reveal: () => playTone(800, 0.05, 'square', 0.05),
  flag: () => playTone(600, 0.08, 'triangle', 0.08),
  unflag: () => playTone(400, 0.08, 'triangle', 0.06),
  explode: () => {
    playTone(150, 0.3, 'sawtooth', 0.15);
    setTimeout(() => playTone(80, 0.2, 'sawtooth', 0.1), 50);
  },
  win: () => {
    playTone(523, 0.1, 'sine', 0.1); // C
    setTimeout(() => playTone(659, 0.1, 'sine', 0.1), 100);
    setTimeout(() => playTone(784, 0.2, 'sine', 0.12), 200);
  },
};
