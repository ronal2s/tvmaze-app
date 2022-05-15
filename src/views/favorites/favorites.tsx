import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ShowsController from "../../controllers/showsController";
import CONSTANTS from "../../helpers/constants";
import TVShow from "../../models/tvShow";
import ShowList from "../home/content/showList";

function FavoritesView() {
  const [shows, setShows] = useState<TVShow[]>([]);
  useFocusEffect(
    useCallback(() => {
      ShowsController.getFavorites().then((data) => {
        setShows(data);
      });
    }, [])
  );

  return (
    <View style={styles.container}>
      {shows.length > 0 && <ShowList shows={shows} />}
      {shows.length == 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.noFavorite}>No favorites yet</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.COLORS.DARK_GRAY,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noFavorite: {
    color: CONSTANTS.COLORS.WHITE,
    opacity: 0.5
  },
});

export default FavoritesView;
