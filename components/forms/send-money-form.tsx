import { congoFlag, usFlag } from "@/assets/icons/_icons";
import ScreenDimensions from "@/constants/screen-dimensions";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ReceiverSelectButton from "../buttons/receiver-select-button";
import RoundedButton from "../buttons/rounded-button";
import AmountInput from "../text-inputs/amount-input";
export default function SendMoneyForm() {
  return (
    <View style={styles.container}>
      <Text style={{}}>Send Money</Text>
      <AmountInput currency="USD" icon={usFlag} />
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="pluscircleo" size={16} color="black" />
          <Text style={{ marginLeft: 5, fontFamily: "ClashDisplay" }}>
            Frais de transfert = 14$
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="pluscircleo" size={16} color="black" />
          <Text style={{ marginLeft: 5, fontFamily: "ClashDisplay" }}>
            1 USD = 2000 CDF
          </Text>
        </View>
      </View>
      <AmountInput currency="CDF" icon={congoFlag} />
      <ReceiverSelectButton />
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
