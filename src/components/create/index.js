import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Web3 from "web3";

import {
  connectSuccess,
  disconnectRequest,
} from "../../redux/authentication/authenticationActions";
import { getWalletBalance } from "../../redux/wallet/walletActions";
import tokenABI from "./tokenABI";

import { Container, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import { Constants } from "../../constants/Constants";

const Create = ({ connectSuccess, disconnectRequest, getWalletBalance }) => {
  const { t } = useTranslation();
  const [currentAccount, setCurrentAccount] = React.useState();

  const navigate = useNavigate();

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      disconnectRequest();
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
      connectSuccess({ account: accounts[0] });
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const handleWalletBalance = (eth, weth) => {
    getWalletBalance({
      eth: eth,
      weth: weth,
    });
  };

  const MetaMaskConnect = async () => {
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("chainChanged", handleChainChanged);
      const web3 = new Web3(ethereum);
      try {
        await ethereum
          .request({
            method: "eth_requestAccounts",
          })
          .then(handleAccountsChanged)
          .catch((err) => {
            if (err.code === 4001) {
              toast(t("please_connect_to_metamask"));
            } else {
              toast(t("something_went_wrong_network_to_ethereum"));
            }
          });

        const message = t("hi_there_from_infini_space");
        const accounts = await web3.eth.getAccounts();
        const signature = await web3.eth.personal.sign(message, accounts[0]);

        if (signature) {
          let formatEth, formatWeth;
          await web3.eth.getBalance(accounts[0]).then((ethBalance) => {
            formatEth = web3.utils.fromWei(ethBalance);
          });
          const tokenInst = await new web3.eth.Contract(
            tokenABI,
            Constants.TOKEN_ADDRESSES[0].address
          );
          const balance = await tokenInst.methods.balanceOf(accounts[0]).call();
          formatWeth = web3.utils.fromWei(balance);
          handleWalletBalance(formatEth, formatWeth);
          navigate("/");
        }
      } catch (err) {
        toast(t("something_went_wrong_network_to_ethereum"));
      }
    } else {
      toast(t("please_install_metamask"));
    }
  };

  return (
    <>
      <Container>
        <Row className="context">
          <Col md={4}>
            <Link to="/">
              <Button variant="primary" className="mt-4">
                {t("go_back")}
              </Button>
            </Link>
            <div className="create-context">
              <div className="context-title">{t("connect_your_wallet")}</div>
              <br />
              <div className="context-body">
                {t(
                  "connect_with_one_of_our_available_wallet_providers_or_create_a_new_one"
                )}
              </div>
              <div className="d-grid gap-2 mt-5">
                <Button
                  variant="outline-primary"
                  className="mt-4"
                  size="lg"
                  onClick={MetaMaskConnect}
                >
                  <img
                    src="/img/metamask.png"
                    className="wallet-image"
                    alt="MetaMask"
                  />
                  {t("metamask")}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </>
  );
};

Create.propTypes = {
  connectSuccess: PropTypes.func.isRequired,
  disconnectRequest: PropTypes.func.isRequired,
  getWalletBalance: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  connectSuccess,
  disconnectRequest,
  getWalletBalance,
})(Create);
