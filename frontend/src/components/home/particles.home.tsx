import type { FC } from 'react';
import { memo, useCallback, useEffect, useRef } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import type { Container, Engine } from 'tsparticles-engine';
import { OPTIONS } from './options.home.const';

type TParticlesComponent = {
  isPaused: boolean;
};

const ParticlesComponent: FC<TParticlesComponent> = ({ isPaused }) => {
  const containerRef = useRef<Container>();
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback((container: Container | undefined) => {
    containerRef.current = container;
    return Promise.resolve();
  }, []);

  useEffect(() => {
    if (!isPaused) containerRef.current?.play();
    else containerRef.current?.pause();
  }, [isPaused]);

  return (
    <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={OPTIONS} />
  );
};

const ParticlesComponentMemo = memo(ParticlesComponent);

export { ParticlesComponentMemo };
