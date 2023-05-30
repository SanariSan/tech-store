import {
  Avatar,
  Box,
  Flex,
  Icon,
  Skeleton,
  Text,
  keyframes,
  useColorModeValue,
} from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useMemo } from 'react';
import { GiTechnoHeart } from 'react-icons/gi';
import { MdCelebration } from 'react-icons/md';
import { COLORS } from '../../chakra-setup';
import { useAppSelector } from '../../hooks/redux';
import { uiColorModeChangeStatusSelector, uiSidebarStateSelector } from '../../store';
import { ParticlesComponentMemo } from './particles.help';
import { useDelayedUnmount } from '../../hooks/use-delayed-unmount';

type THelpComponent = {
  [key: string]: unknown;
};

const hb = keyframes`
0% {
  transform: scale(1);
}
5% {
  transform: scale(1.15);
}
10% {
  transform: scale(1);
}
15% {
  transform: scale(1.15);
}
20% {
  transform: scale(1);
}
100% {
  transform: scale(1);
}
`;

const animation = `${hb} 2s ease-in-out 2s infinite`;

const HelpComponent: FC<THelpComponent> = () => {
  const colorModeChangeStatus = useAppSelector(uiColorModeChangeStatusSelector);
  const isSidebarOpened = useAppSelector(uiSidebarStateSelector);
  const { isMounted } = useDelayedUnmount({ isVisible: !isSidebarOpened, delay: 100 });
  const [bg] = [useColorModeValue(COLORS.blue[400], COLORS.darkBlue[200])];

  const hover = useMemo(
    () => ({
      transform: 'perspective(100px) translateZ(2px)',
    }),
    [],
  );

  return (
    <Flex w={'100%'} h={'100%'} position={'relative'}>
      {colorModeChangeStatus !== 'ongoing' && isMounted && (
        <ParticlesComponentMemo isVisible={!isSidebarOpened} />
      )}
      <Flex
        w={'100%'}
        h={'100%'}
        direction={'column'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        py={10}
        px={5}
        gap={10}
      >
        <Box
          w={{ base: '150px', sm: '200px', md: '250px' }}
          h={{ base: '150px', sm: '200px', md: '250px' }}
          position={'relative'}
        >
          {colorModeChangeStatus === 'completed' ? (
            <>
              <Avatar
                position={'absolute'}
                inset={0}
                filter="blur(16px)"
                zIndex={0}
                transform="scale(1.025, 1.025)"
                src={'https://avatars.githubusercontent.com/u/76019273?v=4'}
                objectFit={'contain'}
                borderRadius={'99999px'}
                w={'100%'}
                h={'100%'}
              />
              <Avatar
                position={'absolute'}
                src={'https://avatars.githubusercontent.com/u/76019273?v=4'}
                objectFit={'contain'}
                borderRadius={'99999px'}
                w={'100%'}
                h={'100%'}
                _hover={hover}
                _active={hover}
                _focus={hover}
              />
            </>
          ) : (
            <Skeleton
              h={'100%'}
              w={'100%'}
              opacity={1}
              borderRadius={'9999999px'}
              startColor={'gray.100'}
              endColor={'gray.600'}
              transition={'opacity 1s linear'}
            />
          )}
        </Box>

        <Flex
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={{ base: 9, sm: 5 }}
        >
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            justifyContent={'center'}
            alignItems={'center'}
            gap={3}
            position={'relative'}
            _hover={hover}
            _active={hover}
            _focus={hover}
          >
            <Text
              variant={{ base: 'sm', sm: 'md' }}
              fontWeight={'bold'}
              textAlign={'center'}
              py={'auto'}
              whiteSpace={colorModeChangeStatus === 'ongoing' ? 'nowrap' : 'normal'}
              zIndex={1}
            >
              Showcase project made with
            </Text>
            <Icon
              display={'inline-block'}
              as={GiTechnoHeart}
              boxSize={7}
              color={COLORS.red[500]}
              zIndex={1}
              animation={animation}
              ml={colorModeChangeStatus === 'ongoing' ? 2 : 0}
            />
            <Text
              variant={{ base: 'sm', sm: 'md' }}
              fontWeight={'bold'}
              textAlign={'center'}
              py={'auto'}
              whiteSpace={colorModeChangeStatus === 'ongoing' ? 'nowrap' : 'normal'}
              zIndex={1}
            >
              by SanariSan.
            </Text>
            <Flex
              position={{ base: 'absolute' }}
              width={'110%'}
              height={'130%'}
              opacity={0.5}
              background={bg}
              borderRadius={'20px'}
              zIndex={0}
              filter={'auto'}
              blur={'1px'}
            />
          </Flex>
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            justifyContent={'center'}
            alignItems={'center'}
            gap={3}
            position={'relative'}
            _hover={hover}
            _active={hover}
            _focus={hover}
          >
            <Text
              variant={{ base: 'sm', sm: 'md' }}
              fontWeight={'bold'}
              textAlign={'center'}
              py={'auto'}
              whiteSpace={colorModeChangeStatus === 'ongoing' ? 'nowrap' : 'normal'}
              zIndex={1}
            >
              Might have some flaws but overall I like it!
            </Text>
            <Icon
              display={'inline-block'}
              as={MdCelebration}
              boxSize={7}
              color={COLORS.yellow[500]}
              zIndex={1}
              ml={colorModeChangeStatus === 'ongoing' ? 8 : 0}
            />
            <Flex
              position={'absolute'}
              width={'110%'}
              height={'130%'}
              opacity={0.5}
              background={bg}
              borderRadius={'20px'}
              zIndex={0}
              filter={'auto'}
              blur={'1px'}
            />
          </Flex>
        </Flex>
        <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} gap={5}>
          All kind of links here: - - -
        </Flex>
      </Flex>
    </Flex>
  );
};

const HelpComponentMemo = memo(HelpComponent);

export { HelpComponentMemo };
