import ScreenDimensions from "@/constants/screen-dimensions";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AmountInput from "../text-inputs/amount-input";

export default function SendMoneyForm() {
  return (
    <View style={styles.container}>
      <Text>Send Money</Text>
      <AmountInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: ScreenDimensions.width - 40,
    margin: 20,
    borderRadius: 20,
    height: 200,
  },
});
