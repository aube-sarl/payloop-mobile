import { congoFlag, usFlag } from "@/assets/icons/_icons";
import { Colors } from "@/constants/Colors";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import CurrencyButton from "../buttons/currency-button";

interface CurrencyBottomSheetProps {
    onSelectCurrency: (currency: string, icon: any) => void;
    selectedCurrency?: string;
}

const currencies = [
    { code: "USD", name: "US Dollar", icon: usFlag },
    { code: "CDF", name: "Congolese Franc", icon: congoFlag },
    { code: "EUR", name: "Euro", icon: usFlag }, // Replace with actual euro flag
    { code: "GBP", name: "British Pound", icon: usFlag }, // Replace with actual GBP flag
];

const CurrencyBottomSheet = forwardRef<BottomSheet, CurrencyBottomSheetProps>(
    ({ onSelectCurrency, selectedCurrency }, ref) => {
        const snapPoints = useMemo(() => ["50%", "75%"], []);

        const handleSheetChanges = useCallback((index: number) => {
            console.log("handleSheetChanges", index);
        }, []);

        return (
            <BottomSheet
                ref={ref}
                index={-1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={styles.handle}
            >
                <BottomSheetView style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Select Currency</Text>
                    </View>

                    <BottomSheetScrollView style={styles.content}>
                        {currencies.map((currency) => (
                            <TouchableOpacity
                                key={currency.code}
                                style={[
                                    styles.currencyItem,
                                    selectedCurrency === currency.code && styles.selectedItem,
                                ]}
                                onPress={() => {
                                    onSelectCurrency(currency.code, currency.icon);
                                    // @ts-ignore
                                    ref?.current?.close();
                                }}
                            >
                                <CurrencyButton
                                    currency={currency.code}
                                    icon={currency.icon}
                                    selected={selectedCurrency === currency.code}
                                    onPress={() => { }}
                                />
                                <Text style={styles.currencyName}>{currency.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </BottomSheetScrollView>
                </BottomSheetView>
            </BottomSheet>
        );
    }
);

CurrencyBottomSheet.displayName = "CurrencyBottomSheet";

const styles = StyleSheet.create({
    bottomSheetBackground: {
        backgroundColor: Colors.background.primary,
    },
    container: {
        flex: 1,
    },
    header: {
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border.light,
    },
    handle: {
        backgroundColor: Colors.border.medium,
    },
    title: {
        fontSize: 18,
        fontFamily: "ClashDisplaySemibold",
        color: Colors.text.primary,
    },
    content: {
        padding: 20,
    },
    currencyItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 8,
        backgroundColor: Colors.background.card,
    },
    selectedItem: {
        backgroundColor: Colors.background.cardSelected,
    },
    currencyName: {
        marginLeft: 16,
        fontSize: 16,
        fontFamily: "ClashDisplay",
        color: Colors.text.secondary,
        flex: 1,
    },
});

export default CurrencyBottomSheet;