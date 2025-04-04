import { observer } from "mobx-react-lite";
import { useStores } from "../Hooks/useStore";
import { Button, Text, Link } from "@gravity-ui/uikit";
export const Header = observer(() => {
  const { uiStore } = useStores();

  return (
    <header className="header">
      <div className="header__content">
        <Link href="/">
          <Text className="header__content__text" variant="header-1">
            Планировщик достопримечательностей
          </Text>
        </Link>

        <div className="header__actions">
          {uiStore.isAdminMode ? (
            <Text color="secondary">Режим администратора</Text>
          ) : (
            <Button view="outlined" onClick={() => uiStore.toggleAdminMode()}>
              Режим администратора
            </Button>
          )}
        </div>
      </div>
    </header>
  );
});
