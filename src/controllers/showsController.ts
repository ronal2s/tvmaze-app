import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import StorageKeys from "../enums/storageKeys";
import CONSTANTS from "../helpers/constants";
import TVShow from "../models/tvShow";
import TVSeason from "../models/tvSeason";
import tvEpisode from "../models/tvEpisode";

type FetchType = {
  page?: number;
  from: number;
  to: number;
  refresh?: boolean;
};

class ShowsController {
  static async fetch({ page = 0, from, to, refresh }: FetchType) {
    const url = `${CONSTANTS.API_URL}/shows?page=${page}`;
    const cachedPage = Number(
      await AsyncStorage.getItem(StorageKeys.CACHED_PAGE)
    );

    if (!refresh && cachedPage == page) {
      const cachedShows = await AsyncStorage.getItem(StorageKeys.CACHED_SHOWS);
      if (cachedShows) {
        return (JSON.parse(cachedShows) as TVShow[]).slice(from, to);
      }
    }

    const response = await axios.get(url);
    const data = response.data as TVShow[];
    AsyncStorage.setItem(StorageKeys.CACHED_SHOWS, JSON.stringify(data));
    AsyncStorage.setItem(StorageKeys.CACHED_PAGE, String(page));
    return data.slice(from, to);
  }

  static async search(text: string) {
    const url = `${CONSTANTS.API_URL}/search/shows?q=${text}`;
    const response = await axios.get(url);
    const data = response.data as any[];
    return data.map((item) => item.show) as TVShow[];
  }

  static async fetchSeasons(id: number) {
    const url = `${CONSTANTS.API_URL}/shows/${id}/seasons`;
    const response = await axios.get(url);
    const data = response.data as any[];
    return data as TVSeason[];
  }

  static async fetchEpisodes(id: number) {
    const url = `${CONSTANTS.API_URL}/seasons/${id}/episodes`;
    const response = await axios.get(url);
    const data = response.data as any[];
    return data as tvEpisode[];
  }

  static async setFavorite(item: TVShow) {
    const favorites = await AsyncStorage.getItem(StorageKeys.FAVORITES);
    let favoritesArray = favorites ? JSON.parse(favorites) : [];
    // Verify if item exists in favorites
    const exists = favoritesArray.find((fav: TVShow) => fav.id === item.id);
    if (exists) {
      // Delete item from favorites
      favoritesArray = favoritesArray.filter(
        (fav: TVShow) => fav.id !== item.id
      );
      AsyncStorage.setItem(StorageKeys.FAVORITES, JSON.stringify(favoritesArray));
      return;
    }
    const newFavorites = [...favoritesArray, item];
    AsyncStorage.setItem(StorageKeys.FAVORITES, JSON.stringify(newFavorites));
  }

  static async getFavorites() {
    const favorites = await AsyncStorage.getItem(StorageKeys.FAVORITES);
    return favorites ? (JSON.parse(favorites) as TVShow[]) : [];
  }

  static async getFavorite(id: number) {
    const favorites = await AsyncStorage.getItem(StorageKeys.FAVORITES);
    return favorites
      ? (JSON.parse(favorites) as TVShow[]).find((fav: TVShow) => fav.id === id)
      : null;
  }
}

export default ShowsController;
