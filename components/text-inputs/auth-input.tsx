import { Colors } from "@/constants/Colors";
import React from "react";
import {
    KeyboardTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function AuthInput(props: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    keyboardType?: KeyboardTypeOptions;
    hasError?: boolean;
    errorMessage?: string;
    secureTextEntry?: boolean;
    maxLength?: number;
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                style={[styles.input, props.hasError && styles.inputError]}
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                placeholderTextColor={Colors.text.light}
                keyboardType={props.keyboardType || "default"}
                secureTextEntry={props.secureTextEntry}
                maxLength={props.maxLength}
            />
            {props.hasError && props.errorMessage && (
                <Text style={styles.errorText}>{props.errorMessage}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.primary,
        marginBottom: 8,
    },
    input: {
        height: 56,
        borderWidth: 1,
        borderColor: Colors.border.light,
        borderRadius: 16,
        paddingHorizontal: 16,
        fontSize: 16,
        fontFamily: "ClashDisplay",
        color: Colors.text.primary,
        backgroundColor: Colors.background.primary,
    },
    inputError: {
        borderColor: Colors.status.error,
        borderWidth: 2,
    },
    errorText: {
        fontSize: 12,
        fontFamily: "ClashDisplay",
        color: Colors.status.error,
        marginTop: 4,
    },
});