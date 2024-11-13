import React from "react";

import BooksProvider from "./contexts/listsBooksContext";

import Header from "./components/Header";
import { Provider } from "./components/ui/provider";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Provider defaultTheme="light">
        <BooksProvider>
          <Header />
          <AppRoutes />
        </BooksProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
