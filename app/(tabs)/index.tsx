import {
  congoFlag,
  kenyaFlag,
  rwandaFlag,
  ugadanFlag,
  usFlag,
} from "@/assets/icons/_icons";
import CurrencyButton from "@/components/buttons/currency-button";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const currencies = [
    {
      currency: "USD",
      icon: usFlag,
    },
    {
      currency: "CDF",
      icon: congoFlag,
    },
    {
      currency: "RWF",
      icon: rwandaFlag,
    },
    {
      currency: "KSH",
      icon: kenyaFlag,
    },
    {
      currency: "UGX",
      icon: ugadanFlag,
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 60, flexDirection: "row", padding: 10 }}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: "yellow",
          }}
        ></View>
      </View>
      <ScrollView style={{ height: 60 }} horizontal>
        {currencies.map((currency) => (
          <CurrencyButton
            key={currency.currency}
            currency={currency.currency}
            icon={currency.icon}
            onPress={() => {}}
            selected={currency.currency === "USD"}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
