import {
  congoFlag,
  kenyaFlag,
  rwandaFlag,
  ugadanFlag,
  usFlag,
} from "@/assets/icons/_icons";
import CurrencyButton from "@/components/buttons/currency-button";
import HomeActionButton from "@/components/buttons/home-action-button";
import CreditCard from "@/components/cards/credit-card";
import SendMoneyForm from "@/components/forms/send-money-form";
import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [balanceVisible, setBalanceVisible] = useState(true);

  const currencies = [
    { currency: "USD", icon: usFlag },
    { currency: "CDF", icon: congoFlag },
    { currency: "RWF", icon: rwandaFlag },
    { currency: "KSH", icon: kenyaFlag },
    { currency: "UGX", icon: ugadanFlag },
  ];

  const getBalance = () => {
    switch (selectedCurrency) {
      case "USD": return "$1,500.44";
      case "CDF": return "3,000,880 CDF";
      case "RWF": return "1,200,000 RWF";
      case "KSH": return "195,000 KSH";
      case "UGX": return "5,500,000 UGX";
      default: return "$1,500.44";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Bonjour,</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <AntDesign name="bells" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Currency Selector */}
        <View style={styles.currencySection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.currencyContainer}
          >
            {currencies.map((currency) => (
              <CurrencyButton
                key={currency.currency}
                currency={currency.currency}
                icon={currency.icon}
                onPress={() => setSelectedCurrency(currency.currency)}
                selected={currency.currency === selectedCurrency}
              />
            ))}
          </ScrollView>
        </View>

        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>
            {selectedCurrency === "USD" ? "US Dollars" :
              selectedCurrency === "CDF" ? "Francs Congolais" :
                selectedCurrency === "RWF" ? "Francs Rwandais" :
                  selectedCurrency === "KSH" ? "Shillings Kenyans" :
                    "Shillings Ougandais"}
          </Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balance}>
              {balanceVisible ? getBalance() : "••••••"}
            </Text>
            <TouchableOpacity
              onPress={() => setBalanceVisible(!balanceVisible)}
              style={styles.eyeButton}
            >
              <Entypo
                name={balanceVisible ? "eye" : "eye-with-line"}
                size={24}
                color={Colors.text.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <View style={styles.actionRow}>
            <HomeActionButton
              text="Déposer"
              onPress={() => { }}
              icon={<AntDesign name="pluscircleo" size={24} color={Colors.primary.red} />}
            />
            <HomeActionButton
              text="Retirer"
              onPress={() => { }}
              icon={<Feather name="arrow-up-circle" size={24} color={Colors.light.icon} />}
            />
            <HomeActionButton
              text="Convertir"
              onPress={() => { }}
              icon={<AntDesign name="swap" size={24} color={Colors.primary.red} />}
            />
          </View>
        </View>

        {/* Send Money Form */}
        <SendMoneyForm />

        {/* Credit Cards Section */}
        <View style={styles.cardsSection}>
          <Text style={styles.sectionTitle}>Mes cartes</Text>
          <CreditCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.background.primary,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary.red,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontFamily: "ClashDisplaySemibold",
    color: Colors.text.white,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    fontFamily: "ClashDisplay",
    color: Colors.text.light,
  },
  userName: {
    fontSize: 18,
    fontFamily: "ClashDisplaySemibold",
    color: Colors.text.primary,
  },
  notificationButton: {
    padding: 8,
  },
  currencySection: {
    backgroundColor: Colors.background.primary,
    paddingBottom: 16,
  },
  currencyContainer: {
    paddingHorizontal: 24,
  },
  balanceSection: {
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  balanceLabel: {
    fontSize: 16,
    fontFamily: "ClashDisplayMedium",
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  balance: {
    fontSize: 36,
    fontFamily: "ClashDisplayBold",
    color: Colors.text.primary,
  },
  eyeButton: {
    padding: 8,
  },
  actionsSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  actionRow: {
    backgroundColor: "yellow",
    flexDirection: "row"
  },
  cardsSection: {
    paddingHorizontal: 4,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "ClashDisplaySemibold",
    color: Colors.text.primary,
    marginLeft: 20,
    marginBottom: 16,
  },
});
