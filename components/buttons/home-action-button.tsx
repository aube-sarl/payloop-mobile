import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function HomeActionButton(props: {
  text: string;
  onPress: () => void;
  icon: React.ReactNode;
}) {
  return (
    <TouchableOpacity style={styles.container}>
      {props.icon}
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
    flexDirection: "row",
    gap: 8,
  },
});
