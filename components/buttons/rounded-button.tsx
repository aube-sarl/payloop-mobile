import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function RoundedButton(props: {
  text: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    backgroundColor: "red",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "ClashDisplayMedium",
    fontSize: 18,
  },
});
