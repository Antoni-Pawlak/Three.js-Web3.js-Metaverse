import React from "react";

import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Badge,
  Carousel,
  Image,
} from "react-bootstrap";
import Navbars from "../navbar";
import "./index.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navbars />
      <div className="top">
        <Container>
          <Row>
            <Col md={6}>
              <div className="top-title top-card">
                {t("welcome_to_infini_space")}
              </div>
              <br />
              <div className="top-text">{t("infini_space_is_the_world")}</div>
              <br />
              <Button size="lg" className="explore-button">
                {t("explore")}
              </Button>
              <Button variant="outline-light" size="lg">
                {t("create")}
              </Button>
              <div className="top-learn">
                <Badge pill bg="info">
                  {t("new")}
                </Badge>
                <div className="badge">
                  {t("learn_more_about_infini_space")}
                </div>
              </div>
            </Col>
            <Col md={6}>
              <Link to="/room1" className="link">
                <Card bg="dark" text="light" className="top-card">
                  <Card.Img
                    variant="top"
                    src="img/room1.png"
                    className="home-card-image"
                  />
                  <Card.Body>
                    <Card.Title>MVP room</Card.Title>
                    <Card.Text>
                      <Image
                        src="img/avatar.jpg"
                        roundedCircle={true}
                        className="avatar"
                      />
                      This presentation’s goal is to show the concept of the
                      InfiniSpace® Project. This is not the desired final look/
                      design, but instead a representation of the
                      functionalities we want build in the final product.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="content">
        <div className="content-top">{t("notable_drops")}</div>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Carousel touch={true}>
              <Carousel.Item>
                <Link to="/room1" className="link">
                  <Card>
                    <Card.Img
                      variant="top"
                      src="img/room1.png"
                      className="home-card-image"
                    />
                    <Card.Body>
                      <Card.Title>MVP room</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Carousel.Item>
              <Carousel.Item>
                <Link to="/room2" className="link">
                  <Card>
                    <Card.Img
                      variant="top"
                      src="img/room2.png"
                      className="home-card-image"
                    />
                    <Card.Body>
                      <Card.Title>MVP room</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Carousel.Item>
              <Carousel.Item>
                <Link to="/room3" className="link">
                  <Card>
                    <Card.Img
                      variant="top"
                      src="img/room3.png"
                      className="home-card-image"
                    />
                    <Card.Body>
                      <Card.Title>MVP room</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Carousel.Item>
              <Carousel.Item>
                <Link to="/room4" className="link">
                  <Card>
                    <Card.Img
                      variant="top"
                      src="img/room4.png"
                      className="home-card-image"
                    />
                    <Card.Body>
                      <Card.Title>MVP room</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <div className="content-top">{t("most_popular")}</div>
        <Row>
          <Col md={4} className="col-card">
            <Link to="/room1" className="link">
              <Card bg="dark" text="light">
                <Card.Img
                  variant="top"
                  src="img/room1.png"
                  className="home-card-image"
                />
                <Card.Body>
                  <Card.Title>MVP room</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={4} className="col-card">
            <Link to="/room2" className="link">
              <Card bg="dark" text="light">
                <Card.Img
                  variant="top"
                  src="img/room2.png"
                  className="home-card-image"
                />
                <Card.Body>
                  <Card.Title>MVP room</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={4} className="col-card">
            <Link to="/room3" className="link">
              <Card bg="dark" text="light">
                <Card.Img
                  variant="top"
                  src="img/room3.png"
                  className="home-card-image"
                />
                <Card.Body>
                  <Card.Title>MVP room</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={4} className="col-card">
            <Link to="/room4" className="link">
              <Card bg="dark" text="light">
                <Card.Img
                  variant="top"
                  src="img/room4.png"
                  className="home-card-image"
                />
                <Card.Body>
                  <Card.Title>MVP room</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
