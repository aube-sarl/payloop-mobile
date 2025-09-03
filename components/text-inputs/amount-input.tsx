import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function AmountInput() {
  return (
    <View style={styles.container}>
      <TextInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
  },
  textInput: { fontSize: 48 },
});
