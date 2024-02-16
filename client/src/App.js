import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ConnectFB from "./Components/ConnectFB/ConnectFB";
import DeleteDisconnect from "./Components/DeleteDisconnect/DeleteDisconnect";
import AgentScreen from "./Components/AgentScreen/AgentScreen";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/connectfb" element={<ConnectFB />} />
          <Route path="/page-integration/:pid" element={<DeleteDisconnect />} />
          <Route path="/agent" element={<AgentScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
