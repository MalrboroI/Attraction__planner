import { Attraction } from "../GlobalTypes/Types";

export const generateMapLink = (lat: number, lng: number): string => {
  return `https://www.google.com/maps?q=${lat},${lng}`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const getStatusLabel = (status: Attraction["status"]): string => {
  return status === "planned" ? "В планах" : "Осмотрена";
};
