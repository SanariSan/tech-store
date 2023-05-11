import { Grid, GridItem } from '@chakra-ui/react';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { NavbarComponent } from '../../components/navbar';
import { useScreenDetails } from '../../hooks/use-screen-details';
import { SidebarContainerMemo } from '../sidebar';
import type { TLayout } from './layout.type';

const LayoutContainer: FC<TLayout> = ({ children }) => {
  const {
    screenResolutionDetails: {
      default: { w },
    },
  } = useScreenDetails();
  const [isSidebarOpened, setIsSidebarOpened] = useState(() => w > 768);

  const switchSidebarState = useCallback((payload?: { state: boolean }) => {
    setIsSidebarOpened((s) => payload?.state ?? !s);
  }, []);

  return (
    <Grid
      h={'100%'}
      maxH={'100%'}
      w={'100%'}
      templateRows={'auto 1fr'}
      templateColumns={{
        base: isSidebarOpened ? '200px minmax(0, 1fr)' : '72px minmax(0, 1fr)',
        sm: isSidebarOpened ? '250px minmax(0, 1fr)' : '90px minmax(0, 1fr)',
      }}
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
        <SidebarContainerMemo isSidebarOpened={isSidebarOpened} />
      </GridItem>
      <GridItem area={'main'} bg={'white.900'} overflow={'hidden'}>
        {children}
      </GridItem>
    </Grid>
  );
};

export { LayoutContainer };
