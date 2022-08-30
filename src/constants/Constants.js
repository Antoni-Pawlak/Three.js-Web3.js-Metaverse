export const Constants = {
  SERVER_URL: process.env.REACT_APP_BACKEND_URL,
  ALCHEMY_KEY: process.env.REACT_APP_ALCHEMY_KEY,
  ACCOUNT_PRIVATE_KEY: process.env.REACT_APP_ACCOUNT_PRIVATE_KEY,
  NFT_CONTRACT_ADDRESS: process.env.REACT_APP_NFT_CONTRACT_ADDRESS,
  TOKEN_ADDRESSES: [
    {
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      token: "WETH",
    },
  ],
};
