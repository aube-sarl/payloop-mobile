import { congoFlag, usFlag } from "@/assets/icons/_icons";
import CurrencyBottomSheet from "@/components/bottom-sheets/currency-bottom-sheet";
import RoundedButton from "@/components/buttons/rounded-button";
import AmountInput from "@/components/text-inputs/amount-input";
import ModalContainer from "@/components/ui/modal-container";
import { Colors } from "@/constants/Colors";
import { validateAmount, validateCurrencyExchange } from "@/utils/validation";
import { AntDesign } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

// Mock exchange rates - in a real app, this would come from an API
const EXCHANGE_RATES: { [key: string]: number } = {
    "USD-CDF": 2000,
    "USD-EUR": 0.85,
    "USD-GBP": 0.73,
    "CDF-USD": 0.0005,
    "CDF-EUR": 0.000425,
    "CDF-GBP": 0.000365,
    "EUR-USD": 1.18,
    "EUR-CDF": 2353,
    "EUR-GBP": 0.86,
    "GBP-USD": 1.37,
    "GBP-CDF": 2740,
    "GBP-EUR": 1.16,
};

export default function ExchangeScreen() {
    const router = useRouter();
    const originCurrencyBottomSheetRef = useRef<BottomSheet>(null);
    const destinationCurrencyBottomSheetRef = useRef<BottomSheet>(null);

    // State management for origin and destination currencies and amounts
    const [originAmount, setOriginAmount] = useState("");
    const [originCurrency, setOriginCurrency] = useState("USD");
    const [originCurrencyIcon, setOriginCurrencyIcon] = useState(usFlag);

    const [destinationAmount, setDestinationAmount] = useState("");
    const [destinationCurrency, setDestinationCurrency] = useState("CDF");
    const [destinationCurrencyIcon, setDestinationCurrencyIcon] = useState(congoFlag);

    const [isLoading, setIsLoading] = useState(false);
    const [activeInput, setActiveInput] = useState<"origin" | "destination">("origin");
    const [originAmountError, setOriginAmountError] = useState<string>("");
    const [destinationAmountError, setDestinationAmountError] = useState<string>("");
    const [currencyError, setCurrencyError] = useState<string>("");
    const [generalError, setGeneralError] = useState<string>("");

    // Exchange rate calculation logic between currencies
    const calculateExchangeRate = (from: string, to: string): number => {
        if (from === to) return 1;
        const rateKey = `${from}-${to}`;
        return EXCHANGE_RATES[rateKey] || 1;
    };

    // Update destination amount when origin amount or currencies change
    useEffect(() => {
        if (activeInput === "origin" && originAmount) {
            const rate = calculateExchangeRate(originCurrency, destinationCurrency);
            const convertedAmount = (parseFloat(originAmount) * rate).toFixed(2);
            setDestinationAmount(convertedAmount);
        }
    }, [originAmount, originCurrency, destinationCurrency, activeInput]);

    // Update origin amount when destination amount changes
    useEffect(() => {
        if (activeInput === "destination" && destinationAmount) {
            const rate = calculateExchangeRate(destinationCurrency, originCurrency);
            const convertedAmount = (parseFloat(destinationAmount) * rate).toFixed(2);
            setOriginAmount(convertedAmount);
        }
    }, [destinationAmount, originCurrency, destinationCurrency, activeInput]);

    // Handle currency selection for origin currency
    const handleOriginCurrencySelect = (currency: string, icon: any) => {
        setOriginCurrency(currency);
        setOriginCurrencyIcon(icon);
        // Clear currency error when currency is selected
        setCurrencyError("");
    };

    // Handle currency selection for destination currency
    const handleDestinationCurrencySelect = (currency: string, icon: any) => {
        setDestinationCurrency(currency);
        setDestinationCurrencyIcon(icon);
        // Clear currency error when currency is selected
        setCurrencyError("");
    };

    // Open origin currency selection bottom sheet
    const handleOriginCurrencyPress = () => {
        originCurrencyBottomSheetRef.current?.expand();
    };

    // Open destination currency selection bottom sheet
    const handleDestinationCurrencyPress = () => {
        destinationCurrencyBottomSheetRef.current?.expand();
    };

    // Handle origin amount change
    const handleOriginAmountChange = (text: string) => {
        setActiveInput("origin");
        setOriginAmount(text);
        // Clear origin amount error when user starts typing
        if (originAmountError) {
            setOriginAmountError("");
        }
        // Clear general error when user makes changes
        if (generalError) {
            setGeneralError("");
        }
    };

    // Handle destination amount change
    const handleDestinationAmountChange = (text: string) => {
        setActiveInput("destination");
        setDestinationAmount(text);
        // Clear destination amount error when user starts typing
        if (destinationAmountError) {
            setDestinationAmountError("");
        }
        // Clear general error when user makes changes
        if (generalError) {
            setGeneralError("");
        }
    };

    // Validate all inputs
    const validateInputs = () => {
        let isValid = true;

        // Validate origin amount
        const originAmountValidation = validateAmount(originAmount);
        if (!originAmountValidation.isValid) {
            setOriginAmountError(originAmountValidation.error || "");
            isValid = false;
        } else {
            setOriginAmountError("");
        }

        // Validate currency exchange (different currencies)
        const currencyValidation = validateCurrencyExchange(originCurrency, destinationCurrency);
        if (!currencyValidation.isValid) {
            setCurrencyError(currencyValidation.error || "");
            isValid = false;
        } else {
            setCurrencyError("");
        }

        return isValid;
    };

    // Handle exchange confirmation with validation
    const handleConfirmExchange = async () => {
        // Clear previous errors
        setGeneralError("");

        // Validate all inputs
        if (!validateInputs()) {
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call for exchange processing
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Navigate back to home screen on completion
            router.back();
        } catch (error) {
            console.error("Exchange failed:", error);
            setGeneralError("Exchange failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle cancellation - navigate back to home screen
    const handleCancel = () => {
        router.back();
    };

    const exchangeRate = calculateExchangeRate(originCurrency, destinationCurrency);

    return (
        <ModalContainer title="Exchange" onClose={handleCancel}>
            <Text style={styles.subtitle}>Convert between currencies</Text>

            {/* Origin currency input */}
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>From</Text>
                <AmountInput
                    icon={originCurrencyIcon}
                    currency={originCurrency}
                    onCurrencyPress={handleOriginCurrencyPress}
                    value={originAmount}
                    onChangeText={handleOriginAmountChange}
                    placeholder="0.00"
                    hasError={!!originAmountError}
                />
                {/* Origin amount error message */}
                {originAmountError ? (
                    <Text style={styles.errorText}>{originAmountError}</Text>
                ) : null}
            </View>

            {/* Exchange rate display */}
            <View style={styles.exchangeRateContainer}>
                <AntDesign name="swap" size={20} color={Colors.text.secondary} />
                <Text style={styles.exchangeRateText}>
                    1 {originCurrency} = {exchangeRate.toFixed(4)} {destinationCurrency}
                </Text>
            </View>

            {/* Destination currency input */}
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>To</Text>
                <AmountInput
                    icon={destinationCurrencyIcon}
                    currency={destinationCurrency}
                    onCurrencyPress={handleDestinationCurrencyPress}
                    value={destinationAmount}
                    onChangeText={handleDestinationAmountChange}
                    placeholder="0.00"
                    hasError={!!destinationAmountError}
                />
                {/* Destination amount error message */}
                {destinationAmountError ? (
                    <Text style={styles.errorText}>{destinationAmountError}</Text>
                ) : null}
            </View>

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

            {/* Confirm exchange button with validation */}
            <RoundedButton
                text={isLoading ? "Processing..." : "Confirm Exchange"}
                onPress={handleConfirmExchange}
                disabled={isLoading}
            />

            {/* Origin currency selection bottom sheet */}
            <CurrencyBottomSheet
                ref={originCurrencyBottomSheetRef}
                onSelectCurrency={handleOriginCurrencySelect}
                selectedCurrency={originCurrency}
            />

            {/* Destination currency selection bottom sheet */}
            <CurrencyBottomSheet
                ref={destinationCurrencyBottomSheetRef}
                onSelectCurrency={handleDestinationCurrencySelect}
                selectedCurrency={destinationCurrency}
            />
        </ModalContainer>
    );
}

const styles = StyleSheet.create({
    subtitle: {
        fontSize: 16,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.secondary,
        marginBottom: 24,
        textAlign: "center",
    },
    inputSection: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.secondary,
        marginBottom: 8,
    },
    exchangeRateContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        marginBottom: 16,
    },
    exchangeRateText: {
        fontSize: 14,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.secondary,
        marginLeft: 8,
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