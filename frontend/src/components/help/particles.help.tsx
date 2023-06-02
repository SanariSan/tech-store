import { Box, Flex, Icon, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { memo, useMemo } from 'react';
import { FaQuestion } from 'react-icons/fa';

type TParticlesComponent = {
  isVisible: boolean;
};

const getAnimationKeyframes = (steps: string[]) => keyframes`
0% {
  opacity: 0;
}
5% {
  opacity: 0.3;
}
${steps.join('\n')}
95% {
  opacity: 0.3;
}
100% {
  transform: translateY(100vh);
  opacity: 0;
}
`;

// todo make better movement I beg you, trash atm
const makeSteps = () => {
  const steps: string[] = [];
  const percentTreshhold = 10;
  const [minRotate, maxRotate] = [-25, 25];

  const maxPercent = 95;
  let currPercent = 5;

  let deg = Math.random() * (maxRotate - minRotate) + minRotate;
  currPercent += percentTreshhold;

  while (currPercent < maxPercent) {
    const rndXShift = currPercent / (Math.random() * (10 - 5) + 5);
    steps.push(`${currPercent}% {
      transform: translate(${rndXShift}vw, ${currPercent}vh) rotateZ(${deg.toFixed(2)}deg);
      opacity: 0.3;
    }`);

    deg = Math.random() * (maxRotate - minRotate) + minRotate;
    currPercent += percentTreshhold;
  }

  return steps;
};

const ParticlesComponent: FC<TParticlesComponent> = ({ isVisible }) => {
  const arr = useMemo(
    () =>
      Array.from({ length: 7 }, (el, i) => {
        const animationDelay = Number((Math.random() * 15).toFixed(2));
        const boxSize = Math.floor(Math.floor(Math.random() * (7 - 3)) + 3);
        const steps = makeSteps();
        const animationKeyframes = getAnimationKeyframes(steps);

        const animation = `${animationKeyframes} 15s linear ${animationDelay}s infinite`;
        return (
          // todo: maybe not question icons but multiple different ones
          <Box
            w={'max-content'}
            h={'max-content'}
            key={i}
            animation={animation}
            as={motion.div}
            opacity={0}
            display={'inline-block'}
          >
            <Icon as={FaQuestion} boxSize={boxSize} />
          </Box>
        );
      }),
    [],
  );

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      justifyContent={'space-evenly'}
      filter={'auto'}
      blur={'2px'}
      position={'absolute'}
      top={0}
      left={0}
      opacity={isVisible ? 1 : 0}
      transition={'opacity 0.1s linear'}
    >
      {arr}
    </Flex>
  );
};

const ParticlesComponentMemo = memo(ParticlesComponent);

export { ParticlesComponentMemo };
