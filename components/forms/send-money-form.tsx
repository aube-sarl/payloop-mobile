import { congoFlag, usFlag } from "@/assets/icons/_icons";
import { Colors } from "@/constants/Colors";
import ScreenDimensions from "@/constants/screen-dimensions";
import { validateAmount, validateCurrency, validateReceiver } from "@/utils/validation";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CurrencyBottomSheet from "../bottom-sheets/currency-bottom-sheet";
import ReceiverBottomSheet from "../bottom-sheets/receiver-bottom-sheet";
import ReceiverSelectButton from "../buttons/receiver-select-button";
import RoundedButton from "../buttons/rounded-button";
import AmountInput from "../text-inputs/amount-input";

interface SendMoneyFormProps {
  onComplete?: () => void;
  onCancel?: () => void;
  currencyBottomSheetRef?: React.RefObject<BottomSheet | null>;
  receiverBottomSheetRef?: React.RefObject<BottomSheet | null>;
  externalCurrency?: string;
  externalCurrencyIcon?: any;
  externalReceiver?: { name: string; phone: string; } | undefined;
  onCurrencyChange?: (currency: string, icon: any) => void;
  onReceiverChange?: (receiver: { name: string; phone: string; }) => void;
  destinationCurrencyBottomSheetRef?: React.RefObject<BottomSheet | null>;
  externalDestinationCurrency?: string;
  externalDestinationCurrencyIcon?: any;
  onDestinationCurrencyChange?: (currency: string, icon: any) => void;
}

