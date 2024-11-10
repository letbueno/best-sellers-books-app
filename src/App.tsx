import React from "react";

import BooksProvider from "./contexts/booksContext";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Provider } from "./components/ui/provider";

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
