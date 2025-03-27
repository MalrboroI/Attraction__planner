import { useContext } from "react";
import AttractionsStore from "../Store/attractionsStore";
import { RootStoreContext } from "../Context/StoreContext";
import UIStore from "../Store/uiStore";

interface Stores {
  attractionsStore: AttractionsStore;
  uiStore: UIStore;
}

export const useStores = (): Stores => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error(
      "useStores необходимо использовать внутри RootStoreProvider"
    );
  }
  return context;
};
