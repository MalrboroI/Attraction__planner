import { observer } from "mobx-react-lite";
import { useStores } from "../Hooks/useStore";
import { TextInput } from "@gravity-ui/uikit";

export const SearchBar = observer(() => {
  const { attractionsStore } = useStores();

  return (
    <div className="search-bar">
      <TextInput
        placeholder="Поиск достопримечательностей..."
        value={attractionsStore.searchQuery}
        onChange={(e) => attractionsStore.setSearchQuery(e.target.value)}
        hasClear
        size="l"
        pin="round-round"
      />
    </div>
  );
});
