import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import NotFound from "../pages/NotFound";
import ScrollToTop from "../utils/scrollTop";
import LoadingWrapper from "../pages/Loading";
import Home from "../pages/Home";
import ListBooksDetails from "../pages/ListBooksDetails";

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingWrapper />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list/:id" element={<ListBooksDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;