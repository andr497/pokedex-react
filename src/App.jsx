import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Main from "./pages/Main";
import InfoPokemon from "./pages/InfoPokemon";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pokemon/:id" element={<InfoPokemon />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
