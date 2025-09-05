import { usFlag } from "@/assets/icons/_icons";
import CurrencyBottomSheet from "@/components/bottom-sheets/currency-bottom-sheet";
import RoundedButton from "@/components/buttons/rounded-button";
import AmountInput from "@/components/text-inputs/amount-input";
import ModalContainer from "@/components/ui/modal-container";
import { Colors } from "@/constants/Colors";
import { validateAmount, validateCurrency } from "@/utils/validation";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";

export default function DepositScreen() {
    const router = useRouter();
    const currencyBottomSheetRef = useRef<BottomSheet>(null);

    // Local state management for deposit amount and currency selection
    const [amount, setAmount] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [selectedCurrencyIcon, setSelectedCurrencyIcon] = useState(usFlag);
    const [isLoading, setIsLoading] = useState(false);
    const [amountError, setAmountError] = useState<string>("");
    const [currencyError, setCurrencyError] = useState<string>("");
    const [generalError, setGeneralError] = useState<string>("");

    // Handle currency selection from bottom sheet
    const handleCurrencySelect = (currency: string, icon: any) => {
        setSelectedCurrency(currency);
        setSelectedCurrencyIcon(icon);
        // Clear currency error when currency is selected
        setCurrencyError("");
    };

    // Open currency selection bottom sheet
    const handleCurrencyPress = () => {
        currencyBottomSheetRef.current?.expand();
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

        return isValid;
    };

    // Handle deposit confirmation with validation
    const handleConfirmDeposit = async () => {
        // Clear previous errors
        setGeneralError("");

        // Validate all inputs
        if (!validateInputs()) {
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call for deposit processing
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Navigate back to home screen on completion
            router.back();
        } catch (error) {
            console.error("Deposit failed:", error);
            setGeneralError("Deposit failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle cancellation - navigate back to home screen
    const handleCancel = () => {
        router.back();
    };

    return (
        <ModalContainer title="Deposit" onClose={handleCancel}>
            <Text style={styles.subtitle}>Enter amount to deposit</Text>

            {/* Amount input with currency selection */}
            <AmountInput
                icon={selectedCurrencyIcon}
                currency={selectedCurrency}
                onCurrencyPress={handleCurrencyPress}
                value={amount}
                onChangeText={handleAmountChange}
                placeholder="0.00"
                hasError={!!amountError}
            />

            {/* Amount error message */}
            {amountError ? (
                <Text style={styles.errorText}>{amountError}</Text>
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

            {/* Confirm deposit button with validation */}
            <RoundedButton
                text={isLoading ? "Processing..." : "Confirm Deposit"}
                onPress={handleConfirmDeposit}
                disabled={isLoading}
            />

            {/* Currency selection bottom sheet */}
            <CurrencyBottomSheet
                ref={currencyBottomSheetRef}
                onSelectCurrency={handleCurrencySelect}
                selectedCurrency={selectedCurrency}
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