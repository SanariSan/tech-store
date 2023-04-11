import classNames from 'classnames';
import type { FC } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { changeRoute } from '../../containers/history-catcher';
import style from './landing.module.scss';
import type { TLanding } from './landing.type';
import { request } from '../../services';

const fetchD = async () => {
  try {
    const response: Response = await request({
      // url: 'https://eo5hsw60kt92p98.m.pipedream.net/?text=4242422&status=warehouse',
      url: 'http://45.89.66.175:80/?text=4242422&status=warehouse',
      timeoutMS: 999_999,
      method: 'GET',
    });
    const parsedJsonResponse: unknown = await response.clone().json();

    const text = (await response.clone().text()).slice(200);
    console.error(parsedJsonResponse);
    console.error(text);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const LandingComponent: FC<TLanding> = ({ theme }) => (
  // const [d, setD] = useState();

  <Container
    fluid
    className={classNames('h-100 d-flex align-items-center justify-content-center', style[theme])}
  >
    <Row className="w-100 mt-4">
      <Col xs={12} className="d-flex justify-content-center">
        <Button
          className="me-2"
          onClick={() => {
            void fetchD();
          }}
        >
          fetch
        </Button>
        {/* <textarea value={d}></textarea> */}
      </Col>
    </Row>
  </Container>
);
export { LandingComponent };
