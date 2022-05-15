import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CachedPicture from "../../components/cachedPicture";
import PillsCards from "../../components/pillsCards";
import Spacer from "../../components/spacer";
import CONSTANTS from "../../helpers/constants";
import cutText from "../../helpers/cutText";
import TVShow from "../../models/tvShow";

function ShowInfoView() {
  const { setOptions } = useNavigation();
  const route = useRoute();
  const { item } = route.params as { item: TVShow };
  const summary = item.summary.replace(/(<([^>]+)>)/gi, "");
  const premiered: Date | null = item.premiered
    ? new Date(item.premiered)
    : null;
  const ended: Date | null = item.ended ? new Date(item.ended) : null;

  useEffect(() => {
    setOptions({
      headerTitle: item.name,
    });
  }, [item]);

  return (
    <View style={styles.container}>
      {item.image && (
        <CachedPicture
          source={{ uri: item.image.original }}
          style={styles.image}
        />
      )}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <PillsCards
            items={[item.language]}
            backgroundColor={CONSTANTS.COLORS.BLUE}
            borderColor={CONSTANTS.COLORS.BLUE}
            textColor={CONSTANTS.COLORS.WHITE}
          />
        </View>
        {premiered && ended && (
          <Text style={styles.premiered} >
            {premiered?.toDateString()} — {ended?.toDateString()}
          </Text>
        )}
        <PillsCards items={item.genres} />
        <Spacer height={2} />
        <Text style={styles.summary}>{summary}</Text>
        <Text style={styles.rating}>
          Rating: {item.rating.average ?? "Unknown"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.COLORS.DARK_GRAY,
    flex: 1,
  },
  content: {
    padding: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    color: CONSTANTS.COLORS.WHITE,
    fontSize: 24,
  },
  summary: {
    color: CONSTANTS.COLORS.WHITE,
  },
  rating: {
    fontWeight: "bold",
    color: CONSTANTS.COLORS.BLUE,
  },
  premiered: {
    color: CONSTANTS.COLORS.WHITE,
    fontStyle: 'italic'
  },
  image: {
    height: CONSTANTS.DIMENSIONS.HEIGHT / 4,
    width: "100%",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});

export default ShowInfoView;
