import { makeAutoObservable, runInAction } from "mobx";
import type { Attraction } from "../GlobalTypes/Types";
import { generateMapLink } from "../Utils/helpers";
import { getCachedAttractions, saveToCache } from "../../storage/storage";

export default class AttractionsStore {
  attractions: Attraction[] = [];
  filteredAttractions: Attraction[] = [];
  searchQuery = "";
  hideVisited = false;
  sortField: keyof Attraction | null = null;
  sortDirection: "asc" | "desc" = "asc";
  selectedAttractions: string[] = []; // ID избранных достопримечательностей

  constructor() {
    makeAutoObservable(this);
    this.loadAttractions();
    this.loadCachedSelections();
  }


  // Загрузка начальных данных (в реальном приложении - API-запрос)
  async loadAttractions() {
    // Имитация загрузки
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockAttractions: Attraction[] = [
      {
        id: "1",
        name: "Эйфелева башня",
        description: "Знаменитая металлическая башня в Париже",
        addedAt: new Date("2025-03-27"),
        rating: 5,
        image:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.zastavki.com%2Fpictures%2Foriginals%2F2019_Beautiful_Eiffel_Tower_in_Paris_on_a_background_of_purple_sky_131779_.jpg&f=1&nofb=1&ipt=5f88a383332c7c5d336ed0028d9d9c6d878f5942d3e5586612a5453e3ccee5f8&ipo=images",
        location: "Париж, Франция",
        coordinates: { lat: 48.8584, lng: 2.2945 },
        mapLink: generateMapLink(48.8584, 2.2945),
        status: "planned",
      },
      {
        id: "2",
        name: "Колизей",
        description: "Античный амфитеатр в Риме",
        addedAt: new Date("2025-03-27"),
        rating: 5,
        image:
          "https://planetofhotels.com/sites/default/files/attracrions/kolizey_v_rime-2.jpg",
        location: "Рим, Италия",
        coordinates: { lat: 41.8902, lng: 12.4924 },
        mapLink: generateMapLink(41.8902, 12.4924),
        status: "visited",
      },
      {
        id: "3",
        name: "Пизанская башня",
        description:
          "Колокольная башня, часть ансамбля городского собора Санта-Мария-Ассунта",
        addedAt: new Date("2025-03-27"),
        rating: 4,
        image:
          "https://images.ctfassets.net/cnu0m8re1exe/1tI0J6fFR4TQAU7YApSjcE/3aedcf058c5f2cd9212b86731541ac3d/shutterstock_745306897.jpg",
        location: "Пиза, Италия",
        coordinates: { lat: 43.723, lng: 10.3966 },
        mapLink: generateMapLink(43.723, 10.3966),
        status: "planned",
      },
      {
        id: "4",
        name: "Ангкор-Ват",
        description:
          "Область в Камбодже, которая была центром Кхмерской империи",
        addedAt: new Date("2025-03-27"),
        rating: 5,
        image:
          "https://i.pinimg.com/originals/f8/78/b1/f878b12171af4040916c696294e64b4d.jpg",
        location: "Сиемреап, Камбоджа",
        coordinates: { lat: 13.4124, lng: 103.8669 },
        mapLink: generateMapLink(13.4124, 103.8669),
        status: "visited",
      },
      {
        id: "5",
        name: "Тадж-Махал",
        description:
          "Мраморный мавзолей XVII века в стиле Моголов с минаретами, мечетью и знаменитыми симметричными садами.",
        addedAt: new Date("2025-03-27"),
        rating: 4,
        image:
          "https://i.pinimg.com/originals/66/eb/44/66eb447d06c4665799bacda49c050a66.jpg",
        location: "Агра, Индия",
        coordinates: { lat: 27.1751, lng: 78.04205 },
        mapLink: generateMapLink(27.1751, 78.042),
        status: "planned",
      },
      {
        id: "6",
        name: "Собор Святого Петра",
        description:
          "Собор эпохи позднего Возрождения, вмещающий 20 000 верующих, в создании которого участвовал Микеланджело.",
        addedAt: new Date("2025-03-27"),
        rating: 5,
        image:
          "https://avatars.mds.yandex.net/i?id=dc9e1b161d5c97149c6d48646a46d49c-5210406-images-thumbs&n=13",
        location: "Париж, Франция",
        coordinates: { lat: 41.9023, lng: 12.4539 },
        mapLink: generateMapLink(41.9023, 12.4539),
        status: "planned",
      },
      {
        id: "7",
        name: "Спас на Крови",
        description:
          "Храм XIX века, украшенный мозаикой и мрамором и увенчанный разноцветными куполами.",
        addedAt: new Date("2025-03-27"),
        rating: 4,
        image:
          "https://thumbs.dreamstime.com/b/under-pink-cloud-cathedral-our-savior-spilled-blood-early-morning-77238977.jpg",
        location: "Санкт-Петербург, Россия",
        coordinates: { lat: 59.9402, lng: 30.3289 },
        mapLink: generateMapLink(59.9402, 30.3289),
        status: "visited",
      },
    ];

    runInAction(() => {
      this.attractions = mockAttractions;
      this.applyFilters();
    });
  }

