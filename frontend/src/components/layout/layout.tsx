import { Flex, Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { useScreenDetails } from '../../hooks/use-screen-details';
import { NavbarComponent } from '../navbar';
import { SidebarComponent } from '../sidebar';
import type { TLayout } from './layout.type';

const LayoutComponent: FC<TLayout> = ({ theme }) => {
  const a = 1;

  const {
    screenResolutionDetails: {
      default: { w, h },
    },
  } = useScreenDetails();
  const [isSidebarOpened, setIsSidebarOpened] = useState(() => w > 768);

  const switchSidebarState = useCallback((payload?: { state: boolean }) => {
    setIsSidebarOpened((s) => payload?.state ?? !s);
  }, []);

  // useEffect(() => {
  //   if (w > 768) {
  //     setIsSidebarOpened(true);
  //   } else {
  //     setIsSidebarOpened(false);
  //   }
  // }, [w]);

  return (
    <Grid
      h={'100%'}
      w={'100%'}
      templateRows={'auto 1fr'}
      templateColumns={isSidebarOpened ? '250px minmax(0, 1fr)' : '90px minmax(0, 1fr)'}
      templateAreas={`"nav nav"
                      "side main"`}
    >
      <GridItem
        area={'nav'}
        height={75}
        bg={'blue.25'}
        boxShadow={'0px -5px 20px -5px rgba(0,0,0,0.3)'}
        zIndex={1}
      >
        <NavbarComponent switchSidebarState={switchSidebarState} />
      </GridItem>
      <GridItem area={'side'} bg={'blue.25'}>
        <SidebarComponent isSidebarOpened={isSidebarOpened} />
      </GridItem>
      <GridItem area={'main'} bg={'white.300'} overflowX={'hidden'}>
        <SimpleGrid
          h={'max-content'}
          w={'100%'}
          spacing={10}
          py={10}
          px={10}
          minChildWidth={'350px'}
        >
          {Array.from({ length: 30 }, (el, idx) => (
            <Flex
              key={`cat-${idx}`}
              direction={'column'}
              minH={'350px'}
              bg={'blue.300'}
              borderRadius={'20px'}
            />
          ))}
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
};

export { LayoutComponent };
