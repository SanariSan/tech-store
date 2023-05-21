import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { NavbarComponent } from '../../components/navbar';
import { useScreenDetails } from '../../hooks/use-screen-details';
import { SidebarContainerMemo } from '../sidebar';
import type { TLayout } from './layout.type';
import { COLORS_MAP_DARK, COLORS_MAP_LIGHT } from '../../chakra-setup';

const LayoutContainer: FC<TLayout> = ({ children }) => {
  const {
    screenResolutionDetails: {
      default: { w },
    },
  } = useScreenDetails();
  const [isSidebarOpened, setIsSidebarOpened] = useState(() => w > 768);
  const [bg, bgAlt] = [
    useColorModeValue(COLORS_MAP_LIGHT.bg, COLORS_MAP_DARK.bg),
    useColorModeValue(COLORS_MAP_LIGHT.bgAlt, COLORS_MAP_DARK.bgAlt),
  ];

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
        bg={bg}
        boxShadow={'0px -5px 20px -5px rgba(0,0,0,0.3)'}
        zIndex={1}
      >
        <NavbarComponent switchSidebarState={switchSidebarState} />
      </GridItem>
      <GridItem area={'side'} bg={bg}>
        <SidebarContainerMemo isSidebarOpened={isSidebarOpened} />
      </GridItem>
      <GridItem area={'main'} bg={bgAlt} overflow={'hidden'} position={'relative'}>
        {children}
      </GridItem>
    </Grid>
  );
};

export { LayoutContainer };
