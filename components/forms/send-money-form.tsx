import { congoFlag, usFlag } from "@/assets/icons/_icons";
import { Colors } from "@/constants/Colors";
import ScreenDimensions from "@/constants/screen-dimensions";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CurrencyBottomSheet from "../bottom-sheets/currency-bottom-sheet";
import ReceiverBottomSheet from "../bottom-sheets/receiver-bottom-sheet";
import ReceiverSelectButton from "../buttons/receiver-select-button";
import RoundedButton from "../buttons/rounded-button";
import AmountInput from "../text-inputs/amount-input";

export default function SendMoneyForm() {
  const currencyBottomSheetRef = useRef<BottomSheet>(null);
  const receiverBottomSheetRef = useRef<BottomSheet>(null);

  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedCurrencyIcon, setSelectedCurrencyIcon] = useState(usFlag);
  const [selectedReceiver, setSelectedReceiver] = useState(null);

  const handleCurrencySelect = (currency: string, icon: any) => {
    setSelectedCurrency(currency);
    setSelectedCurrencyIcon(icon);
  };

  const handleReceiverSelect = (receiver: any) => {
    setSelectedReceiver(receiver);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Envoyer de l'argent</Text>

        <AmountInput
          currency={selectedCurrency}
          icon={selectedCurrencyIcon}
          onCurrencyPress={() => currencyBottomSheetRef.current?.expand()}
        />

        <View style={styles.feeContainer}>
          <View style={styles.feeItem}>
            <AntDesign name="pluscircleo" size={16} color={Colors.primary.red} />
            <Text style={styles.feeText}>Frais de transfert = 14$</Text>
          </View>
          <View style={styles.feeItem}>
            <AntDesign name="pluscircleo" size={16} color={Colors.primary.red} />
            <Text style={styles.feeText}>1 USD = 2000 CDF</Text>
          </View>
        </View>

        <AmountInput currency="CDF" icon={congoFlag} />

        <ReceiverSelectButton
          onPress={() => receiverBottomSheetRef.current?.expand()}
          selectedReceiver={selectedReceiver}
        />

        <RoundedButton
          text="Envoyer"
          onPress={() => {
            // Handle send money logic
            console.log("Sending money...");
          }}
        />
      </View>

      <CurrencyBottomSheet
        ref={currencyBottomSheetRef}
        onSelectCurrency={handleCurrencySelect}
        selectedCurrency={selectedCurrency}
      />

      <ReceiverBottomSheet
        ref={receiverBottomSheetRef}
        onSelectReceiver={handleReceiverSelect}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.cardElevated,
    width: ScreenDimensions.width - 40,
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "ClashDisplaySemibold",
    color: Colors.text.primary,
    marginBottom: 20,
  },
  feeContainer: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  feeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  feeText: {
    marginLeft: 8,
    fontFamily: "ClashDisplay",
    fontSize: 14,
    color: Colors.text.secondary,
  },
});
