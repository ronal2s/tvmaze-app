import { Dimensions } from "react-native";

const dimensions = Dimensions.get("window");
const CONSTANTS = {
  API_URL: "https://api.tvmaze.com",
  DIMENSIONS: {
    WIDTH: dimensions.width,
    HEIGHT: dimensions.height,
  },
  COLORS: {
    PRIMARY_COLOR: "#ff3d34",
    DARK_PRIMARY_COLOR: "#c62828",
    WHITE: "#ffffff",
    BLACK: "#000000",
    LIGHT_GRAY: "#fafafa",
    DARK_GRAY: "#1c1c1c",
    BLUE: '#4a60ff',
    PLACEHOLDER_INPUT: '#7f7f7f'
  },
};

export default CONSTANTS;
