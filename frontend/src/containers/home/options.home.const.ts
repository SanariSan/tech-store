import type { ISourceOptions } from 'tsparticles-engine';
import { ASSETS } from '../../services/api';

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
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'repulse',
      },
      onHover: {
        enable: true,
        mode: ['grab', 'attract'],
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 250,
        duration: 0.3,
      },
      attract: {
        quantity: 20,
        distance: 400,
      },
      grab: {
        quantity: 8,
        distance: 200,
        duration: 1,
      },
    },
  },
  particles: {
    links: {
      color: '#AAAAAA',
      distance: 200,
      enable: true,
      opacity: 0.3,
      width: 1,
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
    number: {
      density: {
        enable: true,
        area: isMobile ? 350 : 800,
      },
      value: isMobile ? 15 : 12,
    },
    reduceDuplicates: true,
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'images',
      images: [
        {
          src: ASSETS.ATOM,
        },
        {
          src: ASSETS.REDUX,
        },
        {
          src: ASSETS.SAGA,
        },
        {
          src: ASSETS.NODE,
        },
        {
          src: ASSETS.TS,
        },
        {
          src: ASSETS.DOCKER,
        },
        {
          src: ASSETS.REDIS,
        },
        {
          src: ASSETS.NGINX,
        },
        {
          src: ASSETS.PG,
        },
        {
          src: ASSETS.GH,
        },
        {
          src: ASSETS.LINT,
        },
        {
          src: ASSETS.CHAKRA,
        },
      ],
    },
    size: {
      value: { min: 12, max: 18 },
    },
  },
  detectRetina: true,
});
