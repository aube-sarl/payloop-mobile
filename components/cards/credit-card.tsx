import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CreditCard(props: {
  balance?: string;
  cardNumber?: string;
  holderName?: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.balanceLabel}>Solde disponible</Text>
          <Text style={styles.balance}>{props.balance || "$2,450.00"}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardNumber}>
            {props.cardNumber || "**** **** **** 1234"}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.holderLabel}>Titulaire</Text>
            <Text style={styles.holderName}>
              {props.holderName || "John Doe"}
            </Text>
          </View>
          <View style={styles.logo}>
            <Text style={styles.logoText}>PayLoop</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  card: {
    height: 200,
    backgroundColor: Colors.primary.black,
    borderRadius: 20,
    padding: 24,
    justifyContent: "space-between",
  },
  cardHeader: {
    alignItems: "flex-start",
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: "ClashDisplay",
    color: Colors.text.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  balance: {
    fontSize: 28,
    fontFamily: "ClashDisplayBold",
    color: Colors.text.white,
  },
  cardBody: {
    flex: 1,
    justifyContent: "center",
  },
  cardNumber: {
    fontSize: 18,
    fontFamily: "ClashDisplayMedium",
    color: Colors.text.white,
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  holderLabel: {
    fontSize: 12,
    fontFamily: "ClashDisplay",
    color: Colors.text.white,
    opacity: 0.8,
    marginBottom: 2,
  },
  holderName: {
    fontSize: 16,
    fontFamily: "ClashDisplayMedium",
    color: Colors.text.white,
  },
  logo: {
    alignItems: "flex-end",
  },
  logoText: {
    fontSize: 16,
    fontFamily: "ClashDisplayBold",
    color: Colors.primary.red,
  },
});
