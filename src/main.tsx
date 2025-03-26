import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { RootStoreContext } from "./components/Context/StoreContext";
import AttractionsStore from "./components/Store/attractionsStore";
import UIStore from "./components/Store/uiStore";

const rootStore = {
  attractionsStore: new AttractionsStore(),
  uiStore: new UIStore(),
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootStoreContext.Provider value={rootStore}>
      <App />
    </RootStoreContext.Provider>
  </React.StrictMode>
);
