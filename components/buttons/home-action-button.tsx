import { Colors } from "@/constants/Colors";
import ScreenDimensions from "@/constants/screen-dimensions";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeActionButton(props: {
  text: string;
  onPress: () => void;
  icon: React.ReactNode;
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={{
        height: 60, width: 60,
        backgroundColor: Colors.primary.red,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"

      }}>
        {props.icon}
      </View>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    width: (ScreenDimensions.width - 48) / 2,
  },
  text: {
    fontFamily: "ClashDisplayMedium",
    fontSize: 16,
    color: Colors.text.primary,
  },
});
