import { observer } from "mobx-react-lite";
import { useStores } from "../Hooks/useStore";
import { Select, Button } from "@gravity-ui/uikit";
import { Attraction } from "../GlobalTypes/Types";

export const Filters = observer(() => {
  const { attractionsStore } = useStores();

  const sortOptions = [
    { value: "name", content: "По названию" },
    { value: "rating", content: "По рейтингу" },
    { value: "addedAt", content: "По дате добавления" },
    { value: "location", content: "По местоположению" },
  ];

  return (
    <div className="filters">
      <Select
        placeholder="Сортировать по"
        value={attractionsStore.sortField ? [attractionsStore.sortField] : []}
        onUpdate={(val) => {
          if (val[0]) {
            attractionsStore.setSort(val[0] as keyof Attraction);
          }
        }}
        options={sortOptions}
      />

      <Button
        view="outlined"
        onClick={() =>
          attractionsStore.setSort(attractionsStore.sortField || "name")
        }
      >
        {attractionsStore.sortDirection === "asc"
          ? "По возрастанию"
          : "По убыванию"}
      </Button>
    </div>
  );
});
