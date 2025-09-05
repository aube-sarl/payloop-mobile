import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CurrencyButton(props: {
  selected?: boolean;
  onPress: () => void;
  currency: string;
  icon: any;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: props.selected
            ? Colors.primary.red
            : Colors.background.cardElevated,
        },
      ]}
      onPress={props.onPress}
    >
      <Image
        source={props.icon}
        style={styles.icon}
      />
      <Text
        style={[
          styles.text,
          {
            color: props.selected ? Colors.text.white : Colors.text.secondary,
          },
        ]}
      >
        {props.currency}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  text: {
    fontFamily: "ClashDisplayMedium",
    fontSize: 16,
  },
});
