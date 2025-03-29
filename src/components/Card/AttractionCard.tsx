import { observer } from "mobx-react-lite";
import { Attraction, AttractionStatus } from "../GlobalTypes/Types";
import { useStores } from "../Hooks/useStore";
import { Card, Text, Button, Icon, Select } from "@gravity-ui/uikit";
import { formatDate, getStatusLabel } from "../Utils/helpers";
import { Star, StarFill, TrashBin, Pencil } from "@gravity-ui/icons";

interface AttractionCardProps {
  attraction: Attraction;
  onEdit?: (id: string) => void;

  onStatusChange?: (id: string, status: AttractionStatus) => void;
  onDelete?: (id: string) => void;
  // compactMode?: boolean;
  isAdmin?: boolean;
}

export const AttractionCard = observer(
  ({
    attraction,
    onEdit,
    onStatusChange,
    onDelete,
    // compactMode = false,
    isAdmin = false,
  }: AttractionCardProps) => {
    const { attractionsStore } = useStores();
    const isSelected = attractionsStore.isSelected(attraction.id);

    const handleToggleFavorite = () => {
      attractionsStore.toggleAttractionSelection(attraction.id);
    };
    const handleStatusChange = (val: string[]) => {
      if (onStatusChange) {
        onStatusChange(attraction.id, val[0] as AttractionStatus);
      }
    };

    return (
      <Card className="attraction-card" view="raised">
        <div className="attraction-card__header">
          {/* <h3>{attraction.name}</h3> */}
          <Button
            className="favorite-btn"
            view="flat"
            onClick={handleToggleFavorite}
            title={
              isSelected ? "Удалить из избранного" : "Добавить в избранное"
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
            <div className="attraction-card__status">
              {isAdmin ? (
                <>
                  <Button
                    view="outlined"
                    onClick={() => onEdit?.(attraction.id)}
                    className="attraction-card__edit-btn"
                  >
                    <Icon data={Pencil} size={16} />
                    <span>Редактировать</span>
                  </Button>
                  <Button
                    view="outlined-danger"
                    onClick={() => onDelete?.(attraction.id)}
                    className="attraction-card__delete-btn"
                  >
                    <Icon data={TrashBin} size={16} />
                    <span>Удалить</span>
                  </Button>
                </>
              ) : (
                <Select
                  value={[attraction.status]}
                  onUpdate={handleStatusChange}
                  options={[
                    { value: "planned", content: "В планах" },
                    { value: "visited", content: "Осмотрена" },
                  ]}
                />
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }
);
