import { Box, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { COLORS } from '../../chakra-setup';
import { NavbarComponent } from '../../components/navbar';
import { useAppSelector } from '../../hooks/redux';
import { uiIsMobileSelector } from '../../store';
import { SidebarContainerMemo } from '../sidebar';
import type { TLayout } from './layout.type';
import { DimmerContainerMemo } from '../dimmer';

const LayoutContainer: FC<TLayout> = ({ children }) => {
  const isMobile = useAppSelector(uiIsMobileSelector);
  const [isSidebarOpened, setIsSidebarOpened] = useState(() => !isMobile);
  const [bg, bgAlt, border] = [
    useColorModeValue(COLORS.white[200], COLORS.darkBlue[500]),
    useColorModeValue(COLORS.white[900], COLORS.darkBlue[600]),
    useColorModeValue(COLORS.blue[300], COLORS.darkBlue[200]),
  ];

  const [isDimmed, setIsDimmed] = useState(false);
  const switchSidebarState = useCallback((payload?: { state: boolean }) => {
    setIsSidebarOpened((s) => payload?.state ?? !s);
    setIsDimmed((s) => payload?.state ?? !s);
  }, []);
  const onDimmerClose = useCallback(() => {
    switchSidebarState({ state: false });
  }, [switchSidebarState]);

  return (
    <Grid
      h={'100%'}
      maxH={'100%'}
      w={'100%'}
      templateRows={'auto 1fr'}
      templateColumns="minmax(0, 1fr)"
      templateAreas={`"nav"
                    "main"`}
    >
      <GridItem
        area={'nav'}
        w={'100%'}
        h={75}
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

      <GridItem area={'main'} position={'relative'} w={'100%'} h={'100%'}>
        <Box
          bg={bg}
          borderStyle={'dashed'}
          borderColor={border}
          borderWidth={'1px'}
          borderLeft={'none'}
          borderTop={'none'}
          borderBottom={'none'}
          // chrome places visible scrollbar on pc even when no overflow, so mobile only
          overflowY={{ base: 'scroll', lg: 'hidden' }}
          position={'absolute'}
          w={{
            base: isSidebarOpened ? '200px' : '72px',
            sm: isSidebarOpened ? '250px' : '90px',
          }}
          h={'100%'}
          transition={'width 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)'}
          zIndex={2}
        >
          <SidebarContainerMemo isSidebarOpened={isSidebarOpened} />
        </Box>
        <Box
          bg={bgAlt}
          overflow={'hidden'}
          position={'relative'}
          w={'auto'}
          h={'100%'}
          pl={{ base: '72px', sm: '90px' }}
        >
          <DimmerContainerMemo isDimmed={isDimmed} onClose={onDimmerClose} />
          {children}
        </Box>
      </GridItem>
    </Grid>
  );
};

export { LayoutContainer };
