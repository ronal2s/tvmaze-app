import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import EpisodeProvider from "./src/contexts/episodeContext";
import ViewsKeys from "./src/enums/viewsKeys";
import CONSTANTS from "./src/helpers/constants";
import FavoritesView from "./src/views/favorites/favorites";
import HomeView from "./src/views/home/home";
import ShowInfoView from "./src/views/info/info";
const Stack = createStackNavigator() as any;

function App() {
  const extendedHeaderTheme = {
    headerStyle: { backgroundColor: CONSTANTS.COLORS.DARK_GRAY },
    headerTintColor: CONSTANTS.COLORS.WHITE,
    headerShadowVisible: false,
  };

  return (
    <EpisodeProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={extendedHeaderTheme}
          initialRouteName={ViewsKeys.Home}
        >
          <Stack.Screen name={ViewsKeys.Home} component={HomeView} />
          <Stack.Screen name={ViewsKeys.TVShowInfo} component={ShowInfoView} />
          <Stack.Screen name={ViewsKeys.Favorites} component={FavoritesView} />
        </Stack.Navigator>
      </NavigationContainer>
    </EpisodeProvider>
  );
}

export default App;
