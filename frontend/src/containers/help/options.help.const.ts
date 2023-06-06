import type { ISourceOptions } from 'tsparticles-engine';
import q from '../../../assets/q.webp';

export const getOptions = ({ isMobile }: { isMobile: boolean }): ISourceOptions => ({
  fullScreen: {
    enable: false,
    zIndex: 0,
  },
  background: {
    color: {
      value: 'transparent',
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: 'repulse',
      },
      onHover: {
        enable: false,
        mode: ['grab', 'attract'],
      },
      resize: true,
    },
    modes: {},
  },
  particles: {
    links: {
      enable: false,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce',
      },
      random: false,
      speed: 2,
      straight: false,
    },
    rotate: {
      value: {
        min: 0,
        max: 360,
      },
      direction: 'random',
      move: true,
      animation: {
        enable: true,
        speed: 20,
      },
    },
    number: {
      density: {
        enable: true,
        area: isMobile ? 300 : 800,
      },
      value: isMobile ? 15 : 10,
    },
    reduceDuplicates: true,
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'image',
      image: {
        src: q,
      },
    },
    size: {
      value: { min: 12, max: 18 },
    },
  },
  detectRetina: true,
});
