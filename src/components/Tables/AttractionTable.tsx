import { observer } from "mobx-react-lite";
import { useStores } from "../Hooks/useStore";
import { Table, Text, Button, Icon, Radio, Link } from "@gravity-ui/uikit";
import { Bookmark } from "@gravity-ui/icons";
import { Filters } from "../Filters/Filters";
import { SearchBar } from "../Search/SearchBar";
import { AttractionCard } from "../Card/AttractionCard";
import { formatDate, getStatusLabel } from "../Utils/helpers";
import { Eye, EyeSlash, LayoutHeaderCells, Square } from "@gravity-ui/icons";
import { Attraction } from "../GlobalTypes/Types";

export const AttractionTable = observer(() => {
  const { attractionsStore, uiStore } = useStores();
  const { filteredAttractions, hideVisited, attractionsCount, filteredCount } =
    attractionsStore;

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
      template: (item: Attraction) => (
        <Button
          view="outlined"
          size="s"
          onClick={() => uiStore.openForm(item.id)}
        >
          Редактировать
        </Button>
      ),
    },
  ];

  return (
    <div className="attraction-view">
      {/* Панель управления с поиском и фильтрами */}
      <div className="attraction-view__controls">
        <div className="attraction-view__search">
          <SearchBar />
          <Button onClick={() => attractionsStore.toggleHideVisited()}>
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
          <Link href="/favorites">
            <Icon data={Bookmark} size={20} />
            <span>Избранное</span>
          </Link>
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
      </div>

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
              onEdit={(id) => uiStore.openForm(id)}
            />
          ))}
        </div>
      )}
    </div>
  );
});
