import React, { useState } from "react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Constants } from "../../constants/Constants";

import { Row, Button, Image, Form, Container } from "react-bootstrap";
import Navbars from "../navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Upload from "rc-upload";
import "./index.scss";

const CreateAsset = ({ account }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const blockchain = useSelector((state) => state.blockchain);
  const [createNFTLoading, setCreateNFTLoading] = useState(false);

  const [nft, setNft] = React.useState({
    filename: "",
    name: "",
    externallink: "",
    description: "",
    type: "",
  });

  if (!account) navigate("/login");

  const onChange = (e) => {
    setNft({ ...nft, [e.target.name]: e.target.value });
  };

  const handleUploadSuccess = async (body) => {
    setNft({ ...nft, filename: body });
  };

  const onCreate = async (e) => {
    e.preventDefault();

    setCreateNFTLoading(true);
    axios
      .post(`${Constants.SERVER_URL}/api/nft/`, nft)
      .then(async (response) => {
        onMint(response.data.IpfsHash);
      })
      .catch((error) => {
        toast.error(t("ipfs_uploading_failed"), { theme: "dark" });
        setCreateNFTLoading(false);
      });
  };

  const onMint = async (IpfsHash) => {
    await blockchain.web3Alchemy.eth.accounts.wallet.add(
      Constants.ACCOUNT_PRIVATE_KEY
    );
    const ownerAccount = blockchain.web3Alchemy.eth.accounts.wallet[0].address;

    blockchain.smartContract.methods
      .mint(account, IpfsHash)
      .send({
        gasLimit: 285000,
        to: Constants.NFT_CONTRACT_ADDRESS,
        from: ownerAccount,
      })
      .once("error", (err) => {
        console.log(err);
        setCreateNFTLoading(false);
        toast.error(t("mint_failed"), { theme: "dark" });
      })
      .then((receipt) => {
        console.log(receipt);
        setCreateNFTLoading(false);
        toast.success(t("mint_success"), { theme: "dark" });
      });
  };

  return (
    <>
      <Navbars />
      <div className="collection">
        <Container>
          <div className="collection-title">{t("create_new_item")}</div>
          <Row>
            <div>{t("image")}</div>
            <div>
              <Upload
                onSuccess={(body) => handleUploadSuccess(body, "bannerimage")}
                action={`${Constants.SERVER_URL}/api/upload/nft`}
                method="post"
              >
                {nft.filename.split(".").pop().toLowerCase() === "gltf" ? (
                  <model-viewer
                    id="mv-demo"
                    src={`${Constants.SERVER_URL}/nft/${nft.filename}`}
                    alt="A 3D model of an astronaut"
                    auto-rotate
                    camera-controls
                    poster="/img/loading.gif"
                  ></model-viewer>
                ) : (
                  <Image
                    src={
                      nft.filename
                        ? `${Constants.SERVER_URL}/nft/${nft.filename}`
                        : "/img/bannerimage.png"
                    }
                    rounded
                    className="featured-image"
                  />
                )}
              </Upload>
            </div>
            <div></div>
          </Row>
          <Row>
            <Form.Group className="mt-5 mb-3">
              <Form.Label>{t("name")}</Form.Label>
              <Form.Control
                name="name"
                value={nft.name}
                type="text"
                placeholder={t("item_name")}
                onChange={onChange}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>{"External link"}</Form.Label>
              <Form.Control
                name="externallink"
                value={nft.externallink}
                type="text"
                placeholder={"https://yoursite.io/item/123"}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-5">
              <Form.Label>{"Description"}</Form.Label>

              <Form.Control
                name="description"
                value={nft.description}
                as="textarea"
                placehodler={t("provide_a_detailed_description_of_your_item")}
                rows={4}
                onChange={onChange}
              />
            </Form.Group>
          </Row>
          {createNFTLoading ? (
            <Button disabled>{t("createing...")}</Button>
          ) : (
            <Button onClick={onCreate}>{t("create")}</Button>
          )}
        </Container>
      </div>
      <ToastContainer />
    </>
  );
};

CreateAsset.propTypes = {
  account: PropTypes.string,
};

const mapStateToProps = (state) => ({
  account: state.authentication.account,
});

export default connect(mapStateToProps)(CreateAsset);
