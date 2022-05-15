import * as Crypto from "expo-crypto";
import * as FileSystem from "expo-file-system";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  ImageURISource,
  InteractionManager,
  View,
} from "react-native";
const loadingIndicatorSource = require("../../assets/loading.gif");

const CachedPicture = ({
  source,
  isBackground = false,
  children,
  style,
  imageStyle,
  ...rest
}: {
  source: ImageSourcePropType & ImageURISource;
  isBackground?: boolean;
  children?: JSX.Element | JSX.Element[];
  rest?: any;
  style?: object;
  imageStyle?: object;
}) => {
  const mounted = useRef<boolean>(true);
  const downloadResumable = useRef<any>();
  const [imageURI, setImageURI] = useState<string | null>("");

  useEffect(() => {
    const _interaction = InteractionManager.runAfterInteractions(async () => {
      if (source?.uri) {
        const filesystemURI = await getImageFilesystemKey(source.uri);
        await loadImage(filesystemURI, source.uri);
      }
    });
    return () => {
      _interaction.cancel();
      mounted.current = false;
    };
  }, [source]);

  const checkClear = async () => {
    try {
      if (downloadResumable.current) {
        const t = await downloadResumable.current.pauseAsync();
        const filesystemURI = await getImageFilesystemKey(
          source?.uri as string
        );
        const metadata = await FileSystem.getInfoAsync(filesystemURI);
        if (metadata.exists) {
          await FileSystem.deleteAsync(t.fileUri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getImageFilesystemKey = async (remoteURI: string) => {
    const hashed = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      remoteURI
    );
    return `${FileSystem.documentDirectory}${hashed}`;
  };

  const loadImage = async (filesystemURI: string, remoteURI: string) => {
    if (
      downloadResumable.current &&
      downloadResumable.current._removeSubscription
    ) {
      downloadResumable.current._removeSubscription();
    }
    try {
      const metadata = await FileSystem.getInfoAsync(filesystemURI);
      if (metadata.exists) {
        setImageURI(filesystemURI);
        return;
      }
      setImageURI(remoteURI);

      downloadResumable.current = FileSystem.createDownloadResumable(
        remoteURI,
        filesystemURI,
        {},
        (dp) => onDownloadUpdate(dp)
      );

      const imageObject = await downloadResumable.current.downloadAsync();
      if (mounted.current) {
        if (imageObject && imageObject.status == "200") {
          setImageURI(imageObject.uri);
        }
      }
    } catch (err) {
      console.log("Image download error:", err);
      if (mounted.current) {
        setImageURI(null);
      }
      const metadata = await FileSystem.getInfoAsync(filesystemURI);
      if (metadata.exists) {
        await FileSystem.deleteAsync(filesystemURI);
      }
    }
  };

  const onDownloadUpdate = async (
    downloadProgress: FileSystem.DownloadProgressData
  ) => {
    if (
      downloadProgress.totalBytesWritten >=
      downloadProgress.totalBytesExpectedToWrite
    ) {
      if (
        downloadResumable.current &&
        downloadResumable.current._removeSubscription
      ) {
        downloadResumable.current._removeSubscription();
      }
      downloadResumable.current = null;
    }
  };

  let src = imageURI ? { uri: imageURI } : source;
  const backgroundColor = src ? "transparent" : "rgba(0,0,0,0.1)";

  return (
    <View style={{ backgroundColor }}>
      <Image
        source={src}
        resizeMethod="auto"
        resizeMode="cover"
        style={style}
        loadingIndicatorSource={loadingIndicatorSource}
        {...rest}
      />
    </View>
  );
};

export default CachedPicture;
