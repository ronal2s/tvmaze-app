import React from "react";
import { TextInput } from "react-native";
import CONSTANTS from "../helpers/constants";
import convertHexRGBA from "../helpers/convertHexRGBA";

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (text: string) => void;
}) {
  return (
    <TextInput
      placeholder="Search..."
      style={{
        color: CONSTANTS.COLORS.BLACK,
        borderColor: CONSTANTS.COLORS.BLUE,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        margin: 10,
        backgroundColor: convertHexRGBA(CONSTANTS.COLORS.WHITE, 0.8),
      }}
      placeholderTextColor={CONSTANTS.COLORS.PLACEHOLDER_INPUT}
      value={value}
      onChangeText={onChange}
    />
  );
}

export default SearchInput;
