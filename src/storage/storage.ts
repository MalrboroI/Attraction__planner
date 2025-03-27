import {
  CachedAttractions,
  STORAGE_KEY,
} from "../components/GlobalTypes/Types";

export const getCachedAttractions = (): CachedAttractions => {
  const defaultData: CachedAttractions = {
    ids: [],
    lastUpdated: new Date().toISOString(),
  };
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultData;
  } catch {
    return defaultData;
  }
};

export const saveToCache = (ids: string[]): void => {
  const data: CachedAttractions = {
    ids,
    lastUpdated: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const clearCache = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
