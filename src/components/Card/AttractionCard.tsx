import { observer } from "mobx-react-lite";
import { Attraction } from "../GlobalTypes/Types";
import { useStores } from "../Hooks/useStore";
import { Card, Text, Button, Icon } from "@gravity-ui/uikit";
import { formatDate, getStatusLabel } from "../Utils/helpers";
import { Star, StarFill } from "@gravity-ui/icons";

interface AttractionCardProps {
  attraction: Attraction;
  onEdit: (id: string) => void;
}

export const AttractionCard = observer(
  ({ attraction, onEdit }: AttractionCardProps) => {
    const { attractionsStore } = useStores();
    // const isSelected = attractionsStore.selectedAttractions.includes(
    //   attraction.id
    // );
    const isSelected = attractionsStore.isSelected(attraction.id);

    return (
      <Card className="attraction-card" view="raised">
        <div className="attraction-card__header">
          {/* <h3>{attraction.name}</h3> */}
          <Button
            className="favorite-btn"
            view="flat"
            onClick={() =>
              attractionsStore.toggleAttractionSelection(attraction.id)
            }
          >
            <Icon
              data={isSelected ? StarFill : Star}
              size={18}
              className={
                isSelected
                  ? "favorite-icon--isSelected"
                  : "favorite-icon--noSelected"
              }
            />
          </Button>
        </div>
        <div className="attraction-card__image">
          <img src={attraction.image} alt={attraction.name} />
        </div>

        <div className="attraction-card__content">
          <Text variant="header-2">{attraction.name}</Text>
          <Text color="secondary">{attraction.location}</Text>

          <div className="attraction-card__meta">
            <Text>Рейтинг: {attraction.rating}/5</Text>
            <Text>Добавлено: {formatDate(attraction.addedAt)}</Text>
            <Text>Статус: {getStatusLabel(attraction.status)}</Text>
          </div>

          <Text className="attraction-card__description">
            {attraction.description}
          </Text>

          <div className="attraction-card__actions">
            <Button view="outlined" href={attraction.mapLink} target="_blank">
              Посмотреть на карте
            </Button>
            <Button view="outlined" onClick={() => onEdit(attraction.id)}>
              Редактировать
            </Button>
          </div>
        </div>
      </Card>
    );
  }
);
