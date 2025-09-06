import {
  congoFlag,
  kenyaFlag,
  rwandaFlag,
  ugadanFlag,
  usFlag,
} from "@/assets/icons/_icons";
import CurrencyBottomSheet from "@/components/bottom-sheets/currency-bottom-sheet";
import ReceiverBottomSheet from "@/components/bottom-sheets/receiver-bottom-sheet";
import CurrencyButton from "@/components/buttons/currency-button";
import HomeActionButton from "@/components/buttons/home-action-button";
import CreditCard from "@/components/cards/credit-card";
import SendMoneyForm from "@/components/forms/send-money-form";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [balanceVisible, setBalanceVisible] = useState(true);

  // Bottom sheet refs for the SendMoneyForm
  const currencyBottomSheetRef = useRef<BottomSheet>(null);
  const receiverBottomSheetRef = useRef<BottomSheet>(null);

  // State for SendMoneyForm currency selection
  const [sendFormCurrency, setSendFormCurrency] = useState("USD");
  const [sendFormCurrencyIcon, setSendFormCurrencyIcon] = useState(usFlag);
  const [sendFormReceiver, setSendFormReceiver] = useState<{ name: string; phone: string; } | undefined>(undefined);

  // State for second currency input (destination currency)
  const [destinationCurrency, setDestinationCurrency] = useState("CDF");
  const [destinationCurrencyIcon, setDestinationCurrencyIcon] = useState(congoFlag);

  // Additional bottom sheet ref for destination currency
  const destinationCurrencyBottomSheetRef = useRef<BottomSheet>(null);

  // Navigation handler functions
  const handleDeposit = () => {
    router.push("/deposit");
  };

  const handleWithdraw = () => {
    router.push("/withdraw");
  };

  const handleExchange = () => {
    router.push("/exchange");
  };

  const handleSendMoney = () => {
    router.push("/send-money");
  };

  const currencies = [
    { currency: "USD", icon: usFlag },
    { currency: "CDF", icon: congoFlag },
    { currency: "RWF", icon: rwandaFlag },
    { currency: "KSH", icon: kenyaFlag },
    { currency: "UGX", icon: ugadanFlag },
  ];

  const getBalance = () => {
    switch (selectedCurrency) {
      case "USD":
        return "$1,500.44";
      case "CDF":
        return "3,000,880 CDF";
      case "RWF":
        return "1,200,000 RWF";
      case "KSH":
        return "195,000 KSH";
      case "UGX":
        return "5,500,000 UGX";
      default:
        return "$1,500.44";
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
            {selectedCurrency === "USD"
              ? "US Dollars"
              : selectedCurrency === "CDF"
                ? "Francs Congolais"
                : selectedCurrency === "RWF"
                  ? "Francs Rwandais"
                  : selectedCurrency === "KSH"
                    ? "Shillings Kenyans"
                    : "Shillings Ougandais"}
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
              onPress={handleDeposit}
              icon={<AntDesign name="plus" size={24} color="white" />}
            />
            <HomeActionButton
              text="Retirer"
              onPress={handleWithdraw}
              icon={<AntDesign name="arrowup" size={24} color="white" />}
            />
            <HomeActionButton
              text="Echanger"
              onPress={handleExchange}
              icon={<AntDesign name="swap" size={24} color={"white"} />}
            />
            <HomeActionButton
              text="Envoyer"
              onPress={handleSendMoney}
              icon={
                <Feather name="send" size={24} color="white" />
              }
            />
          </View>
        </View>

        {/* Send Money Form */}
        <SendMoneyForm
          currencyBottomSheetRef={currencyBottomSheetRef}
          receiverBottomSheetRef={receiverBottomSheetRef}
          destinationCurrencyBottomSheetRef={destinationCurrencyBottomSheetRef}
          externalCurrency={sendFormCurrency}
          externalCurrencyIcon={sendFormCurrencyIcon}
          externalReceiver={sendFormReceiver}
          externalDestinationCurrency={destinationCurrency}
          externalDestinationCurrencyIcon={destinationCurrencyIcon}
          onCurrencyChange={(currency: string, icon: any) => {
            setSendFormCurrency(currency);
            setSendFormCurrencyIcon(icon);
          }}
          onReceiverChange={(receiver: { name: string; phone: string; }) => {
            setSendFormReceiver(receiver);
          }}
          onDestinationCurrencyChange={(currency: string, icon: any) => {
            setDestinationCurrency(currency);
            setDestinationCurrencyIcon(icon);
          }}
        />

        {/* Credit Cards Section */}
        <View style={styles.cardsSection}>
          <Text style={styles.sectionTitle}>Mes cartes</Text>
          <CreditCard />
        </View>
      </ScrollView>

      {/* Bottom Sheets - Rendered outside ScrollView to stay fixed */}
      <CurrencyBottomSheet
        ref={currencyBottomSheetRef}
        onSelectCurrency={(currency: string, icon: any) => {
          setSendFormCurrency(currency);
          setSendFormCurrencyIcon(icon);
        }}
        selectedCurrency={sendFormCurrency}
      />

      <ReceiverBottomSheet
        ref={receiverBottomSheetRef}
        onSelectReceiver={(receiver: any) => {
          setSendFormReceiver(receiver);
        }}
      />

      {/* Destination Currency Bottom Sheet */}
      <CurrencyBottomSheet
        ref={destinationCurrencyBottomSheetRef}
        onSelectCurrency={(currency: string, icon: any) => {
          setDestinationCurrency(currency);
          setDestinationCurrencyIcon(icon);
        }}
        selectedCurrency={destinationCurrency}
      />
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
    paddingHorizontal: 36,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
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
