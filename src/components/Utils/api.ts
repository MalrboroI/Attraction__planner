import {
  Attraction,
  ApiResponse,
  AttractionFormValues,
} from "../GlobalTypes/Types";

// // При использовании реального API здесь поместили бы запросы через axios для апишки

let mockAttractions: Attraction[] = [
  {
    id: "1",
    name: "Эйфелева башня",
    description: "Знаменитая металлическая башня в Париже",
    addedAt: new Date("2023-01-15"),
    rating: 5,
    image: "https://example.com/eiffel.jpg",
    location: "Париж, Франция",
    coordinates: { lat: 48.8584, lng: 2.2945 },
    mapLink: "https://www.google.com/maps?q=48.8584,2.2945",
    status: "planned",
  },
  {
    id: "2",
    name: "Колизей",
    description: "Античный амфитеатр в Риме",
    addedAt: new Date("2023-02-20"),
    rating: 4,
    image: "https://example.com/colosseum.jpg",
    location: "Рим, Италия",
    coordinates: { lat: 41.8902, lng: 12.4924 },
    mapLink: "https://www.google.com/maps?q=41.8902,12.4924",
    status: "visited",
  },
];

// Функция для генерации ID
const generateId = (): string => Math.random().toString(36).substr(2, 9);

// Имитация API-запросов
export const fetchAttractions = async (): Promise<
  ApiResponse<Attraction[]>
> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Имитация задержки сети
    return {
      data: [...mockAttractions],
      success: true,
    };
  } catch (error) {
    console.error("Error fetching attractions:", error);
    return {
      data: [],
      success: false,
      message: "Failed to fetch attractions",
    };
  }
};

export const saveAttraction = async (
  attractionData: AttractionFormValues
): Promise<ApiResponse<Attraction>> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Имитация задержки сети

    const isNew = !attractionData.id;
    let attraction: Attraction;

    if (isNew) {
      attraction = {
        ...attractionData,
        id: generateId(),
        addedAt: new Date(),
        mapLink: `https://www.google.com/maps?q=${attractionData.coordinates.lat},${attractionData.coordinates.lng}`,
        status: "planned" as const,
      };
      mockAttractions.push(attraction);
    } else {
      attraction = {
        ...mockAttractions.find((a) => a.id === attractionData.id)!,
        ...attractionData,
      };
      mockAttractions = mockAttractions.map((a) =>
        a.id === attractionData.id ? attraction : a
      );
    }

    return {
      data: attraction,
      success: true,
      message: isNew ? "Attraction created" : "Attraction updated",
    };
  } catch (error) {
    console.error("Error saving attraction:", error);
    return {
      data: {} as Attraction,
      success: false,
      message: "Failed to save attraction",
    };
  }
};

export const deleteAttraction = async (
  id: string
): Promise<ApiResponse<{ id: string }>> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Имитация задержки сети
    mockAttractions = mockAttractions.filter((a) => a.id !== id);
    return {
      data: { id },
      success: true,
      message: "Attraction deleted",
    };
  } catch (error) {
    console.error("Error deleting attraction:", error);
    return {
      data: { id },
      success: false,
      message: "Failed to delete attraction",
    };
  }
};
