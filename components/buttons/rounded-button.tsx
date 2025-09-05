import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function RoundedButton(props: {
  text: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}) {
  const isPrimary = props.variant !== "secondary";

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.container,
        isPrimary ? styles.primary : styles.secondary,
        props.disabled && styles.disabled,
      ]}
      disabled={props.disabled}
    >
      <Text
        style={[
          styles.text,
          isPrimary ? styles.primaryText : styles.secondaryText,
          props.disabled && styles.disabledText,
        ]}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: "100%",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: Colors.primary.red,
  },
  secondary: {
    backgroundColor: Colors.background.cardElevated,
    borderWidth: 1,
    borderColor: Colors.primary.red,
  },
  disabled: {
    backgroundColor: Colors.border.medium,
  },
  text: {
    fontFamily: "ClashDisplaySemibold",
    fontSize: 16,
  },
  primaryText: {
    color: Colors.text.white,
  },
  secondaryText: {
    color: Colors.primary.red,
  },
  disabledText: {
    color: Colors.text.light,
  },
});
