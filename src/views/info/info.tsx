import Icon from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import CachedPicture from "../../components/cachedPicture";
import PillsCards from "../../components/pillsCards";
import Spacer from "../../components/spacer";
import { useEpisode } from "../../contexts/episodeContext";
import ShowsController from "../../controllers/showsController";
import CONSTANTS from "../../helpers/constants";
import cutText from "../../helpers/cutText";
import tvEpisode from "../../models/tvEpisode";
import TVShow from "../../models/tvShow";

function ShowInfoView() {
  const { setOptions, navigate } = useNavigation<any>();
  const { open } = useEpisode();
  const route = useRoute();
  const { item } = route.params as { item: TVShow };
  const [loading, setLoading] = useState(false);
  const [heartFilled, setHeartFilled] = useState(false);
  const [seasons, setSeasons] = useState<any>({});
  const seasonsTitles = useMemo(() => {
    return Object.keys(seasons);
  }, [seasons]);

  const summary = item.summary.replace(/(<([^>]+)>)/gi, "");
  const premiered: Date | null = item.premiered
    ? new Date(item.premiered)
    : null;
  const ended: Date | null = item.ended ? new Date(item.ended) : null;

  useEffect(() => {
    setOptions({
      headerTitle: item.name,
    });
    fetchSeasons();
  }, [item]);

  useEffect(() => {
    ShowsController.getFavorite(item.id).then((data) => {
      if (data) {
        setHeartFilled(true);
      }
    });
  }, []);

  const fetchSeasons = async () => {
    setLoading(true);
    const seasons = await ShowsController.fetchSeasons(item.id);
    let data: any = {};
    for (let i = 0; i < seasons.length; i++) {
      const season = seasons[i];
      data[season.number] = await ShowsController.fetchEpisodes(season.id);
    }
    setLoading(false);
    setSeasons(data);
  };

  const handleFavorite = () => {
    setHeartFilled(!heartFilled);
    ShowsController.setFavorite(item);
  };

  const openEpisode = (episode: tvEpisode) => {
    open(episode);
  };

  return (
    <ScrollView style={styles.container}>
      {item.image && (
        <CachedPicture
          source={{ uri: item.image.original }}
          style={styles.image}
        />
      )}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View style={styles.row}>
            <Text style={styles.title}>{cutText(item.name, 30)}</Text>
            <Icon
              name="heart"
              size={16}
              color={
                !heartFilled ? CONSTANTS.COLORS.WHITE : CONSTANTS.COLORS.HEART
              }
              style={styles.heart}
              onPress={handleFavorite}
            />
          </View>
          <PillsCards
            items={[item.language]}
            backgroundColor={CONSTANTS.COLORS.BLUE}
            borderColor={CONSTANTS.COLORS.BLUE}
            textColor={CONSTANTS.COLORS.WHITE}
          />
        </View>
        {premiered && ended && (
          <Text style={styles.premiered}>
            {premiered?.toDateString()} — {ended?.toDateString()}
          </Text>
        )}
        <PillsCards items={item.genres} />
        <Spacer height={2} />
        <Text style={styles.summary}>{summary}</Text>
        <Text style={styles.rating}>
          Rating: {item.rating.average ?? "Unknown"}
        </Text>
        <Spacer height={2} />
        {loading && <ActivityIndicator color={CONSTANTS.COLORS.BLUE} />}
        {seasonsTitles.map((title, key) => {
          return (
            <View key={key}>
              <Text style={styles.seasonTitle}>Season {title}</Text>
              <View style={styles.separator} />
              {seasons[title]?.map((episode: tvEpisode, key: any) => {
                return (
                  <TouchableOpacity
                    onPress={() => openEpisode(episode)}
                    style={styles.episodeContainer}
                    key={episode.name}
                  >
                    <Text style={styles.episode} key={item.name}>
                      {episode.number}. {episode.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
    </ScrollView>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: 'wrap',
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
    fontStyle: "italic",
  },
  seasonTitle: {
    color: CONSTANTS.COLORS.WHITE,
    fontWeight: "bold",
    fontSize: 20,
  },
  image: {
    height: CONSTANTS.DIMENSIONS.HEIGHT / 4,
    width: "100%",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  episode: {
    color: CONSTANTS.COLORS.WHITE,
    fontStyle: "italic",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#4a494e",
    marginVertical: 3,
  },
  episodeContainer: {
    marginVertical: 2,
  },
  heart: {
    marginLeft: 10,
  },
});

export default ShowInfoView;
