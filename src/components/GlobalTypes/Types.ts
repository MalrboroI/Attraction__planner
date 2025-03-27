export interface Attraction {
  id: string; // Уникальный идентификатор
  name: string; // Название
  description: string; // Описание
  addedAt: Date; // Дата и время добавления
  rating: number; // Рейтинг (1-5)
  image: string; // URL фото
  location: string; // Текстовое описание местоположения
  coordinates: {
    lat: number; // Широта
    lng: number; // Долгота
  };
  mapLink: string; // Ссылка на карты (формируется автоматически)
  status: "planned" | "visited"; // Статус
}

export type AttractionStatus = "planned" | "visited";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AttractionFormValues
  extends Omit<Attraction, "id" | "addedAt" | "mapLink"> {
  id?: string;
}

// Типы для API ответов
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Типы для storage

export type CachedAttractions = {
  ids: string[]; // ID избранных достопримечательностей
  lastUpdated: string; // Дата последнего обновления
};

export const STORAGE_KEY = "user_selected_attractions";
