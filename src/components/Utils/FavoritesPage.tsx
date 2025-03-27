import { observer } from "mobx-react-lite";
import { useStores } from "../Hooks/useStore";
import { AttractionCard } from "../Card/AttractionCard";

export const FavoritesPage = observer(() => {
  const { attractionsStore, uiStore } = useStores();
  //   const favorites = attractionsStore.attractions.filter((a) =>
  //     attractionsStore.selectedAttractions.includes(a.id)
  const favorites = attractionsStore.favorites;

  return (
    <div className="favorites-page">
      <h1>Избранные достопримечательности</h1>
      {favorites.length === 0 ? (
        <p>Вы пока не добавили ничего в избранное</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((attraction) => (
            <AttractionCard
              key={attraction.id}
              attraction={attraction}
              onEdit={() => uiStore.openForm(attraction.id)} // Используем uiStore напрямую
            />
          ))}
        </div>
      )}
    </div>
  );
});
