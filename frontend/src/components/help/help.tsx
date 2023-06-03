import { Box, Flex, Image, Text, useColorModeValue, useToken } from '@chakra-ui/react';
import type { FC } from 'react';
import { memo } from 'react';
import cross from '../../../assets/cross.webp';
import no1 from '../../../assets/no1.webp';
import no2 from '../../../assets/no2.webp';
import no3 from '../../../assets/no3.webp';
import no4 from '../../../assets/no4.webp';
import { COLORS } from '../../chakra-setup';

type THelpComponent = {
  [key: string]: unknown;
};

const HelpComponent: FC<THelpComponent> = () => {
  const [glow] = [useColorModeValue(COLORS.black[900], COLORS.white[900])];
  const [glowRef] = useToken('colors', [glow]);

  return (
    <Box w={'100%'} h={'100%'} position={'relative'}>
      <Flex
        w={'100%'}
        h={'100%'}
        direction={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={3}
      >
        <Text variant={'xxxxl'} fontWeight={'bold'} zIndex={1} textShadow={`0 0 5px ${glowRef}`}>
          No elp.
        </Text>
        <Flex
          w={'100%'}
          h={{ base: '50%', md: 'max-content' }}
          justifyContent={'center'}
          alignItems={'center'}
          flexWrap={'wrap'}
          zIndex={1}
          gap={{ base: 0, md: 5 }}
        >
          <Flex w={'max-content'} h={'max-content'} flexWrap={'nowrap'} gap={5}>
            <Image src={no1} objectFit={'cover'} />
            <Image src={no2} objectFit={'cover'} />
          </Flex>
          <Flex w={'max-content'} h={'max-content'} flexWrap={'nowrap'} gap={5}>
            <Image src={no3} objectFit={'cover'} />
            <Image src={no4} objectFit={'cover'} />
          </Flex>
        </Flex>
      </Flex>
      <Image
        src={cross}
        w={'100%'}
        h={'100%'}
        position={'absolute'}
        top={'28%'}
        transform={'rotate(-5deg)'}
        objectFit={'contain'}
        opacity={0.6}
      />
    </Box>
  );
};

const HelpComponentMemo = memo(HelpComponent);

export { HelpComponentMemo };
