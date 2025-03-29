import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../Hooks/useStore";
import { Table, Text, Button, Icon, Radio, Tooltip } from "@gravity-ui/uikit";
import { Filters } from "../Filters/Filters";
import { SearchBar } from "../Search/SearchBar";
import { AttractionCard } from "../Card/AttractionCard";
import { formatDate, getStatusLabel } from "../Utils/helpers";
import {
  Eye,
  EyeSlash,
  Bookmark,
  LayoutHeaderCells,
  Square,
  TrashBin,
  Pencil,
} from "@gravity-ui/icons";
import { Attraction, AttractionStatus } from "../GlobalTypes/Types";
import { FavoritesPage } from "../Utils/FavoritesPage";

export const AttractionTable = observer(() => {
  const { attractionsStore, uiStore } = useStores();
  const { filteredAttractions, hideVisited, attractionsCount, filteredCount } =
    attractionsStore;
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);

  const handleStatusChange = (id: string, status: AttractionStatus) => {
    attractionsStore.updateAttraction(id, { status });
  };

  const columns = [
    { id: "name", name: "Название" },
    {
      id: "description",
      name: "Описание",
      template: (item: Attraction) => (
        <Text ellipsis title={item.description}>
          {item.description}
        </Text>
      ),
    },
    {
      id: "addedAt",
      name: "Дата добавления",
      template: (item: Attraction) => formatDate(item.addedAt),
    },
    { id: "rating", name: "Рейтинг" },
    { id: "location", name: "Местоположение" },
    {
      id: "status",
      name: "Статус",
      template: (item: Attraction) => getStatusLabel(item.status),
    },
    {
      id: "actions",
      name: "Действия",
      template: (item: Attraction) =>
        uiStore.isAdminMode ? (
          <div className="table-actions">
            <Button
              view="outlined"
              size="s"
              onClick={() => uiStore.openForm(item.id)}
            >
              <Icon data={Pencil} size={14} />
            </Button>
            <Button
              view="outlined-danger"
              size="s"
              onClick={() => {
                if (confirm("Удалить достопримечательность?")) {
                  attractionsStore.deleteAttraction(item.id);
                }
              }}
            >
              <Icon data={TrashBin} size={14} />
            </Button>
          </div>
        ) : (
          <div className="table-actions">
            <Tooltip
              className=""
              content={
                item.status === "planned"
                  ? "Отметить как посещенное"
                  : "Отметить в планы"
              }
              placement="top"
            >
              <Button
                view="flat"
                onClick={() => {
                  const newStatus =
                    item.status === "planned" ? "visited" : "planned";
                  attractionsStore.updateAttraction(item.id, {
                    status: newStatus,
                  });
                }}
              >
                <Icon data={Pencil} size={16} />
              </Button>
            </Tooltip>
          </div>
        ),
    },
  ];

  return (
    <div className="attraction-view">
      {/* Панель управления с поиском и фильтрами */}
      <div className="attraction-view__controls">
        <div className="attraction-view__search">
          <SearchBar />
          <Button
            className="attraction-view__btn"
            onClick={() => attractionsStore.toggleHideVisited()}
          >
            {hideVisited ? (
              <>
                <Icon
                  className="attraction-view__icon"
                  data={EyeSlash}
                  size={16}
                />
                <span>Показать осмотренные</span>
              </>
            ) : (
              <>
                <Icon className="attraction-view__icon" data={Eye} size={16} />
                <span>Скрыть осмотренные</span>
              </>
            )}
          </Button>
          <Button view="outlined" onClick={() => setFavoritesModalOpen(true)}>
            <Icon data={Bookmark} size={20} />
            <span>Избранное</span>
            {attractionsStore.favorites.length > 0 && (
              <span className="favorites-badge">
                {attractionsStore.favorites.length}
              </span>
            )}
          </Button>
        </div>
      </div>
      <div className="attraction-view__view-toggle">
        <Radio
          value={uiStore.viewMode}
          onChange={() => uiStore.setViewMode("table")}
          checked={uiStore.viewMode === "table"}
        >
          <Icon data={LayoutHeaderCells} size={16} />
          <span>Таблица</span>
        </Radio>
        <Radio
          value={uiStore.viewMode}
          onChange={() => uiStore.setViewMode("cards")}
          checked={uiStore.viewMode === "cards"}
        >
          <Icon data={Square} size={16} />
          <span>Карточки</span>
        </Radio>
      </div>
      <Filters />

      {/* Счетчик элементов */}
      <div className="attraction-view__counter">
        <Text variant="subheader-2">
          Показано {filteredCount} из {attractionsCount} достопримечательностей
        </Text>
      </div>

      {/* Переключение между видами */}
      {uiStore.viewMode === "table" ? (
        <Table
          data={filteredAttractions}
          columns={columns}
          emptyMessage="Нет достопримечательностей"
          onRowClick={(item) => console.log("Selected:", item)}
        />
      ) : (
        <div className="attraction-grid">
          {filteredAttractions.map((attraction) => (
            <AttractionCard
              key={attraction.id}
              attraction={attraction}
              onStatusChange={handleStatusChange}
              onEdit={
                uiStore.isAdminMode ? (id) => uiStore.openForm(id) : undefined
              }
              onDelete={
                uiStore.isAdminMode
                  ? (id) => attractionsStore.deleteAttraction(id)
                  : undefined
              }
              isAdmin={uiStore.isAdminMode}
            />
          ))}
        </div>
      )}
      <FavoritesPage
        isOpen={favoritesModalOpen}
        onClose={() => setFavoritesModalOpen(false)}
      />
    </div>
  );
});
