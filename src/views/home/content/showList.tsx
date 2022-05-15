import { useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Spacer from "../../../components/spacer";
import TVShowCard from "../../../components/tvShowCard";
import ViewsKeys from "../../../enums/viewsKeys";
import TVShow from "../../../models/tvShow";

type ShowListProps = {
  shows: TVShow[];
  onEndReached: () => void;
  loading: boolean;
};
function ShowList({ shows, loading, onEndReached }: ShowListProps) {
  const navigation = useNavigation<any>();

  const navigateToShowInfo = (item: TVShow) => {
    navigation.navigate(ViewsKeys.TVShowInfo, { item });
  };

  const renderItem = ({ item }: { item: TVShow }) => {
    return (
      <>
        <TouchableOpacity onPress={() => navigateToShowInfo(item)}>
          <TVShowCard show={item} />
        </TouchableOpacity>
        <Spacer height={2} />
      </>
    );
  };
  const keyExtractor = (item: TVShow) => item.id.toString();
  return (
    <FlatList
      data={shows}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.container}
      onEndReached={!loading ? onEndReached : undefined}
      onEndReachedThreshold={0.5}
      refreshing={loading}
      ListFooterComponent={
        loading ? <ActivityIndicator size="large" /> : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ShowList;
