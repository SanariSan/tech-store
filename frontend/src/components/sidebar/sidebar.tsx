import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Circle, Flex, Icon, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SIDEBAR_TEMPLATE } from './sidebar.const';

interface ISidebarComponent {
  isSidebarOpened: boolean;
}

const SidebarComponent: React.FC<ISidebarComponent> = ({
  isSidebarOpened,
}: {
  isSidebarOpened: boolean;
}) => {
  const [selectedIdxs, setSelectedIdxs] = useState([0, -1]);
  const [unfoldedIdxs, setUnfoldedIdxs] = useState(new Set<number>());
  const isActive = useRef(true);

  useEffect(
    () => () => {
      isActive.current = false;
    },
    [],
  );

  const updateSelectedIdxs = useCallback((newIdxs: number[]) => {
    setSelectedIdxs(newIdxs);
  }, []);

  const unfold = useCallback((idx: number) => {
    setUnfoldedIdxs((s) => s.add(idx));
  }, []);

  const collapse = useCallback((idx: number) => {
    setUnfoldedIdxs((s) => {
      s.delete(idx);
      return s;
    });
  }, []);

  return (
    <Flex direction={'column'} alignItems={'flex-start'} gap={0} w={'100%'} py={3}>
      {SIDEBAR_TEMPLATE.map(({ icon, title, sub }, idxParent) => (
        <>
          <Flex
            w={'100%'}
            h={'50px'}
            direction={'row'}
            bg={selectedIdxs[0] === idxParent ? 'white.300' : 'transparent'}
            borderRadius={'0 25px 25px 0'}
            cursor={'pointer'}
          >
            <Box
              opacity={selectedIdxs[0] === idxParent ? 1 : 0}
              h={'100%'}
              w={'12px'}
              minW={'12px'}
              maxW={'12px'}
              bg={'yellow.400'}
              clipPath={'polygon(0 0, 0% 100%, 100% 50%)'}
            />
            <Flex
              w={'100%'}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'flex-start'}
              onClick={() => {
                updateSelectedIdxs([idxParent, -1]);
              }}
            >
              <Icon
                w={10}
                pl={5}
                color={selectedIdxs[0] === idxParent ? 'yellow.400' : 'blue.500'}
                viewBox={icon.viewBox}
              >
                <path fill={'currentColor'} d={icon.d} />
              </Icon>
              {isSidebarOpened ? <Text pl={5}>{title}</Text> : null}
              {isSidebarOpened && sub !== null ? (
                <Box
                  ml={'auto'}
                  mr={5}
                  onClick={() => {
                    if (unfoldedIdxs.has(idxParent)) {
                      collapse(idxParent);
                    } else {
                      unfold(idxParent);
                    }
                  }}
                >
                  {unfoldedIdxs.has(idxParent) ? (
                    <Circle size="20px" bg="blue.300">
                      <ChevronUpIcon />
                    </Circle>
                  ) : (
                    <Circle size="20px" bg="blue.300">
                      <ChevronDownIcon />
                    </Circle>
                  )}
                </Box>
              ) : null}
            </Flex>
          </Flex>
          {isSidebarOpened && sub !== null ? (
            <Flex
              display={unfoldedIdxs.has(idxParent) ? 'flex' : 'none'}
              direction={'column'}
              width={'100%'}
              pl={10}
            >
              {sub.map(({ title: titleSub }, idxSub) => (
                <Flex
                  position={'relative'}
                  h={'50px'}
                  direction={'row'}
                  alignItems={'center'}
                  cursor={'pointer'}
                  onClick={() => {
                    updateSelectedIdxs([idxParent, idxSub]);
                  }}
                >
                  <Box position={'absolute'} left={0} w={'2px'} h={'100%'} bg={'blue.500'} />
                  <Flex h={'100%'} direction={'row'} alignItems={'center'}>
                    <Box
                      position={'absolute'}
                      w={'3px'}
                      h={'50%'}
                      bg={
                        selectedIdxs[0] === idxParent && selectedIdxs[1] === idxSub
                          ? 'yellow.400'
                          : 'transparent'
                      }
                    />
                    <Text
                      pl={8}
                      color={
                        selectedIdxs[0] === idxParent && selectedIdxs[1] === idxSub
                          ? 'yellow.400'
                          : 'blue.600'
                      }
                    >
                      {titleSub}
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          ) : null}
        </>
      ))}
    </Flex>
  );
};

export { SidebarComponent };
