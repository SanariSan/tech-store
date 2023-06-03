import {
  Avatar,
  Box,
  Flex,
  Icon,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import type { FC } from 'react';
import { memo, useMemo } from 'react';
import { GiTechnoHeart } from 'react-icons/gi';
import { MdCelebration } from 'react-icons/md';
import pfpGh from '../../../assets/pfp_gh.webp';
import { COLORS } from '../../chakra-setup';
import {
  HB_ANIMATION_KEYFRAMES,
  PFP_ANIMATION_KEYFRAMES,
  PFP_BLUR_ANIMATION_KEYFRAMES,
} from './keyframes.home.const';

const hbAnimation = `${HB_ANIMATION_KEYFRAMES} 2s ease-in-out 2s infinite`;
const pfpBlurAnimation = `${PFP_BLUR_ANIMATION_KEYFRAMES} 20s ease-in-out infinite`;
const pfpAnimation = `${PFP_ANIMATION_KEYFRAMES} 20s ease-in-out infinite`;

type THomeMainContent = {
  isThemeChanging: boolean;
};

const HomeMainContentComponent: FC<THomeMainContent> = ({ isThemeChanging }) => {
  const [bg] = [useColorModeValue(COLORS.blue[400], COLORS.darkBlue[200])];

  const hover = useMemo(
    () => ({
      transform: 'perspective(100px) translateZ(2px)',
    }),
    [],
  );

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      py={10}
      px={8}
      gap={14}
    >
      <Box
        w={{ base: '150px', sm: '200px', md: '250px' }}
        h={{ base: '150px', sm: '200px', md: '250px' }}
        position={'relative'}
      >
        {!isThemeChanging ? (
          <LinkBox w={'100%'} h={'100%'}>
            <LinkOverlay
              href="https://github.com/SanariSan"
              w={'100%'}
              h={'100%'}
              target={'_blank'}
              rel={'noreferrer'}
            >
              <Avatar
                position={'absolute'}
                inset={0}
                filter={'auto'}
                blur={'16px'}
                zIndex={0}
                transform="scale(1.025, 1.025)"
                animation={pfpBlurAnimation}
                src={pfpGh}
                objectFit={'contain'}
                borderRadius={'99999px'}
                w={'100%'}
                h={'100%'}
              />
              <Avatar
                position={'absolute'}
                src={pfpGh}
                objectFit={'contain'}
                borderRadius={'99999px'}
                animation={pfpAnimation}
                transition={'transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)'}
                w={'100%'}
                h={'100%'}
                _hover={hover}
                _active={hover}
                _focus={hover}
              />
            </LinkOverlay>
          </LinkBox>
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
        gap={{ base: 10, sm: 6 }}
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
            whiteSpace={isThemeChanging ? 'nowrap' : 'normal'}
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
            animation={hbAnimation}
            ml={isThemeChanging ? 2 : 0}
          />
          <Text
            variant={{ base: 'sm', sm: 'md' }}
            fontWeight={'bold'}
            textAlign={'center'}
            py={'auto'}
            whiteSpace={isThemeChanging ? 'nowrap' : 'normal'}
            zIndex={1}
          >
            by SanariSan.
          </Text>
          <Flex
            position={{ base: 'absolute' }}
            width={'110%'}
            height={'130%'}
            opacity={0.7}
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
          px={3}
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
            whiteSpace={isThemeChanging ? 'nowrap' : 'normal'}
            zIndex={1}
          >
            Might have some flaws...
          </Text>
          <Text
            variant={{ base: 'sm', sm: 'md' }}
            fontWeight={'bold'}
            textAlign={'center'}
            py={'auto'}
            whiteSpace={isThemeChanging ? 'nowrap' : 'normal'}
            zIndex={1}
          >
            But overall I like it!
          </Text>
          <Icon
            display={'inline-block'}
            as={MdCelebration}
            boxSize={7}
            color={COLORS.yellow[500]}
            zIndex={1}
            ml={{ base: 0, md: isThemeChanging ? 4 : 0 }}
          />
          <Flex
            position={'absolute'}
            width={'110%'}
            height={'130%'}
            opacity={0.7}
            background={bg}
            borderRadius={'20px'}
            zIndex={0}
            filter={'auto'}
            blur={'1px'}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

const HomeMainContentComponentMemo = memo(HomeMainContentComponent);

export { HomeMainContentComponentMemo };