export default function SendMoneyForm({
  onComplete,
  onCancel,
  currencyBottomSheetRef,
  receiverBottomSheetRef,
  externalCurrency,
  externalCurrencyIcon,
  externalReceiver,
  onCurrencyChange,
  onReceiverChange,
  destinationCurrencyBottomSheetRef,
  externalDestinationCurrency,
  externalDestinationCurrencyIcon,
  onDestinationCurrencyChange
}: SendMoneyFormProps = {}) {
  // Use provided refs or create local ones as fallback
  const localCurrencyRef = useRef<BottomSheet>(null);
  const localReceiverRef = useRef<BottomSheet>(null);
  const localDestinationCurrencyRef = useRef<BottomSheet>(null);

  const currencyRef = currencyBottomSheetRef || localCurrencyRef;
  const receiverRef = receiverBottomSheetRef || localReceiverRef;
  const destinationCurrencyRef = destinationCurrencyBottomSheetRef || localDestinationCurrencyRef;

  // Use external state if provided, otherwise use local state
  const [localSelectedCurrency, setLocalSelectedCurrency] = useState("USD");
  const [localSelectedCurrencyIcon, setLocalSelectedCurrencyIcon] = useState(usFlag);
  const [localSelectedReceiver, setLocalSelectedReceiver] = useState<{ name: string; phone: string; } | undefined>(undefined);
  const [localDestinationCurrency, setLocalDestinationCurrency] = useState("CDF");
  const [localDestinationCurrencyIcon, setLocalDestinationCurrencyIcon] = useState(congoFlag);

  const selectedCurrency = externalCurrency || localSelectedCurrency;
  const selectedCurrencyIcon = externalCurrencyIcon || localSelectedCurrencyIcon;
  const selectedReceiver = externalReceiver || localSelectedReceiver;
  const destinationCurrency = externalDestinationCurrency || localDestinationCurrency;
  const destinationCurrencyIcon = externalDestinationCurrencyIcon || localDestinationCurrencyIcon;
  const [amount, setAmount] = useState("");
  const [destinationAmount, setDestinationAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingFromSource, setIsUpdatingFromSource] = useState(false);
  const [isUpdatingFromDestination, setIsUpdatingFromDestination] = useState(false);
  const [amountError, setAmountError] = useState<string>("");
  const [currencyError, setCurrencyError] = useState<string>("");
  const [receiverError, setReceiverError] = useState<string>("");
  const [generalError, setGeneralError] = useState<string>("");

  const handleCurrencySelect = (currency: string, icon: any) => {
    if (onCurrencyChange) {
      onCurrencyChange(currency, icon);
    } else {
      setLocalSelectedCurrency(currency);
      setLocalSelectedCurrencyIcon(icon);
    }
    // Clear currency error when currency is selected
    setCurrencyError("");

    // Recalculate destination amount when source currency changes
    if (amount) {
      const rate = getExchangeRate(currency, destinationCurrency);
      const convertedAmount = (parseFloat(amount) * rate).toFixed(2);
      setDestinationAmount(convertedAmount);
    }
  };

  const handleReceiverSelect = (receiver: { name: string; phone: string; }) => {
    if (onReceiverChange) {
      onReceiverChange(receiver);
    } else {
      setLocalSelectedReceiver(receiver);
    }
    // Clear receiver error when receiver is selected
    setReceiverError("");
  };

  const handleDestinationCurrencySelect = (currency: string, icon: any) => {
    if (onDestinationCurrencyChange) {
      onDestinationCurrencyChange(currency, icon);
    } else {
      setLocalDestinationCurrency(currency);
      setLocalDestinationCurrencyIcon(icon);
    }
    // Recalculate destination amount when currency changes
    if (amount) {
      const rate = getExchangeRate(selectedCurrency, currency);
      const convertedAmount = (parseFloat(amount) * rate).toFixed(2);
      setDestinationAmount(convertedAmount);
    }
  };

  // Exchange rate calculation function
  const getExchangeRate = (fromCurrency: string, toCurrency: string): number => {
    // Mock exchange rates - in a real app, this would come from an API
    const rates: { [key: string]: { [key: string]: number } } = {
      USD: {
        CDF: 2000,
        RWF: 1200,
        KSH: 130,
        UGX: 3700,
        USD: 1
      },
      CDF: {
        USD: 0.0005,
        RWF: 0.6,
        KSH: 0.065,
        UGX: 1.85,
        CDF: 1
      },
      RWF: {
        USD: 0.00083,
        CDF: 1.67,
        KSH: 0.108,
        UGX: 3.08,
        RWF: 1
      },
      KSH: {
        USD: 0.0077,
        CDF: 15.38,
        RWF: 9.23,
        UGX: 28.46,
        KSH: 1
      },
      UGX: {
        USD: 0.00027,
        CDF: 0.54,
        RWF: 0.32,
        KSH: 0.035,
        UGX: 1
      }
    };

    return rates[fromCurrency]?.[toCurrency] || 1;
  };

  // Get current exchange rate for display
  const currentExchangeRate = getExchangeRate(selectedCurrency, destinationCurrency);

  // Update amounts when currencies change from external props
  useEffect(() => {
    if (amount && !isUpdatingFromDestination) {
      const rate = getExchangeRate(selectedCurrency, destinationCurrency);
      const convertedAmount = (parseFloat(amount) * rate).toFixed(2);
      setDestinationAmount(convertedAmount);
    }
  }, [selectedCurrency, destinationCurrency, amount, isUpdatingFromDestination]);

  // Handle source amount change with validation
  const handleAmountChange = (text: string) => {
    if (isUpdatingFromDestination) return; // Prevent circular updates

    setAmount(text);
    setIsUpdatingFromSource(true);

    // Calculate destination amount
    if (text && !isNaN(parseFloat(text))) {
      const rate = getExchangeRate(selectedCurrency, destinationCurrency);
      const convertedAmount = (parseFloat(text) * rate).toFixed(2);
      setDestinationAmount(convertedAmount);
    } else {
      setDestinationAmount("");
    }

    // Clear amount error when user starts typing
    if (amountError) {
      setAmountError("");
    }
    // Clear general error when user makes changes
    if (generalError) {
      setGeneralError("");
    }

    setTimeout(() => setIsUpdatingFromSource(false), 100);
  };

  // Handle destination amount change
  const handleDestinationAmountChange = (text: string) => {
    if (isUpdatingFromSource) return; // Prevent circular updates

    setDestinationAmount(text);
    setIsUpdatingFromDestination(true);

    // Calculate source amount (reverse conversion)
    if (text && !isNaN(parseFloat(text))) {
      const rate = getExchangeRate(destinationCurrency, selectedCurrency);
      const convertedAmount = (parseFloat(text) * rate).toFixed(2);
      setAmount(convertedAmount);
    } else {
      setAmount("");
    }

    // Clear amount error when user starts typing
    if (amountError) {
      setAmountError("");
    }
    // Clear general error when user makes changes
    if (generalError) {
      setGeneralError("");
    }

    setTimeout(() => setIsUpdatingFromDestination(false), 100);
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
          onCurrencyPress={() => currencyRef.current?.expand()}
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
            <Text style={styles.feeText}>
              1 {selectedCurrency} = {currentExchangeRate.toLocaleString()} {destinationCurrency}
            </Text>
          </View>
        </View>

        <AmountInput
          currency={destinationCurrency}
          icon={destinationCurrencyIcon}
          onCurrencyPress={() => destinationCurrencyRef.current?.expand()}
          value={destinationAmount}
          onChangeText={handleDestinationAmountChange}
          placeholder="0.00"
        />

        <ReceiverSelectButton
          onPress={() => receiverRef.current?.expand()}
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

      {/* Render bottom sheets only if no external refs provided (for standalone usage) */}
      {!currencyBottomSheetRef && (
        <CurrencyBottomSheet
          ref={localCurrencyRef}
          onSelectCurrency={handleCurrencySelect}
          selectedCurrency={selectedCurrency}
        />
      )}

      {!receiverBottomSheetRef && (
        <ReceiverBottomSheet
          ref={localReceiverRef}
          onSelectReceiver={handleReceiverSelect}
        />
      )}

      {!destinationCurrencyBottomSheetRef && (
        <CurrencyBottomSheet
          ref={localDestinationCurrencyRef}
          onSelectCurrency={handleDestinationCurrencySelect}
          selectedCurrency={destinationCurrency}
        />
      )}
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
