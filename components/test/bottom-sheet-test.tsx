import { Colors } from "@/constants/Colors";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CurrencyBottomSheet from "../bottom-sheets/currency-bottom-sheet";
import ReceiverBottomSheet from "../bottom-sheets/receiver-bottom-sheet";

export default function BottomSheetTest() {
    const currencyBottomSheetRef = useRef<BottomSheet>(null);
    const receiverBottomSheetRef = useRef<BottomSheet>(null);

    const handleCurrencySelect = (currency: string, icon: any) => {
        console.log("Selected currency:", currency);
    };

    const handleReceiverSelect = (receiver: any) => {
        console.log("Selected receiver:", receiver);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bottom Sheet Test</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => currencyBottomSheetRef.current?.expand()}
            >
                <Text style={styles.buttonText}>Open Currency Sheet</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => receiverBottomSheetRef.current?.expand()}
            >
                <Text style={styles.buttonText}>Open Receiver Sheet</Text>
            </TouchableOpacity>

            <CurrencyBottomSheet
                ref={currencyBottomSheetRef}
                onSelectCurrency={handleCurrencySelect}
                selectedCurrency="USD"
            />

            <ReceiverBottomSheet
                ref={receiverBottomSheetRef}
                onSelectReceiver={handleReceiverSelect}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.background.primary,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontFamily: "ClashDisplayBold",
        color: Colors.text.primary,
        textAlign: "center",
        marginBottom: 40,
    },
    button: {
        backgroundColor: Colors.primary.red,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginBottom: 16,
    },
    buttonText: {
        color: Colors.text.white,
        fontSize: 16,
        fontFamily: "ClashDisplayMedium",
        textAlign: "center",
    },
});