  // CRUD операции
  addAttraction(
    attraction: Omit<Attraction, "id" | "addedAt" | "mapLink"> & {
      label?: string;
    }
  ) {
    const newAttraction: Attraction = {
      ...attraction,
      id: Date.now().toString(),
      addedAt: new Date(),
      mapLink: generateMapLink(
        attraction.coordinates.lat,
        attraction.coordinates.lng
      ),
      status: "planned",
    };

    this.attractions = [...this.attractions, newAttraction];
    this.applyFilters();
  }

  updateAttraction(id: string, updatedData: Partial<Attraction>) {
    this.attractions = this.attractions.map((attr) =>
      attr.id === id ? { ...attr, ...updatedData } : attr
    );
    this.applyFilters();
  }

  deleteAttraction(id: string) {
    this.attractions = this.attractions.filter((attr) => attr.id !== id);
    this.applyFilters();
  }

  // Фильтрация и сортировка
  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.applyFilters();
  }

  toggleHideVisited() {
    this.hideVisited = !this.hideVisited;
    this.applyFilters();
  }

  setSort(field: keyof Attraction | null) {
    if (field && !(field in this.attractions[0])) {
      console.error(`Field "${field}" does not exist in Attraction`);
      return;
    }

    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortField = field;
      this.sortDirection = "asc";
    }
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.attractions];

    // Поиск
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(
        (attr) =>
          attr.name.toLowerCase().includes(query) ||
          attr.description.toLowerCase().includes(query) ||
          attr.location.toLowerCase().includes(query)
      );
    }

    // Скрытие просмотренных
    if (this.hideVisited) {
      result = result.filter((attr) => attr.status === "planned");
    }

    // Сортировка
    if (this.sortField) {
      result = [...result].sort((a, b) => {
        const aValue = a[this.sortField as keyof Attraction];
        const bValue = b[this.sortField as keyof Attraction];

        if (aValue instanceof Date && bValue instanceof Date) {
          return this.sortDirection === "asc"
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        }

        if (typeof aValue === "string" && typeof bValue === "string") {
          return this.sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return this.sortDirection === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        return 0;
      });
    }

    this.filteredAttractions = result;
  }

  get attractionsCount() {
    return this.attractions.length;
  }

  get filteredCount() {
    return this.filteredAttractions.length;
  }

  // Хранилище storage
  
  // loadCachedSelections() {
  //   const cached = getCachedAttractions();
  //   runInAction(() => {
  //     this.selectedAttractions = cached.ids;
  //   });

  loadCachedSelections() {
    // загрузка из LocalStorage
    const cached = getCachedAttractions();
    this.selectedAttractions = cached.ids;
  }

  toggleAttractionSelection(id: string) {
    // Переключение выбора достопримечательности и обработки ошибки
    try {
      if (this.selectedAttractions.includes(id)) {
        this.selectedAttractions = this.selectedAttractions.filter(
          (item) => item !== id
        );
      } else {
        this.selectedAttractions = [...this.selectedAttractions, id];
      }
      saveToCache(this.selectedAttractions);
    } catch (error) {
      console.error("Failed to toggle selection:", error);
    }
  }

  // Проверка, выбрана ли достопримечательность
  isSelected(id: string): boolean {
    return this.selectedAttractions.includes(id);
  }
  // Получение списка избранных
  get favorites(): Attraction[] {
    return this.attractions.filter((attraction) =>
      this.selectedAttractions.includes(attraction.id)
    );
  }
}
