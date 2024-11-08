import React from "react";

import "./App.css";

import BooksProvider from "./contexts/booksContext";
import Home from "./pages/Home";
import { Provider } from "./components/ui/provider";
import Header from "./components/Header";

function App() {
  return (
    <Provider defaultTheme="light">
      <BooksProvider>
        <Header />
        <Home />
      </BooksProvider>
    </Provider>
  );
}

export default App;
