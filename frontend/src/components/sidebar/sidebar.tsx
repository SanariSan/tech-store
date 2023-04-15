import { ChevronDownIcon, ChevronUpIcon, QuestionIcon, SettingsIcon } from '@chakra-ui/icons';
import { Box, Circle, Flex, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { SIDEBAR_TEMPLATE } from './sidebar.const';

interface ISidebarComponent {
  isSidebarOpened: boolean;
}

const SidebarComponent: FC<ISidebarComponent> = ({
  isSidebarOpened,
}: {
  isSidebarOpened: boolean;
}) => {
  // const [selectedIdxs, setSelectedIdxs] = useState([0, -1]);
  const [selectedIdxs, setSelectedIdxs] = useState({
    parent: 0,
    sub: -1,
  });
  const [unfoldedIdxs, setUnfoldedIdxs] = useState(new Set<number>());
  const isActive = useRef(true);

  useEffect(
    () => () => {
      isActive.current = false;
    },
    [],
  );

  const updateSelectedIdxs = useCallback(
    ({ parent, sub = -1 }: { parent: number; sub?: number }) => {
      setSelectedIdxs({ parent, sub });
    },
    [],
  );

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
    <Flex
      direction={'column'}
      justifyContent={'space-between'}
      gap={0}
      w={'100%'}
      h={'100%'}
      py={3}
    >
      <Flex direction={'column'} alignItems={'flex-start'} gap={0} w={'100%'} py={6} pr={2}>
        {SIDEBAR_TEMPLATE.map(({ icon: Icon, title, sub }, idxParent) => (
          <Fragment key={`side-p-${idxParent}`}>
            <Flex
              w={'100%'}
              h={'50px'}
              direction={'row'}
              bg={selectedIdxs.parent === idxParent ? 'white.300' : 'transparent'}
              _hover={{
                bg: selectedIdxs.parent === idxParent ? 'white.300' : 'white.400',
              }}
              borderRadius={'0 25px 25px 0'}
              cursor={'pointer'}
            >
              <Box
                opacity={selectedIdxs.parent === idxParent ? 1 : 0}
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
                  updateSelectedIdxs({ parent: idxParent });
                }}
              >
                <Icon
                  boxSize={10}
                  pl={5}
                  color={selectedIdxs.parent === idxParent ? 'yellow.400' : 'blue.500'}
                  _hover={{
                    color: selectedIdxs.parent === idxParent ? 'yellow.400' : 'blue.600',
                  }}
                />
                <Text pl={5} opacity={isSidebarOpened ? 1 : 0}>
                  {title}
                </Text>
                {sub !== null ? (
                  <Box
                    ml={'auto'}
                    mr={5}
                    opacity={isSidebarOpened ? 1 : 0}
                    onClick={() => {
                      if (unfoldedIdxs.has(idxParent)) {
                        collapse(idxParent);
                      } else {
                        unfold(idxParent);
                      }
                    }}
                  >
                    <Circle size={'18px'} border={'2px'} borderColor={'blue.300'}>
                      {unfoldedIdxs.has(idxParent) ? (
                        <ChevronUpIcon color={'blue.400'} />
                      ) : (
                        <ChevronDownIcon color={'blue.400'} />
                      )}
                    </Circle>
                  </Box>
                ) : null}
              </Flex>
            </Flex>
            {sub !== null ? (
              <Flex
                direction={'column'}
                width={'100%'}
                pl={10}
                overflow={'hidden'}
                maxH={
                  isSidebarOpened && unfoldedIdxs.has(idxParent) ? `${sub.length * 50}px` : '0px'
                }
              >
                {sub.map(({ title: titleSub }, idxSub) => (
                  <Flex
                    key={`side-p-${idxParent}-c-${idxSub}`}
                    position={'relative'}
                    h={'50px'}
                    minH={'50px'}
                    direction={'row'}
                    alignItems={'center'}
                    cursor={'pointer'}
                    onClick={() => {
                      updateSelectedIdxs({ parent: idxParent, sub: idxSub });
                    }}
                  >
                    <Box position={'absolute'} left={0} w={'2px'} h={'100%'} bg={'blue.500'} />
                    <Flex h={'100%'} direction={'row'} alignItems={'center'}>
                      <Box
                        position={'absolute'}
                        w={'3px'}
                        h={'50%'}
                        bg={
                          selectedIdxs.parent === idxParent && selectedIdxs.sub === idxSub
                            ? 'yellow.400'
                            : 'transparent'
                        }
                      />
                      <Text
                        pl={8}
                        opacity={isSidebarOpened ? 1 : 0}
                        color={
                          selectedIdxs.parent === idxParent && selectedIdxs.sub === idxSub
                            ? 'yellow.400'
                            : 'blue.600'
                        }
                        _hover={{
                          color:
                            selectedIdxs.parent === idxParent && selectedIdxs.sub === idxSub
                              ? 'yellow.400'
                              : 'yellow.300',
                        }}
                      >
                        {titleSub}
                      </Text>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            ) : null}
          </Fragment>
        ))}
      </Flex>

      <Flex direction={'column'} alignItems={'flex-start'} gap={0} w={'100%'} py={3} px={3}>
        <Flex
          w={'100%'}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          borderRadius={'0 25px 25px 0'}
          cursor={'pointer'}
          _hover={{
            bg: 'white.400',
          }}
        >
          <SettingsIcon
            boxSize={10}
            pl={5}
            color={'blue.500'}
            _hover={{
              color: 'blue.600',
            }}
          />
          <Text pl={5} opacity={isSidebarOpened ? 1 : 0}>
            Settings
          </Text>
        </Flex>

        <Flex
          w={'100%'}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          borderRadius={'0 25px 25px 0'}
          cursor={'pointer'}
          _hover={{
            bg: 'white.400',
          }}
        >
          <QuestionIcon
            boxSize={10}
            pl={5}
            color={'blue.500'}
            _hover={{
              color: 'blue.600',
            }}
          />
          <Text pl={5} opacity={isSidebarOpened ? 1 : 0}>
            Help
          </Text>
        </Flex>
        {/*  */}
      </Flex>
    </Flex>
  );
};

export { SidebarComponent };
