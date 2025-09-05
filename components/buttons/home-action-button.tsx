import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeActionButton(props: {
  text: string;
  onPress: () => void;
  icon: React.ReactNode;
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.iconContainer}>
        {props.icon}
      </View>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    height: 48,
    backgroundColor: Colors.primary.black,
    shadowColor: Colors.primary.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    width: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "ClashDisplayMedium",
    fontSize: 14,
    color: Colors.text.white,
    textAlign: "center",
  },
});
