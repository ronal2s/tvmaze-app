import React from "react";
import { View } from "react-native";

function Spacer({ width, height }: { width?: number; height?: number }) {
  return <View style={{ marginHorizontal: width, marginVertical: height }} />;
}

export default Spacer;
