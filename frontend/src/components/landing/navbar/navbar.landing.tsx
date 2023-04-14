import { Box } from '@chakra-ui/react';
import classNames from 'classnames';
import type { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { changeRoute } from '../../../containers/history-catcher';
import style from './navbar.landing.module.scss';
import type { TLandingNavbar } from './navbar.landing.type';

const LandingNavbarComponent: FC<TLandingNavbar> = ({ theme }) => {
  const a = 1;

  return (
    <Box
      w={'100%'}
      p={0}
      position={'absolute'}
      top={0}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Navbar className={classNames(style[`${theme}-alt`])} expand={false}>
        <Container fluid>
          <Navbar.Brand className={classNames(style[`${theme}`], 'fw-bold')}>
            <p
              className="ms-2"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                changeRoute('/');
              }}
            >
              Fullstack panel
            </p>
          </Navbar.Brand>
          <Navbar.Brand>
            <Button
              className="me-3"
              onClick={() => {
                changeRoute('/login');
              }}
            >
              login
            </Button>
            <Button
              className="me-3"
              onClick={() => {
                changeRoute('/register');
              }}
            >
              signup
            </Button>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </Box>
  );
};

export { LandingNavbarComponent };
