import { congoFlag, usFlag } from "@/assets/icons/_icons";
import { Colors } from "@/constants/Colors";
import ScreenDimensions from "@/constants/screen-dimensions";
import { validateAmount, validateCurrency, validateReceiver } from "@/utils/validation";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CurrencyBottomSheet from "../bottom-sheets/currency-bottom-sheet";
import ReceiverBottomSheet from "../bottom-sheets/receiver-bottom-sheet";
import ReceiverSelectButton from "../buttons/receiver-select-button";
import RoundedButton from "../buttons/rounded-button";
import AmountInput from "../text-inputs/amount-input";

interface SendMoneyFormProps {
  onComplete?: () => void;
  onCancel?: () => void;
}

export default function SendMoneyForm({ onComplete, onCancel }: SendMoneyFormProps = {}) {
  const currencyBottomSheetRef = useRef<BottomSheet>(null);
  const receiverBottomSheetRef = useRef<BottomSheet>(null);

  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedCurrencyIcon, setSelectedCurrencyIcon] = useState(usFlag);
  const [selectedReceiver, setSelectedReceiver] = useState<{ name: string; phone: string; } | undefined>(undefined);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [amountError, setAmountError] = useState<string>("");
  const [currencyError, setCurrencyError] = useState<string>("");
  const [receiverError, setReceiverError] = useState<string>("");
  const [generalError, setGeneralError] = useState<string>("");

  const handleCurrencySelect = (currency: string, icon: any) => {
    setSelectedCurrency(currency);
    setSelectedCurrencyIcon(icon);
    // Clear currency error when currency is selected
    setCurrencyError("");
  };

  const handleReceiverSelect = (receiver: { name: string; phone: string; }) => {
    setSelectedReceiver(receiver);
    // Clear receiver error when receiver is selected
    setReceiverError("");
  };

  // Handle amount change with validation
  const handleAmountChange = (text: string) => {
    setAmount(text);
    // Clear amount error when user starts typing
    if (amountError) {
      setAmountError("");
    }
    // Clear general error when user makes changes
    if (generalError) {
      setGeneralError("");
    }
  };

  // Validate all inputs
  const validateInputs = () => {
    let isValid = true;

    // Validate amount
    const amountValidation = validateAmount(amount);
    if (!amountValidation.isValid) {
      setAmountError(amountValidation.error || "");
      isValid = false;
    } else {
      setAmountError("");
    }

    // Validate currency selection
    const currencyValidation = validateCurrency(selectedCurrency);
    if (!currencyValidation.isValid) {
      setCurrencyError(currencyValidation.error || "");
      isValid = false;
    } else {
      setCurrencyError("");
    }

    // Validate receiver selection
    const receiverValidation = validateReceiver(selectedReceiver);
    if (!receiverValidation.isValid) {
      setReceiverError(receiverValidation.error || "");
      isValid = false;
    } else {
      setReceiverError("");
    }

    return isValid;
  };

  // Handle send money completion
  const handleSendMoney = async () => {
    // Clear previous errors
    setGeneralError("");

    // Validate all inputs
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for send money processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Call completion callback if provided
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error("Send money failed:", error);
      setGeneralError("Send money failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Envoyer de l&apos;argent</Text>

        <AmountInput
          currency={selectedCurrency}
          icon={selectedCurrencyIcon}
          onCurrencyPress={() => currencyBottomSheetRef.current?.expand()}
          value={amount}
          onChangeText={handleAmountChange}
          placeholder="0.00"
          hasError={!!amountError}
        />

        {/* Amount error message */}
        {amountError ? (
          <Text style={styles.errorText}>{amountError}</Text>
        ) : null}

        <View style={styles.feeContainer}>
          <View style={styles.feeItem}>
            <AntDesign
              name="pluscircleo"
              size={16}
              color={Colors.primary.red}
            />
            <Text style={styles.feeText}>Frais de transfert = 14$</Text>
          </View>
          <View style={styles.feeItem}>
            <AntDesign
              name="pluscircleo"
              size={16}
              color={Colors.primary.red}
            />
            <Text style={styles.feeText}>1 USD = 2000 CDF</Text>
          </View>
        </View>

        <AmountInput currency="CDF" icon={congoFlag} />

        <ReceiverSelectButton
          onPress={() => receiverBottomSheetRef.current?.expand()}
          selectedReceiver={selectedReceiver}
        />

        {/* Receiver error message */}
        {receiverError ? (
          <Text style={styles.errorText}>{receiverError}</Text>
        ) : null}

        {/* Currency error message */}
        {currencyError ? (
          <Text style={styles.errorText}>{currencyError}</Text>
        ) : null}

        {/* General error message */}
        {generalError ? (
          <View style={styles.generalErrorContainer}>
            <Text style={styles.generalErrorText}>{generalError}</Text>
          </View>
        ) : null}

        <RoundedButton
          text={isLoading ? "Envoi en cours..." : "Envoyer"}
          onPress={handleSendMoney}
          disabled={isLoading}
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
    backgroundColor: Colors.light.background,
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
  errorText: {
    fontSize: 14,
    fontFamily: "ClashDisplayMedium",
    color: Colors.primary.red,
    marginTop: -12,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  generalErrorContainer: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary.red,
  },
  generalErrorText: {
    fontSize: 14,
    fontFamily: "ClashDisplayMedium",
    color: Colors.primary.red,
    textAlign: "center",
  },
});
