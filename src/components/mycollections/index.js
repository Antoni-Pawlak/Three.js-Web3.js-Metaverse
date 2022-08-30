import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Constants } from "../../constants/Constants";

import { Row, Col, Button, Container, Card } from "react-bootstrap";
import Navbars from "../navbar";
import "./index.scss";

const Collections = ({ account }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [myCollections, setMyColllections] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${Constants.SERVER_URL}/api/collection/${account}`)
      .then((response) => {
        setMyColllections(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!account) navigate("/login");

  return (
    <>
      <Navbars />
      <div className="collection">
        <Container>
          <div className="collection-title">{t("my_collections")}</div>
          <Link to="/collection/create">
            <Button>{t("create_a_collection")}</Button>
          </Link>
          <Row>
            {myCollections.map((item, index) => {
              return (
                <Col sm={6} md={4} className="col-card" key={index}>
                  <Card bg="dark" text="light">
                    <Card.Img
                      variant="top"
                      className="card-image"
                      src={`${Constants.SERVER_URL}/collectionimage/${item.logoimage}`}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

Collections.propTypes = {
  account: PropTypes.string,
};

const mapStateToProps = (state) => ({
  account: state.authentication.account,
});

export default connect(mapStateToProps)(Collections);
