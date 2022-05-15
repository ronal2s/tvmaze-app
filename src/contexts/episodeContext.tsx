import React, { createContext, useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import CachedPicture from "../components/cachedPicture";
import CONSTANTS from "../helpers/constants";
import tvEpisode from "../models/tvEpisode";

type EpisodeContextProps = {
  open: (episode: tvEpisode) => void;
};

const ShowEpisodeContext = createContext<EpisodeContextProps>({
  open: () => {},
});

export default function EpisodeProvider({ children }: { children?: any }) {
  const [episode, setEpisode] = useState<tvEpisode | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const summary = episode?.summary
    ? episode?.summary.replace(/(<([^>]+)>)/gi, "")
    : "No summary available";

  const open = (episode: tvEpisode) => {
    setEpisode(episode);
    setIsVisible(true);
  };

  const close = () => {
    setIsVisible(false);
  };

  return (
    <ShowEpisodeContext.Provider value={{ open }}>
      {children}
      <Modal
        isVisible={Boolean(episode) && isVisible}
        onBackdropPress={close}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        {episode && isVisible ? (
          <>
            <View style={styles.container}>
              {episode.image && (
                <CachedPicture
                  source={{ uri: episode.image.original }}
                  style={styles.image}
                />
              )}
              <View style={styles.content}>
                <Text style={styles.title}>
                  {episode.season}.{episode.number} {episode.name}
                </Text>
                <Text>{summary}</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.hint}>Tap outside to close</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View />
        )}
      </Modal>
    </ShowEpisodeContext.Provider>
  );
}

export function useEpisode() {
  return useContext(ShowEpisodeContext);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.COLORS.WHITE,
    borderRadius: 30,
    maxHeight: CONSTANTS.DIMENSIONS.HEIGHT * 0.9,
  },
  content: {
    padding: 10,
  },
  hint: {
    color: CONSTANTS.COLORS.WHITE,
    alignSelf: "center",
    opacity: 0.5,
  },
  image: {
    height: CONSTANTS.DIMENSIONS.HEIGHT / 4,
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontWeight: "bold",
    color: CONSTANTS.COLORS.DARK_GRAY,
    fontSize: 24,
  },
});
