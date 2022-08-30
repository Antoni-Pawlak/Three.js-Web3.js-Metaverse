import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Create from "./components/create";
import Profile from "./components/profile";
import Collections from "./components/mycollections";
import CreateCollection from "./components/createcollection";
import CreateAsset from "./components/createnft";
import MyWallet from "./components/mywallet";
import Setting from "./components/setting";
import EditNFTRoom from "./components/room/edit";
import BuyRoom from "./components/room/buy";
import MyRoom from "./components/room/my";
import NFTRoom from "./components/room/watch";
import Room1 from "./components/room/sandbox/room1";
import Room2 from "./components/room/sandbox/room2";
import Room3 from "./components/room/sandbox/room3";
import Room4 from "./components/room/sandbox/room4";

import "bootstrap/dist/css/bootstrap.min.css";
import setAuthToken from "./utils/setAuthToken";
import {
  connectSuccess,
  disconnectRequest,
} from "./redux/authentication/authenticationActions";
import { connectAlchemy } from "./redux/blockchain/blockchainActions";

import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectAlchemy());
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      dispatch(connectSuccess({ account: localStorage.token }));
    }
    window.addEventListener("storage", () => {
      if (!localStorage.token) dispatch(disconnectRequest());
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<NFTRoom />} />
        <Route path="/login" element={<Create />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collection/create" element={<CreateCollection />} />
        <Route path="/nft/create" element={<CreateAsset />} />
        <Route path="/mywallet" element={<MyWallet />} />
        <Route path="/myroom" element={<MyRoom />} />
        <Route path="/editroom/:id" element={<EditNFTRoom />} />
        <Route path="/buyroom" element={<BuyRoom />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/room1" element={<Room1 />} />
        <Route path="/room2" element={<Room2 />} />
        <Route path="/room3" element={<Room3 />} />
        <Route path="/room4" element={<Room4 />} />
      </Routes>
    </Router>
  );
};

export default App;
