import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { disconnectRequest } from "../../redux/authentication/authenticationActions";

import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import "./index.scss";

const Navbars = ({ account, isLogin, disconnectRequest }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const onDisconnectionClick = () => {
    disconnectRequest();
  };

  const onProfileClick = () => {
    navigate(`/profile/@${account}`);
  };

  const onShortText = (text) => {
    text =
      text.length > 10
        ? text.substr(0, 4) + " . . ." + text.substr(-3, 3)
        : text;

    return text;
  };

  const onEnglishClick = () => {
    i18n.changeLanguage("eg");
  };

  const onPortugueseClick = () => {
    i18n.changeLanguage("pt");
  };

  const onHomeClick = () => {
    navigate("/");
  };

  const onMyCollectionClick = () => {
    navigate("/collections");
  };

  const onCreateClick = () => {
    navigate("/nft/create");
  };

  const onMyWalletClick = () => {
    navigate("/mywallet");
  };

  const onBuyRoomClick = () => {
    navigate("/buyroom");
  };

  const onMyRoomClick = () => {
    navigate("/myroom");
  };
  const onSettingClick = () => {
    navigate("/setting");
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <img src="/logo.png" alt="Logo"></img>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title={t("language")} className="navdropdown">
                <NavDropdown.Item onClick={onEnglishClick}>
                  {t("english")}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onPortugueseClick}>
                  {t("portuguese")}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link onClick={onHomeClick}>{t("home")}</Nav.Link>
              <Nav.Link href="">{t("about")}</Nav.Link>
              <Nav.Link href="">{t("explore")}</Nav.Link>
              {isLogin ? (
                <NavDropdown
                  title={onShortText(account)}
                  id="navbarScrollingDropdown"
                  className="navdropdown"
                >
                  <NavDropdown.Item onClick={onProfileClick}>
                    {t("edit_profile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={onCreateClick}>
                    {t("create_nft")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={onMyCollectionClick}>
                    {t("my_collections")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={onBuyRoomClick}>
                    {t("buy_room")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={onMyRoomClick}>
                    {t("my_rooms")}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={onMyWalletClick}>
                    {t("my_wallet")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={onSettingClick}>
                    {t("setting")}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={onDisconnectionClick}>
                    {t("disconnect")}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/login">
                  <Button>{t("login")}</Button>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

Navbars.propTypes = {
  account: PropTypes.string,
  signature: PropTypes.bool,
  isLogin: PropTypes.bool,
  disconnectRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.authentication.account,
  signature: state.authentication.signature,
  isLogin: state.authentication.isLogin,
});

export default connect(mapStateToProps, { disconnectRequest })(Navbars);
