import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import StorageKeys from "../../enums/storageKeys";
import CONSTANTS from "../../helpers/constants";
import TVShow from "../../models/tvShow";
import ShowList from "../home/content/showList";

function FavoritesView() {
  const [shows, setShows] = useState<TVShow[]>([]);
  useEffect(() => {
    AsyncStorage.getItem(StorageKeys.FAVORITES).then((data) => {
      if (data) {
        setShows(JSON.parse(data));
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <ShowList shows={shows} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.COLORS.DARK_GRAY,
    flex: 1,
  },
});

export default FavoritesView;
