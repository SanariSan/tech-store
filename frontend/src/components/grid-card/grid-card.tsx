import { TimeIcon } from '@chakra-ui/icons';
import {
  Button,
  Circle,
  Flex,
  Text,
  keyframes,
  useColorModeValue,
  useToken,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { COLORS } from '../../chakra-setup';
import { LazyImageContainer } from '../../containers/lazy-image';
import { useAppSelector } from '../../hooks/redux';
import { useIntersection } from '../../hooks/use-intersection';
import type { goodsEntitiesSelector } from '../../store';
import { goodsIsInLikedSelector } from '../../store';
import { CartIcon, HeartIcon } from '../icons';

export type TGridCardComponent = Omit<
  ReturnType<typeof goodsEntitiesSelector>[number],
  'category' | 'modifier'
> & {
  onLike: ({ id }: { id: string }) => void;
  onDislike: ({ id }: { id: string }) => void;
  onBuy: ({ id }: { id: string }) => void;
} & React.Attributes;

const GridCardComponent: FC<TGridCardComponent> = ({
  id,
  name,
  price,
  hsrc,
  lsrc,
  onLike,
  onDislike,
  onBuy,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const sales = useRef(Math.floor(Math.random() * (100 - 10)) + 10);
  const rating = useRef((Math.random() * (5 - 3) + 3).toFixed(1));
  const reviews = useRef(Math.floor(Math.random() * (40 - 1)) + 1);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const { isIntersecting } = useIntersection({ ref: cardRef, shouldTrack: !hasBeenShown });
  const [isImageFocused, setIsImageFocused] = useState(false);
  const [isCartIconPressed, setIsCartIconPressed] = useState(false);
  const isLiked = useAppSelector(goodsIsInLikedSelector({ id }));

  const imgRef = useRef<HTMLImageElement | null>(null);
  // const size = useHookThrottle({ useHook: useSize, args: [imgRef] });

  const [
    inactive,
    secondaryAlt,
    wrapBg,
    secondary,
    cardBg,
    impact,
    accent,
    border,
    liked,
    icons,
    dimmer,
  ] = [
    useColorModeValue(COLORS.blue[500], COLORS.blue[600]),
    useColorModeValue(COLORS.blue[600], COLORS.blue[500]),
    useColorModeValue(COLORS.white[300], COLORS.darkBlue[300]),
    useColorModeValue(COLORS.blue[300], COLORS.darkBlue[200]),
    useColorModeValue(COLORS.white[200], COLORS.darkBlue[500]),
    useColorModeValue(COLORS.yellow[400], COLORS.yellow[400]),
    useColorModeValue(COLORS.blue[800], COLORS.white[900]),
    useColorModeValue(COLORS.white[300], COLORS.darkBlue[200]),
    useColorModeValue(COLORS.red[400], COLORS.red[600]),
    useColorModeValue(COLORS.blue[600], COLORS.white[900]),
    useColorModeValue(COLORS.blue[600], COLORS.darkBlue[500]),
  ];
  const [imgBg, circleBox] = useToken('colors', [COLORS.white[900], 'whiteAlpha.300']);

  const cartAnimationDuration = useMemo(() => 300, []);
  const animationKeyframes = useMemo(
    () => keyframes`
      0% { transform: scale(1) rotate(0); opacity: 0.9; }
      50% { transform: scale(1.25) rotate(20deg); opacity: 0.1; }
      100% { transform: scale(1.5) rotate(60deg); opacity: 0; }
    `,
    [],
  );

  const animation = useMemo(
    () => `${animationKeyframes} ${cartAnimationDuration}ms ease-in-out`,
    [animationKeyframes, cartAnimationDuration],
  );

  const hover = useMemo(
    () => ({
      transform: 'perspective(100px) translateZ(2px)',
    }),
    [],
  );

  useEffect(() => {
    if (isIntersecting) setHasBeenShown(true);
  }, [isIntersecting]);

  const cartIconTimer = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (!isCartIconPressed) return;
    if (cartIconTimer.current !== undefined) return;

    cartIconTimer.current = setTimeout(() => {
      setIsCartIconPressed(false);
      cartIconTimer.current = undefined;
    }, cartAnimationDuration + 50);
  }, [isCartIconPressed, cartAnimationDuration]);

  return (
    <Flex
      borderRadius={'20px'}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'space-between'}
      minH={{ base: '250px', sm: '375px' }}
      minW={{ base: '230px', sm: '330px' }}
      maxW={{ base: '230px', sm: '450px' }}
      h={'max-content'}
      w={'100%'}
      cursor={'pointer'}
      opacity={hasBeenShown ? 1 : 0}
      transition={`
      transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.1s linear
      `}
      transform={'perspective(100px) translateZ(0px)'}
      _hover={{ sm: hover }}
      _active={{ sm: hover }}
      _focus={{ sm: hover }}
      ref={cardRef}
    >
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        w={'100%'}
        minH={{ base: '200px', sm: '300px' }}
        h={{ base: '200px', sm: '300px' }}
        p={'auto'}
        pos={'relative'}
        bg={imgBg}
        borderRadius={'20px'}
        mb={'15px'}
        onMouseOver={() => {
          setIsImageFocused(true);
        }}
        onMouseLeave={() => {
          setIsImageFocused(false);
        }}
      >
        <LazyImageContainer
          objectFit={{ base: 'cover', sm: 'cover' }}
          backgroundColor={'transparent'}
          h={'75%'}
          hSrc={hsrc}
          lSrc={lsrc}
          elRef={imgRef}
        />
        <Flex
          alignItems={'center'}
          justifyContent={'center'}
          pos={'absolute'}
          w={'100%'}
          h={'100%'}
          borderRadius={'20px'}
          left={0}
          top={0}
        >
          <Flex zIndex={1} gap={3}>
            <Circle
              _hover={{ opacity: 1, background: secondary }}
              opacity={isImageFocused ? 0.8 : 0}
              transition={'opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)'}
              size={{ base: 10, sm: 12 }}
              boxShadow={`0 0 2px 1px ${circleBox}`}
              onClick={() => {
                if (isLiked) {
                  onDislike({ id });
                  return;
                }

                onLike({ id });
              }}
              background={wrapBg}
            >
              <HeartIcon color={isLiked ? liked : icons} boxSize={{ base: 4, sm: 5 }} />
            </Circle>
            <Circle
              opacity={isImageFocused ? 0.8 : 0}
              _hover={{ opacity: 1, background: secondary }}
              transition={'opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)'}
              size={{ base: 10, sm: 12 }}
              boxShadow={`0 0 2px 1px ${circleBox}`}
              background={wrapBg}
            >
              <TimeIcon color={icons} boxSize={{ base: 4, sm: 5 }} />
            </Circle>
          </Flex>

          <Flex
            pos={'absolute'}
            w={'100%'}
            h={'100%'}
            backgroundColor={dimmer}
            borderRadius={'20px'}
            left={0}
            right={0}
            top={0}
            bottom={0}
            margin={'0 auto'}
            opacity={isImageFocused ? 0.5 : 0}
            transition={'opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)'}
          />
        </Flex>
      </Flex>
      <Flex
        bg={cardBg}
        borderRadius={'20px'}
        borderStyle={'dashed'}
        borderColor={border}
        borderWidth={'2px'}
        w={'100%'}
        h={{ base: '150px', sm: '175px' }}
        direction={'column'}
        alignItems={'flex-start'}
        px={3}
        ps={5}
        py={3}
      >
        <Flex direction={'column'} width={'100%'} height={'100%'} justifyContent={'space-between'}>
          <Flex direction={'column'} width={'100%'} height={'50%'} justifyContent={'flex-start'}>
            <Text variant={{ base: 'md', sm: 'xl' }} fontWeight={'bold'} color={accent}>
              {name}
            </Text>
            <Text variant={{ base: 'base' }} color={secondaryAlt}>
              T.S. Official
            </Text>
          </Flex>

          <Flex direction={'row'} width={'100%'} height={'50%'} gap={3}>
            <Flex direction={'column'} width={'100%'} height={'100%'} justifyContent={'flex-end'}>
              <Flex w={'100%'} gap={3}>
                <Text
                  variant={{ base: 'base', sm: 'sm' }}
                  fontWeight={'bold'}
                  color={impact}
                  letterSpacing={'0.05rem'}
                  whiteSpace={'nowrap'}
                >
                  {price} $
                </Text>
                <Text
                  variant={{ base: 'base', sm: 'sm' }}
                  color={inactive}
                  letterSpacing={'0.05rem'}
                  textDecoration={'line-through'}
                  textDecorationColor={inactive}
                  whiteSpace={'nowrap'}
                >
                  {price + 100} $
                </Text>
              </Flex>
              <Flex w={'100%'} gap={3}>
                <Text variant={{ base: 'base' }} color={secondaryAlt} whiteSpace={'nowrap'}>
                  {sales.current} sales
                </Text>
                <Text variant={{ base: 'base' }} color={secondaryAlt} whiteSpace={'nowrap'}>
                  🏆 {rating.current}
                </Text>
                <Text variant={{ base: 'base' }} color={secondaryAlt} whiteSpace={'nowrap'}>
                  ({reviews.current})
                </Text>
              </Flex>
            </Flex>

            <Flex
              alignItems={'flex-end'}
              justifyContent={'flex-end'}
              minW={'40px'}
              minH={'40px'}
              position={'relative'}
            >
              <Circle
                as={motion.div}
                position={'absolute'}
                animation={isCartIconPressed ? animation : undefined}
                background={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%23${impact.slice(
                  1,
                )}' stroke-width='3' stroke-dasharray='4%2c10' stroke-dashoffset='66' stroke-linecap='square'/%3e%3c/svg%3e");`}
                opacity={0}
                size={{ base: 10, sm: 12 }}
              />
              <Circle
                as={Button}
                position={'absolute'}
                size={{ base: 10, sm: 12 }}
                background={wrapBg}
                _hover={{ background: secondary }}
                onClick={() => {
                  onBuy({ id });
                  setIsCartIconPressed(true);
                }}
                isDisabled={isCartIconPressed}
                _disabled={{
                  opacity: 0.5,
                }}
                cursor={'pointer'}
                _active={{ background: wrapBg }}
              >
                <CartIcon boxSize={{ base: 4, sm: 5 }} color={icons} />
              </Circle>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const GridCardComponentMemo = memo(GridCardComponent);

export { GridCardComponentMemo };
