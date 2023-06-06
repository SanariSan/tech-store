import { Box, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { COLORS } from '../../chakra-setup';
import { NavbarComponent } from '../../components/navbar';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setIsSidebarOpenedUi, uiSidebarStateSelector } from '../../store';
import { DimmerContainerMemo } from '../dimmer';
import { SidebarContainerMemo } from '../sidebar';
import type { TLayout } from './layout.type';

const LayoutContainer: FC<TLayout> = ({ children }) => {
  const d = useAppDispatch();
  const isSidebarOpened = useAppSelector(uiSidebarStateSelector);
  const [bg, bgAlt, border] = [
    useColorModeValue(COLORS.white[200], COLORS.darkBlue[500]),
    useColorModeValue(COLORS.white[900], COLORS.darkBlue[600]),
    useColorModeValue(COLORS.blue[300], COLORS.darkBlue[200]),
  ];

  const [isDimmed, setIsDimmed] = useState(false);
  const sidebarToggleCb = useCallback(
    (payload?: { isOpened: boolean }) => {
      void d(setIsSidebarOpenedUi({ isOpened: payload?.isOpened ?? 'toggle' }));
      setIsDimmed((s) => payload?.isOpened ?? !s);
    },
    [d],
  );

  const dimmerCloseCb = useCallback(() => {
    sidebarToggleCb({ isOpened: false });
  }, [sidebarToggleCb]);

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
        <NavbarComponent onSidebarToggle={sidebarToggleCb} />
      </GridItem>

      <GridItem area={'main'} position={'relative'} w={'100%'} h={'100%'} overflowY={'scroll'}>
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
          zIndex={3}
        >
          <SidebarContainerMemo />
        </Box>
        <Box
          bg={bgAlt}
          overflow={'hidden'}
          position={'relative'}
          w={'auto'}
          h={'100%'}
          pl={{ base: '72px', sm: '90px' }}
        >
          <DimmerContainerMemo isDimmed={isDimmed} onClose={dimmerCloseCb} />
          {children}
        </Box>
      </GridItem>
    </Grid>
  );
};

export { LayoutContainer };
