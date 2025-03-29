export interface Attraction {
  id: string; // Уникальный идентификатор
  name: string; // Название
  description: string; // Описание
  addedAt: Date; // Дата и время добавления
  rating: number; // Рейтинг (от 1 до 5)
  image: string; // URL картинки
  location: string; // Текстовое описание местоположения
  coordinates: {
    lat: number; // Широта до 4х цифр после запятой
    lng: number; // Долгота до 4х цифр после запятой
  };
  mapLink: string; // Ссылка на карты (формируем по координатам и методе generateMapLink())
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
