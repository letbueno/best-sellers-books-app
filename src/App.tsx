import React from "react";

import "./App.css";

import { Provider } from "./components/ui/provider";

function App() {
  return (
    <Provider>
      <div className="App">Hello, World</div>
    </Provider>
  );
}

export default App;
