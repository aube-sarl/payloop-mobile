import ScreenDimensions from "@/constants/screen-dimensions";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RoundedButton from "../buttons/rounded-button";
import AmountInput from "../text-inputs/amount-input";

export default function SendMoneyForm() {
  return (
    <View style={styles.container}>
      <Text>Send Money</Text>
      <AmountInput />
      <AmountInput />
      <RoundedButton text="Envoyer" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    width: ScreenDimensions.width - 40,
    margin: 20,
    borderRadius: 20,
    padding: 5,
  },
});
