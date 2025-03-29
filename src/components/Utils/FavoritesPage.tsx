import { observer } from "mobx-react-lite";
import { useStores } from "../Hooks/useStore";
import { AttractionCard } from "../Card/AttractionCard";
import { Modal, Text, Button } from "@gravity-ui/uikit";

interface FavoritesPageProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FavoritesPage = observer(
  ({ isOpen, onClose }: FavoritesPageProps) => {
    const { attractionsStore } = useStores();
    const favorites = attractionsStore.favorites;

    return (
      <Modal open={isOpen} onClose={onClose}>
        <div className="favorites-modal">
          <h2 className="favorites-modal__header">
            {`Вы добавили ${favorites.length} избраных достопримечательностей.`}
          </h2>
          <div className="favorites-modal__content">
            {favorites.length === 0 ? (
              <Text color="secondary">
                Вы пока не добавили ничего в избранное
              </Text>
            ) : (
              <div className="favorites-modal__grid">
                {favorites.map((attraction) => (
                  <AttractionCard key={attraction.id} attraction={attraction} />
                ))}
              </div>
            )}
          </div>

          <div className="favorites-modal__footer">
            <Button view="normal" onClick={onClose}>
              Закрыть
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);
