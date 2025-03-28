import {
  CachedAttractions,
  STORAGE_KEY,
} from "../components/GlobalTypes/Types";

export const getCachedAttractions = (): CachedAttractions => {
  // const defaultData: CachedAttractions = {
  //   ids: [],
  //   lastUpdated: new Date().toISOString(),
  // };
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return { ids: [], lastUpdated: new Date().toISOString() };
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed?.ids) && parsed?.lastUpdated) {
      return parsed;
    }
    return { ids: [], lastUpdated: new Date().toISOString() };
  } catch (error) {
    console.error("Error parsing cached attractions", error);
    return { ids: [], lastUpdated: new Date().toISOString() };
  }
};

//   try {
//     const data = localStorage.getItem(STORAGE_KEY);
//     if (!data)
//     return { ids: [], lastUpdated: new Date().toISOString() };
//     return data ? JSON.parse(data) : defaultData;
//   } catch {
//     return defaultData;
//   }
// };

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
