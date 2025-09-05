import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ReceiverSelectButton() {
  return (
    <TouchableOpacity style={{ backgroundColor: "white" }}>
      <View
        style={{
          height: 50,
          width: 50,
          backgroundColor: "red",
          borderRadius: 25,
        }}
      ></View>
      <Text style={{ fontFamily: "ClashDisplayMedium", fontSize: 16 }}>
        Choisir un destinataire
      </Text>
    </TouchableOpacity>
  );
}
