import { observer } from "mobx-react-lite";
import { useStores } from "../Hooks/useStore";
import { Button, Text } from "@gravity-ui/uikit";
import { AttractionTable } from "../Tables/AttractionTable";

export const AdminPanel = observer(() => {
  const { uiStore } = useStores();

  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <Text variant="header-1">Режим администратора</Text>
        <Button view="action" onClick={() => uiStore.openForm()}>
          Добавить достопримечательность
        </Button>
      </div>

      <AttractionTable />

      <div className="admin-panel__footer">
        <Button onClick={() => uiStore.toggleAdminMode()}>
          Выйти из режима администратора
        </Button>
      </div>
    </div>
  );
});
