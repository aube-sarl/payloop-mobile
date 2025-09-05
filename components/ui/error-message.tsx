import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ErrorMessageProps {
    message: string;
    visible: boolean;
}

export default function ErrorMessage({ message, visible }: ErrorMessageProps) {
    if (!visible || !message) {
        return null;
    }

    return (
        <View style={styles.container}>
            <AntDesign name="exclamationcircleo" size={16} color={Colors.primary.red} />
            <Text style={styles.errorText}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.background.error || "#FFF5F5",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Colors.primary.red,
    },
    errorText: {
        fontSize: 14,
        fontFamily: "ClashDisplayMedium",
        color: Colors.primary.red,
        marginLeft: 8,
        flex: 1,
    },
});