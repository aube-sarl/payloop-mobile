import { Colors } from "@/constants/Colors";
import ScreenDimensions from "@/constants/screen-dimensions";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function HomeActionButton(props: {
  text: string;
  onPress: () => void;
  icon: React.ReactNode;
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      {props.icon}
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    borderRadius: 16,
    backgroundColor: Colors.background.cardElevated,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    width: (ScreenDimensions.width - 48) / 2,
  },
  text: {
    fontFamily: "ClashDisplayMedium",
    fontSize: 16,
    color: Colors.text.primary,
  },
});
