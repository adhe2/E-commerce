import { useState } from "react";
import Login from "./components/Login.jsx";
import BerandaPages from "./pages/BerandaPages.jsx";
import FormRegistration from "./components/FormRegistration.jsx";
import "./css/App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrasi" element={<FormRegistration />} />
        <Route path="/beranda" element={<BerandaPages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
