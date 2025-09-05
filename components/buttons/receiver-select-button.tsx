import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ReceiverSelectButton(props: {
  onPress: () => void;
  selectedReceiver?: { name: string; phone: string };
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.iconContainer}>
        <AntDesign name="user" size={20} color={Colors.text.white} />
      </View>
      <View style={styles.textContainer}>
        {props.selectedReceiver ? (
          <>
            <Text style={styles.selectedName}>{props.selectedReceiver.name}</Text>
            <Text style={styles.selectedPhone}>{props.selectedReceiver.phone}</Text>
          </>
        ) : (
          <Text style={styles.placeholderText}>Choisir un destinataire</Text>
        )}
      </View>
      <AntDesign name="right" size={16} color={Colors.text.light} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background.cardElevated,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  iconContainer: {
    height: 48,
    width: 48,
    backgroundColor: Colors.primary.red,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  placeholderText: {
    fontFamily: "ClashDisplayMedium",
    fontSize: 16,
    color: Colors.text.secondary,
  },
  selectedName: {
    fontFamily: "ClashDisplayMedium",
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  selectedPhone: {
    fontFamily: "ClashDisplay",
    fontSize: 14,
    color: Colors.text.light,
  },
});
