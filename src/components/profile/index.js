import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Row,
  Col,
  Button,
  Image,
  Form,
  InputGroup,
  FormControl,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FaTwitter,
  FaInstagram,
  FaPager,
  FaRegCopy,
  FaInfoCircle,
} from "react-icons/fa";
import Font from "react-font";
import Upload from "rc-upload";
import "./index.scss";
import { Constants } from "../../constants/Constants";

const Profile = ({ account }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!account) navigate("/login");

  const [user, setUser] = React.useState({
    publicaddress: account,
    username: "",
    bio: "",
    email: "",
    twitter: "",
    instagram: "",
    mysite: "",
    profileimage: "profileimage.jpg",
  });

  React.useEffect(() => {
    axios
      .get(`${Constants.SERVER_URL}/api/users/${account}`)
      .then((response) => {
        const userData = response.data;
        userData.twitter = userData.links.twitter;
        userData.instagram = userData.links.instagram;
        userData.mysite = userData.links.mysite;
        setUser(userData);
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(account);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUploadSuccess = (body) => {
    setUser({ ...user, profileimage: body });
  };

  const onSave = (e) => {
    e.preventDefault();
    axios
      .post(`${Constants.SERVER_URL}/api/users/`, user)
      .then(() => {
        toast.success(t("save_success"), { theme: "dark" });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <div className="profile">
        <Font family="Poppins">
          <Row>
            <Col md={2}></Col>
            <Col md={6}>
              <Link to="/">
                <Button>{t("go_back")}</Button>
              </Link>
              <div className="title">{t("profile_setting")}</div>
              <Row>
                <Col md={6}>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("username")}</Form.Label>
                      <Form.Control
                        name="username"
                        type="text"
                        placeholder={t("enter_username")}
                        onChange={onChange}
                        value={user.username}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("bio")}</Form.Label>
                      <Form.Control
                        name="bio"
                        as="textarea"
                        rows={4}
                        placeholder={t("tell_the_world_your_story")}
                        onChange={onChange}
                        value={user.bio}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("email_address")}</Form.Label>
                      <Form.Control
                        name="email"
                        type="text"
                        placeholder={t("enter_email")}
                        onChange={onChange}
                        value={user.email}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Group className="mb-3">
                        <Form.Label>{t("links")}</Form.Label>
                        <ListGroup>
                          <ListGroup.Item>
                            <Row className="link">
                              <Col md={1}>
                                <FaTwitter />
                              </Col>
                              <Col md={11}>
                                <FormControl
                                  name="twitter"
                                  className="link-input"
                                  placeholder={t("yourtwitterhandle")}
                                  onChange={onChange}
                                  value={user.twitter}
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
                                  className="link-input"
                                  placeholder={t("yourinstagramhandle")}
                                  onChange={onChange}
                                  value={user.instagram}
                                />
                              </Col>
                            </Row>
                          </ListGroup.Item>
                          <ListGroup.Item className="link">
                            <Row className="link">
                              <Col md={1}>
                                <FaPager />
                              </Col>
                              <Col>
                                <FormControl
                                  name="mysite"
                                  className="link-input"
                                  placeholder={t("yoursite.io")}
                                  onChange={onChange}
                                  value={user.mysite}
                                />
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      </Form.Group>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>{t("wallet_address")}</Form.Label>
                      <InputGroup>
                        <Form.Control
                          value={user.publicaddress}
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                          readOnly
                        />
                        <OverlayTrigger
                          placement="top"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              {t("copied!")}
                            </Tooltip>
                          }
                          trigger={["focus"]}
                        >
                          <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            onClick={copyCodeToClipboard}
                          >
                            <FaRegCopy />
                          </Button>
                        </OverlayTrigger>
                      </InputGroup>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={1}></Col>
                <Col md={5}>
                  <div>
                    {t("profile_image")}
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip>{t("recommended_350pxx_x_350px")}</Tooltip>
                      }
                    >
                      <button className="info-button">
                        <FaInfoCircle />
                      </button>
                    </OverlayTrigger>
                  </div>

                  <Upload
                    onSuccess={handleUploadSuccess}
                    action={`${Constants.SERVER_URL}/api/upload`}
                    method="post"
                  >
                    <Image
                      src={`${Constants.SERVER_URL}/profileimage/${user.profileimage}`}
                      roundedCircle
                      className="avatar-image"
                    />
                  </Upload>
                </Col>
              </Row>
              <Button className="mt-5 mb-5" onClick={onSave}>
                {t("save")}
              </Button>
            </Col>
          </Row>
        </Font>
      </div>
      <ToastContainer />
    </>
  );
};

Profile.propTypes = {
  account: PropTypes.string,
};

const mapStateToProps = (state) => ({
  account: state.authentication.account,
});

export default connect(mapStateToProps)(Profile);
