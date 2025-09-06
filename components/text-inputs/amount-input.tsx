import { Colors } from "@/constants/Colors";
import { formatAmountInput } from "@/utils/validation";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AmountInput(props: {
  icon: any;
  currency: string;
  onCurrencyPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  hasError?: boolean;
  editable?: boolean;
}) {
  const [amount, setAmount] = useState(props.value || "");

  // Update local state when props.value changes
  useEffect(() => {
    setAmount(props.value || "");
  }, [props.value]);

  const handleAmountChange = (text: string) => {
    // Format the input to ensure proper decimal formatting
    const formattedText = formatAmountInput(text);
    setAmount(formattedText);
    props.onChangeText?.(formattedText);
  };

  return (
    <View style={[styles.container, props.hasError && styles.errorContainer]}>
      <TextInput
        style={[styles.textInput]}
        inputMode="decimal"
        placeholder={props.placeholder || "0.00"}
        placeholderTextColor={Colors.text.light}
        value={amount}
        onChangeText={handleAmountChange}
        keyboardType="decimal-pad"
        returnKeyType="done"
        editable={props.editable !== false}
      />
      <TouchableOpacity
        style={styles.currencyButton}
        onPress={props.onCurrencyPress}
      >
        <Image source={props.icon} style={styles.currencyIcon} />
        <Text style={styles.currencyText}>{props.currency}</Text>
        {props.onCurrencyPress && (
          <AntDesign
            name="down"
            size={12}
            color={Colors.text.secondary}
            style={styles.dropdownIcon}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.background.primary,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border.light
  },
  errorContainer: {
    borderColor: Colors.primary.red,
    borderWidth: 2,
  },
  textInput: {
    fontSize: 24,
    fontFamily: "ClashDisplaySemibold",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    color: Colors.text.primary,
  },
  currencyButton: {
    backgroundColor: Colors.background.tertiary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    minWidth: 120,
  },
  currencyIcon: {
    height: 24,
    width: 24,
    marginRight: 8,
    borderRadius: 12,
  },
  currencyText: {
    fontFamily: "ClashDisplayMedium",
    fontSize: 16,
    color: Colors.text.primary,
  },
  dropdownIcon: {
    marginLeft: 8,
  },
});
