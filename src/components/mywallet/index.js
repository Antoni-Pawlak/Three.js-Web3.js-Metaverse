import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Container, Table } from "react-bootstrap";
import Navbars from "../navbar";
import "./index.scss";

const MyWallet = ({ account, wallet }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!account) navigate("/login");

  return (
    <>
      <Navbars />
      <div className="wallet-collection">
        <Container>
          <div className="collection-title">{t("my_wallet")}</div>
          {wallet ? (
            <Table striped bordered hover className="wallet-table">
              <thead>
                <tr>
                  <th>{t("eth")}</th>
                  <th>{t("weth")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{wallet.eth}</td>
                  <td>{wallet.weth}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <></>
          )}
        </Container>
      </div>
    </>
  );
};

MyWallet.propTypes = {
  wallet: PropTypes.object,
  account: PropTypes.string,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  account: state.authentication.account,
});

export default connect(mapStateToProps)(MyWallet);
