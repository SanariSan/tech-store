import classNames from 'classnames';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Box, Button, Flex, Grid, GridItem, Square } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import style from './landing.module.scss';
import type { TLanding } from './landing.type';
import { SidebarComponent } from '../sidebar';
import { useScreenDetails } from '../../hooks/use-screen-details';

const LandingComponent: FC<TLanding> = ({ theme }) => {
  const a = 1;

  const {
    screenResolutionDetails: {
      default: { w, h },
    },
  } = useScreenDetails();
  const [isSidebarOpened, setIsSidebarOpened] = useState(() => w > 768);

  useEffect(() => {
    if (w > 768) {
      setIsSidebarOpened(true);
    } else {
      setIsSidebarOpened(false);
    }
  }, [w]);

  return (
    <Grid
      h={'100%'}
      w={'100%'}
      templateRows={'auto 1fr'}
      templateColumns={isSidebarOpened ? '250px minmax(0, 1fr)' : '90px minmax(0, 1fr)'}
      templateAreas={`"nav nav"
                      "side main"`}
      // templateRows={'repeat(12, 1fr)'}
      // templateColumns={'repeat(18, 1fr)'}
    >
      <GridItem area={'nav'} height={75} bg={'teal.200'}>
        <Square
          size={8}
          onClick={() => {
            setIsSidebarOpened((s) => !s);
          }}
        >
          {isSidebarOpened ? <CloseIcon color={'red.300'} /> : <HamburgerIcon color={'red.300'} />}
        </Square>
      </GridItem>
      <GridItem area={'side'} bg={'blue.25'}>
        <SidebarComponent isSidebarOpened={isSidebarOpened} />
      </GridItem>
      <GridItem area={'main'} bg={'blue.200'}></GridItem>
    </Grid>
  );
};

export { LandingComponent };
