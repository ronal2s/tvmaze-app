import {
    NavigationContainer
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ViewsKeys from "./src/enums/viewsKeys";
import CONSTANTS from "./src/helpers/constants";
import HomeView from "./src/views/home/home";
import ShowInfoView from "./src/views/showInfo/showInfo";
const Stack = createStackNavigator() as any;

function App() {
  const extendedHeaderTheme = {
    headerStyle: { backgroundColor: CONSTANTS.COLORS.DARK_GRAY },
    headerTintColor: CONSTANTS.COLORS.WHITE,
    headerShadowVisible: false,
  };
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={extendedHeaderTheme}
        initialRouteName={ViewsKeys.Home}
      >
        <Stack.Screen name={ViewsKeys.Home} component={HomeView} />
        <Stack.Screen name={ViewsKeys.TVShowInfo} component={ShowInfoView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
