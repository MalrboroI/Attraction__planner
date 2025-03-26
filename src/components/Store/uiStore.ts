import { makeAutoObservable } from "mobx";

class UIStore {
  isAdminMode = false;
  isFormOpen = false;
  currentAttractionId: string | null = null;
  viewMode: "table" | "cards" = "table";
  setViewMode(mode: "table" | "cards") {
    this.viewMode = mode;
  }

  constructor() {
    makeAutoObservable(this);
  }

  toggleAdminMode() {
    this.isAdminMode = !this.isAdminMode;
  }

  openForm(attractionId: string | null = null) {
    this.currentAttractionId = attractionId;
    this.isFormOpen = true;
  }

  closeForm() {
    this.isFormOpen = false;
    this.currentAttractionId = null;
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === "table" ? "cards" : "table";
  }
}

export default UIStore;
