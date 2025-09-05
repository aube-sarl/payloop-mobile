import ScreenDimensions from "@/constants/screen-dimensions";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AmountInput(props: { icon: any; currency: string }) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} inputMode="decimal" />
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          borderLeftWidth: 1,
          borderLeftColor: "#E5E5E5",
          paddingLeft: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Image
          source={props.icon}
          style={{ height: 25, width: 25, marginRight: 10 }}
        />
        <Text style={{ fontFamily: "ClashDisplayMedium", fontSize: 20 }}>
          {props.currency}
        </Text>
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
    width: ScreenDimensions.width - 160,
    paddingHorizontal: 10,
  },
});
