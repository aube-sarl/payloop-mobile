import { congoFlag } from "@/assets/icons/_icons";
import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AmountInput(props: { icon: any; currency: string }) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} inputMode="decimal" />
      <TouchableOpacity
        style={{ backgroundColor: "white", borderLeftWidth: 1 }}
      >
        <Image source={congoFlag} style={{ height: 30, width: 30 }} />
      </TouchableOpacity>
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
