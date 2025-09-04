import {
  congoFlag,
  kenyaFlag,
  rwandaFlag,
  ugadanFlag,
  usFlag,
} from "@/assets/icons/_icons";
import CurrencyButton from "@/components/buttons/currency-button";
import HomeActionButton from "@/components/buttons/home-action-button";
import SendMoneyForm from "@/components/forms/send-money-form";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const currencies = [
    { currency: "USD", icon: usFlag },
    { currency: "CDF", icon: congoFlag },
    { currency: "RWF", icon: rwandaFlag },
    { currency: "KSH", icon: kenyaFlag },
    { currency: "UGX", icon: ugadanFlag },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ height: 60, flexDirection: "row", padding: 10 }}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: "yellow",
            }}
          />
        </View>

        <View style={{ height: 60 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
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
        </View>
        <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
          <Text style={{ fontFamily: "ClashDisplayMedium", fontSize: 24 }}>
            US Dollars
          </Text>
          <Text style={{ fontFamily: "ClashDisplaySemibold", fontSize: 44 }}>
            $ 1500.44
          </Text>
          <Entypo name="eye" size={24} color="black" />
        </View>
        <View>
          <HomeActionButton
            text="Deposer"
            icon={<AntDesign name="pluscircleo" size={24} color="black" />}
          />
          <HomeActionButton
            text="Retirer"
            icon={<Feather name="arrow-up-circle" size={24} color="black" />}
          />
          <HomeActionButton text="Deposer" />
          <HomeActionButton
            text="Envoyer"
            icon={<Feather name="send" size={24} color="black" />}
          />
        </View>

        <SendMoneyForm />
        <View>
          <Text style={{ fontFamily: "ClashDisplayMedium", fontSize: 24 }}>
            Mes cartes
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
