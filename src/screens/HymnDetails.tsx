// src/screens/HymnDetails.tsx
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions, Platform, LayoutChangeEvent } from "react-native";
import { useTheme, Appbar, IconButton } from "react-native-paper";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/MainNavigator";
import { PinchGestureHandler, PinchGestureHandlerGestureEvent, HandlerStateChangeEvent, State } from "react-native-gesture-handler";
import HymnService from "../services/Hymn/HymnService";
import { HymnModel } from "../domain/HymnModel";

type HymnDetailsRouteProp = RouteProp<RootStackParamList, "HymnDetails">;

const StyledChordText = ({ text, style }: { text: string; style: any }) => {
  const theme = useTheme();
  const parts = text.split(/([^_]+)/g).filter(Boolean);

  return (
    <Text style={style}>
      {parts.map((part, index) =>
        part.includes("_") ? (
          <Text key={index}>{part}</Text>
        ) : (
          <Text key={index} style={{ color: theme.colors.primary }}>
            {part}
          </Text>
        ),
      )}
    </Text>
  );
};

const HymnDetails = () => {
  const theme = useTheme();
  const FONT_SIZE_INITIAL = 16;

  const route = useRoute<HymnDetailsRouteProp>();
  const navigation = useNavigation();
  const { hymnCode: hymnCode } = route.params;

  const [fontSize, setFontSize] = useState(FONT_SIZE_INITIAL);
  const [fontSizeQuarter, setFontSizeQuarter] = useState(Math.floor(FONT_SIZE_INITIAL / 4));
  const [fontSizeDouble, setFontSizeDouble] = useState(Math.floor(FONT_SIZE_INITIAL * 2));
  const [hymn, setHymn] = useState<HymnModel | null>(null);

  const [fontSizeReference, setFontSizeReference] = useState(FONT_SIZE_INITIAL);
  const [title, setTitle] = useState<string>("");
  const [isPortrait, setIsPortrait] = useState(true);
  const [verseHeights, setVerseHeights] = useState<{ [key: string]: number }>({});

  const adjustChord = (chordStr: string, lyricStr: string) => {
    let adjustedChord = "";
    lyricStr = lyricStr.padEnd(chordStr.length, " ");
    for (let i = 0; i < lyricStr.length; i++) {
      let chordChar = chordStr[i] || " ";
      adjustedChord += lyricStr[i] !== " " && chordChar === " " ? "_" : chordChar;
    }
    return adjustedChord;
  };

  const onPinchEvent = (event: PinchGestureHandlerGestureEvent) => {
    if (event.nativeEvent.scale) {
      const fontMinSize = 10;
      const fontMaxSize = 72;
      let fontSize = Math.floor(Math.max(fontMinSize, Math.min(fontMaxSize, fontSizeReference * event.nativeEvent.scale)));
      setFontSize(fontSize);
      setFontSizeQuarter(Math.floor(fontSize / 4));
      setFontSizeDouble(Math.floor(fontSize * 2));
    }
  };

  const onPinchStateEvent = (event: HandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setFontSizeReference(fontSize);
    }
  };

  const onVerseLayout = (event: LayoutChangeEvent, stanzaIndex: number, verseIndex: number) => {
    const { height } = event.nativeEvent.layout;
    setVerseHeights((prev) => ({
      ...prev,
      [`${stanzaIndex}-${verseIndex}`]: height,
    }));
  };

  const shouldShowHeader = Platform.OS === "web" || isPortrait;

  useEffect(() => {
    const fetchContent = async () => {
      const hymn = await HymnService.getHymn(hymnCode);
      console.log("Hymn fetched:", hymn);
      if (hymn) {
        if (hymn.score?.stanzas) {
          hymn.score.stanzas = hymn.score.stanzas.map((stanza) => ({
            ...stanza,
            verses: stanza.verses?.map((verse) => ({
              ...verse,
              chords: adjustChord(verse.chords || "", verse.lyrics || ""),
            })),
          }));
        }
        setHymn(hymn);
        setTitle(`${hymn.code} - ${hymn.title}`);
      } else {
        setTitle(`${hymnCode} - Hymn not found`);
      }
    };
    fetchContent();
  }, [hymnCode]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      const isPortrait = window.height > window.width;
      setIsPortrait(isPortrait);
    });
    setIsPortrait(Dimensions.get("window").height > Dimensions.get("window").width);
    return () => subscription.remove();
  }, []);

  return (
    <View style={{ ...theme, flex: 1 }}>
      {shouldShowHeader && (
        <Appbar.Header elevated={true}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title={title} />
          <IconButton
            icon="information"
            onPress={() => {
              /* Toggle detail HymnDetail */
            }}
          />
        </Appbar.Header>
      )}

      <PinchGestureHandler onGestureEvent={onPinchEvent} onHandlerStateChange={onPinchStateEvent}>
        <ScrollView contentContainerStyle={[styles.content, isPortrait ? styles.portrait : styles.landscape]}>
          <View style={[styles.score, { marginBottom: fontSizeQuarter }]}>
            {hymn?.score?.stanzas.map((stanza, stanzaIndex) => (
              <View key={`${stanzaIndex}`} style={[styles.stanza, { marginBottom: fontSize }]}>
                {stanza.verses?.map((verse, verseIndex) => {
                  const verseKey = `${stanzaIndex}-${verseIndex}`;
                  const verseHeight = verseHeights[verseKey] || fontSizeDouble;

                  return (
                    <View
                      key={verseKey}
                      style={[
                        styles.verse,
                        {
                          height: verseHeight,
                          marginBottom: fontSize,
                        },
                      ]}
                    >
                      <StyledChordText
                        text={verse.chords}
                        style={[
                          styles.chord,
                          {
                            fontSize: fontSize,
                            lineHeight: fontSizeDouble,
                          },
                        ]}
                      />
                      <Text
                        style={[
                          styles.lyric,
                          {
                            top: fontSize,
                            fontSize: fontSize,
                            lineHeight: fontSizeDouble,
                          },
                        ]}
                        onLayout={(e) => onVerseLayout(e, stanzaIndex, verseIndex)}
                      >
                        {verse.lyrics}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </PinchGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
  },
  hymnText: {
    fontFamily: "UbuntuMonoRegular",
  },
  portrait: {},
  landscape: {
    alignSelf: "center",
    width: "100%",
  },

  score: {},
  stanza: {},
  verse: {
    position: "relative",
  },
  chord: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    fontFamily: "UbuntuMonoRegular",
    color: "transparent", // Make the underscores transparent
    zIndex: 1,
  },
  lyric: {
    position: "absolute",
    left: 0,
    right: 0,
    fontFamily: "UbuntuMonoRegular",
  },
});

export default HymnDetails;
