import { BlurView } from "expo-blur";
import React, { memo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import CONSTANTS from "../helpers/constants";
import convertHexRGBA from "../helpers/convertHexRGBA";
import cutText from "../helpers/cutText";
import TVShow from "../models/tvShow";
import CachedPicture from "./cachedPicture";
import PillsCards from "./pillsCards";

type TVShowCardProps = {
  show: TVShow;
};
function TVShowCard({ show }: TVShowCardProps) {
  const summary = cutText(show.summary.replace(/(<([^>]+)>)/gi, ""), 80);

  return (
    <View style={styles.container}>
      <BlurView intensity={50}>
        <View style={styles.row}>
          {show.image ? (
            <CachedPicture
              source={{ uri: show.image.medium }}
              style={styles.picture}
            />
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.noPicture}>No picture</Text>
            </View>
          )}
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{show.name}</Text>
            </View>
            <PillsCards items={show.genres} />

            <View style={styles.summary}>
              <Text>{summary}</Text>
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: convertHexRGBA(CONSTANTS.COLORS.WHITE, 0.8),
  },
  content: {
    padding: 10,
    alignItems: "flex-start",
  },
  row: {
    flexDirection: "row",
  },
  heart: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  picture: {
    flex: 1,
    width: CONSTANTS.DIMENSIONS.WIDTH * 0.3,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  emptyBox: {
    width: CONSTANTS.DIMENSIONS.WIDTH * 0.3,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: CONSTANTS.COLORS.BLUE,
    justifyContent: "center",
    alignItems: "center",
  },
  noPicture: {
    color: "white",
    opacity: 0.7,
  },
  titleContainer: {
    borderColor: CONSTANTS.COLORS.BLUE,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 22,
    backgroundColor: convertHexRGBA(CONSTANTS.COLORS.BLUE, 0.1),
  },
  name: {
    color: CONSTANTS.COLORS.BLACK,
  },
  summary: {
    maxWidth: CONSTANTS.DIMENSIONS.WIDTH * 0.6,
  },
});

export default memo(TVShowCard);
