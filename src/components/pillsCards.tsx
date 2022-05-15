import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CONSTANTS from "../helpers/constants";
import convertHexRGBA from "../helpers/convertHexRGBA";
import Spacer from "./spacer";

function PillsCards({
  items,
  backgroundColor = convertHexRGBA(CONSTANTS.COLORS.WHITE, 0.5),
  textColor,
  borderColor = "#9e9e9e"
}: {
  items: string[];
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
}) {
  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={[styles.item, { backgroundColor,borderColor }]}>
        <Text style={{ color: textColor }}>{item}</Text>
      </View>
    );
  };
  return (
    <>
      {items && (
        <>
          <Spacer height={2} />
          <View style={styles.row}>
            <FlatList horizontal data={items} renderItem={renderItem} />
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  item: {
    marginRight: 5,
    borderRadius: 10,
    padding: 5,
    borderWidth: 1
  },
});

export default PillsCards;
