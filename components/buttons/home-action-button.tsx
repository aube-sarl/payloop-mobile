import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function HomeActionButton(props: {
  text: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={{ fontFamily: "ClashDisplayMedium", fontSize: 18 }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 20,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
});
