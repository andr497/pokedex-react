import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Main from "./pages/Main";
import InfoPokemon from "./pages/InfoPokemon";
import ErrorPage from "./pages/ErrorPage";
import Searcher from "./pages/Searcher";

function App() {
  return (
    <BrowserRouter>
      {/* RENDERIZADO DE LAYOUT */}
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pokemon/:id" element={<InfoPokemon />} />
          <Route path="/searcher" element={<Searcher />} />
          <Route
            path="*"
            element={
              <ErrorPage
                title="Page not Found"
                message="The page you are looking for was not found."
              />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

{
  /* <Route path="/" element={<Main />} />
          <Route path="/pokemon/:id" element={<InfoPokemon />} />
          <Route path="/searcher" element={<Searcher />} />
          <Route
            path="*"
            element={
              <ErrorPage
                title="Page not Found"
                message="The page you are looking for was not found."
              />
            }
          /> */
}
