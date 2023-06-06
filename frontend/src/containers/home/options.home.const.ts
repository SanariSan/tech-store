import type { ISourceOptions } from 'tsparticles-engine';
import atom from '../../../assets/atom.webp';
import chakra from '../../../assets/chakra.webp';
import docker from '../../../assets/docker.webp';
import gh from '../../../assets/gh.webp';
import lint from '../../../assets/lint.webp';
import nginx from '../../../assets/nginx.webp';
import node from '../../../assets/node.webp';
import pg from '../../../assets/pg.webp';
import redis from '../../../assets/redis.webp';
import saga from '../../../assets/redux-saga.webp';
import redux from '../../../assets/redux.webp';
import ts from '../../../assets/ts.webp';

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
          src: atom,
        },
        {
          src: redux,
        },
        {
          src: saga,
        },
        {
          src: node,
        },
        {
          src: ts,
        },
        {
          src: docker,
        },
        {
          src: redis,
        },
        {
          src: nginx,
        },
        {
          src: pg,
        },
        {
          src: gh,
        },
        {
          src: lint,
        },
        {
          src: chakra,
        },
      ],
    },
    size: {
      value: { min: 12, max: 18 },
    },
  },
  detectRetina: true,
});
