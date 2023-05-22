import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { COLORS } from '../../chakra-setup';
import { NavbarComponent } from '../../components/navbar';
import { useAppSelector } from '../../hooks/redux';
import { uiIsMobileSelector } from '../../store';
import { SidebarContainerMemo } from '../sidebar';
import type { TLayout } from './layout.type';

const LayoutContainer: FC<TLayout> = ({ children }) => {
  const isMobile = useAppSelector(uiIsMobileSelector);
  const [isSidebarOpened, setIsSidebarOpened] = useState(() => !isMobile);
  const [bg, bgAlt, border] = [
    useColorModeValue(COLORS.white[200], COLORS.darkBlue[500]),
    useColorModeValue(COLORS.white[900], COLORS.darkBlue[600]),
    useColorModeValue(COLORS.blue[300], COLORS.darkBlue[200]),
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
        borderStyle={'dashed'}
        borderColor={border}
        borderWidth={'1px'}
        borderLeft={'none'}
        borderRight={'none'}
        borderTop={'none'}
      >
        <NavbarComponent switchSidebarState={switchSidebarState} />
      </GridItem>
      <GridItem
        area={'side'}
        bg={bg}
        borderStyle={'dashed'}
        borderColor={border}
        borderWidth={'1px'}
        borderLeft={'none'}
        borderTop={'none'}
        borderBottom={'none'}
        // chrome places visible scrollbar on pc even when no overflow, so mobile only
        overflowY={{ base: 'scroll', lg: 'hidden' }}
      >
        <SidebarContainerMemo isSidebarOpened={isSidebarOpened} />
      </GridItem>
      <GridItem area={'main'} bg={bgAlt} overflow={'hidden'} position={'relative'}>
        {children}
      </GridItem>
    </Grid>
  );
};

export { LayoutContainer };
