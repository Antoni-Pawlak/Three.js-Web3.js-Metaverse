import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Constants } from "../../constants/Constants";

import {
  Row,
  Col,
  Button,
  Image,
  Form,
  FormControl,
  ListGroup,
  Container,
} from "react-bootstrap";
import Navbars from "../navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaInstagram,
  FaDiscord,
  FaMediumM,
  FaTelegramPlane,
  FaPager,
} from "react-icons/fa";
import Upload from "rc-upload";
import "./index.scss";

const CreateCollection = ({ account }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [collection, setCollection] = React.useState({
    publicaddress: account,
    logoimage: "",
    bannerimage: "",
    featuredimage: "",
    name: "",
    url: "",
    description: "",
    mysite: "",
    instagram: "",
    discord: "",
    telegram: "",
    medium: "",
    royalties: 0,
  });

  if (!account) navigate("/login");

  const onChange = (e) => {
    setCollection({ ...collection, [e.target.name]: e.target.value });
  };

  const handleUploadSuccess = (body, name) => {
    setCollection({ ...collection, [name]: body });
  };

  const onCreate = (e) => {
    e.preventDefault();
    axios
      .post(`${Constants.SERVER_URL}/api/collection/`, collection)
      .then(() => {
        toast.success(t("save_success"), { theme: "dark" });
      })
      .catch((err) => {
        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((element) => {
            toast.error(element.msg, { theme: "dark" });
          });
        }
      });
  };

  return (
    <>
      <Navbars />
      <div className="collection">
        <Container>
          <div className="collection-title">{t("create_a_collection")}</div>
          <Row>
            <div>{t("logo_image")}</div>
            <div>
              <Upload
                onSuccess={(body) => handleUploadSuccess(body, "logoimage")}
                action={`${Constants.SERVER_URL}/api/upload/collection`}
                method="post"
              >
                <Image
                  src={
                    collection.logoimage
                      ? `${Constants.SERVER_URL}/collectionimage/${collection.logoimage}`
                      : "/img/logoimage.png"
                  }
                  roundedCircle
                  className="logo-image"
                />
              </Upload>
            </div>
          </Row>
          <Row>
            <div>{t("banner_image")}</div>
            <div>
              <Upload
                onSuccess={(body) => handleUploadSuccess(body, "bannerimage")}
                action={`${Constants.SERVER_URL}/api/upload/collection`}
                method="post"
              >
                <Image
                  src={
                    collection.bannerimage
                      ? `${Constants.SERVER_URL}/collectionimage/${collection.bannerimage}`
                      : "/img/bannerimage.png"
                  }
                  rounded
                  className="featured-image"
                />
              </Upload>
            </div>
          </Row>
          <Row>
            <div>{t("featured_image")}</div>
            <div>
              <Upload
                onSuccess={(body) => handleUploadSuccess(body, "featuredimage")}
                action={`${Constants.SERVER_URL}/api/upload/collection`}
                method="post"
              >
                <Image
                  src={
                    collection.featuredimage
                      ? `${Constants.SERVER_URL}/collectionimage/${collection.featuredimage}`
                      : "/img/featuredimage.png"
                  }
                  rounded
                  className="banner-image"
                />
              </Upload>
            </div>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>{t("name")}</Form.Label>
              <Form.Control
                name="name"
                value={collection.name}
                type="text"
                placeholder={t("example_treasure_of_the_sea")}
                onChange={onChange}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>{t("url")}</Form.Label>
              <Form.Control
                name="url"
                value={collection.url}
                type="text"
                placeholder={
                  "https://opensea.io/collection/treasures-of-the-sea"
                }
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("description")}</Form.Label>

              <Form.Control
                name="description"
                value={collection.description}
                as="textarea"
                rows={4}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("links")}</Form.Label>
              <ListGroup>
                <ListGroup.Item className="link">
                  <Row className="link">
                    <Col md={1}>
                      <FaPager />
                    </Col>
                    <Col>
                      <FormControl
                        name="mysite"
                        value={collection.mysite}
                        className="link-input"
                        placeholder={t("yoursite.io")}
                        onChange={onChange}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="link">
                  <Row className="link">
                    <Col md={1}>
                      <FaInstagram />
                    </Col>
                    <Col>
                      <FormControl
                        name="instagram"
                        value={collection.instagram}
                        className="link-input"
                        placeholder={
                          "https://www.instagram.com/YourInstagramHandle"
                        }
                        onChange={onChange}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="link">
                  <Row className="link">
                    <Col md={1}>
                      <FaDiscord />
                    </Col>
                    <Col>
                      <FormControl
                        name="discord"
                        value={collection.discord}
                        className="link-input"
                        placeholder={"https://discord.gg/abcdef"}
                        onChange={onChange}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="link">
                  <Row className="link">
                    <Col md={1}>
                      <FaTelegramPlane />
                    </Col>
                    <Col>
                      <FormControl
                        name="telegram"
                        value={collection.telegram}
                        className="link-input"
                        placeholder={"https://t.me/abcdef"}
                        onChange={onChange}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="link">
                  <Row className="link">
                    <Col md={1}>
                      <FaMediumM />
                    </Col>
                    <Col>
                      <FormControl
                        name="medium"
                        value={collection.medium}
                        className="link-input"
                        placeholder={"https://www.medium.com/@YourMediumHandle"}
                        onChange={onChange}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-5">
              <Form.Label>{t("royalties")}</Form.Label>
              <Form.Control
                name="royalties"
                type="text"
                value={collection.royalties}
                placeholder={t("e.g._2.5")}
                onChange={onChange}
              />
            </Form.Group>
          </Row>
          <Button onClick={onCreate}>{t("create")}</Button>
        </Container>
      </div>
      <ToastContainer />
    </>
  );
};

CreateCollection.propTypes = {
  account: PropTypes.string,
};

const mapStateToProps = (state) => ({
  account: state.authentication.account,
});

export default connect(mapStateToProps)(CreateCollection);
