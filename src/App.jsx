import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
    <div className="container">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
