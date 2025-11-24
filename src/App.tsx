import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Analyse from "./pages/analyse";
import Header from "./components/Header.tsx"; // si tu crées un header

function App() {
  return (
    <>
      <Header /> {/* s’affiche sur toutes les pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyse" element={<Analyse />} />
      </Routes>
    </>
  );
}

export default App;
