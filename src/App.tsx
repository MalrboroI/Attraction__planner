import { observer } from "mobx-react-lite";
import { useStores } from "./components/Hooks/useStore";
import { Header } from "./components/Header/Header";
import { AttractionTable } from "./components/Tables/AttractionTable";
import { AdminPanel } from "./components/Admin/AdminPanel";
import { AttractionForm } from "./components/Forms/AttractionForm";
import { ThemeProvider } from "@gravity-ui/uikit";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import "./styles/Main.scss";

export const App = observer(() => {
  const { uiStore } = useStores();

  return (
    <ThemeProvider theme="light">
      <div className="app">
        <Header />

        <main className="app-content">
          {uiStore.isAdminMode ? <AdminPanel /> : <AttractionTable />}
        </main>

        {uiStore.isFormOpen && <AttractionForm />}
      </div>
    </ThemeProvider>
  );
});
