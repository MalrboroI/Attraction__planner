import { createContext } from "react";
import AttractionsStore from "../Store/attractionsStore";
import UIStore from "../Store/uiStore";

interface RootStore {
  attractionsStore: AttractionsStore;
  uiStore: UIStore;
}

export const RootStoreContext = createContext<RootStore | null>(null);
