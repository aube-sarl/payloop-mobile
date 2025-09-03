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
        { backgroundColor: props.selected ? "black" : "white" },
      ]}
      onPress={props.onPress}
    >
      <Image
        source={props.icon}
        style={{ width: 24, height: 24, borderRadius: 12, marginRight: 8 }}
      />
      <Text
        style={{
          fontFamily: "ClashDisplayMedium",
          fontSize: 16,
          color: props.selected ? "white" : "gray",
        }}
      >
        {props.currency}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 80,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    paddingHorizontal: 5,
  },
});
