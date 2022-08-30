import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Constants } from "../../constants/Constants";

import { Button, Form, Container } from "react-bootstrap";
import Navbars from "../navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

const Setting = ({ account }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [userSetting, setUserSetting] = React.useState({
    publicaddress: account,
    itemSold: false,
    bidActivity: false,
    priceChange: false,
    auctionExpiration: false,
    outBid: false,
    ownedItemUpdateds: false,
    successfulPurchase: false,
    infiniNewsletter: false,
  });

  React.useEffect(() => {
    if (!account) navigate("/login");
    axios
      .get(`${Constants.SERVER_URL}/api/setting/${account}`)
      .then((response) => {
        const settingData = response.data;
        if (settingData) setUserSetting(settingData);
      })
      .catch((error) => {
        console.log(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandleChange = (e) => {
    setUserSetting({ ...userSetting, [e.target.name]: e.target.checked });
  };

  const onSave = (e) => {
    e.preventDefault();
    axios
      .post(`${Constants.SERVER_URL}/api/setting/`, userSetting)
      .then(() => {
        toast.success(t("save_success"), { theme: "dark" });
      })
      .catch((error) => toast.error(t("error"), { theme: "dark" }));
  };

  return (
    <>
      <Navbars />
      <div className="wallet-collection">
        <Container>
          <div className="collection-title">{t("setting")}</div>
          <Form>
            <Form.Check
              type="switch"
              key="switch1"
              labelfor="switch1"
              id="switch1"
              label={t("item_sold")}
              className="mb-3"
              name="itemSold"
              checked={userSetting.itemSold}
              onChange={onHandleChange}
            />
            <Form.Check
              type="switch"
              key="switch2"
              labelfor="switch2"
              id="switch2"
              label={t("bid_activity")}
              className="mb-3"
              name="bidActivity"
              checked={userSetting.bidActivity}
              onChange={onHandleChange}
            />
            <Form.Check
              type="switch"
              key="switch3"
              labelfor="switch3"
              id="switch3"
              label={t("price_change")}
              className="mb-3"
              name="priceChange"
              checked={userSetting.priceChange}
              onChange={onHandleChange}
            />
            <Form.Check
              type="switch"
              key="switch4"
              labelfor="switch4"
              id="switch4"
              label={t("auction_expiration")}
              className="mb-3"
              name="auctionExpiration"
              checked={userSetting.auctionExpiration}
              onChange={onHandleChange}
            />
            <Form.Check
              type="switch"
              key="switch5"
              labelfor="switch5"
              id="switch5"
              label="Outbid"
              className="mb-3"
              name="outBid"
              checked={userSetting.outBid}
              onChange={onHandleChange}
            />
            <Form.Check
              type="switch"
              key="switch6"
              labelfor="switch6"
              id="switch6"
              label={t("owned_item_updates")}
              className="mb-3"
              name="ownedItemUpdateds"
              checked={userSetting.ownedItemUpdateds}
              onChange={onHandleChange}
            />
            <Form.Check
              type="switch"
              key="switch7"
              labelfor="switch7"
              id="switch7"
              label={t("successful_purchase")}
              className="mb-3"
              name="successfulPurchase"
              checked={userSetting.successfulPurchase}
              onChange={onHandleChange}
            />
            <Form.Check
              type="switch"
              key="switch8"
              labelfor="switch8"
              id="switch8"
              label={t("infini_newsletter")}
              className="mb-5"
              name="infiniNewsletter"
              checked={userSetting.infiniNewsletter}
              onChange={onHandleChange}
            />
          </Form>
          <Button onClick={onSave}>{t("save")}</Button>
        </Container>
      </div>
      <ToastContainer />
    </>
  );
};

Setting.propTypes = {
  account: PropTypes.string,
};

const mapStateToProps = (state) => ({
  account: state.authentication.account,
});

export default connect(mapStateToProps)(Setting);
