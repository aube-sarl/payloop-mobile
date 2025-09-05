import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function AmountInput() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} inputMode="decimal" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 14,
  },
  textInput: {
    fontSize: 30,
    fontFamily: "ClashDisplayMedium",
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "red",
  },
});
