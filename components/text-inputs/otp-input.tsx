import { Colors } from "@/constants/Colors";
import React, { useRef, useState } from "react";
import {
    StyleSheet,
    TextInput,
    View
} from "react-native";

export default function OTPInput(props: {
    length: number;
    onComplete: (otp: string) => void;
    hasError?: boolean;
}) {
    const [otp, setOtp] = useState(Array(props.length).fill(""));
    const inputs = useRef<TextInput[]>([]);

    const handleChangeText = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Move to next input if text is entered
        if (text && index < props.length - 1) {
            inputs.current[index + 1]?.focus();
        }

        // Call onComplete when all digits are filled
        if (newOtp.every(digit => digit !== "")) {
            props.onComplete(newOtp.join(""));
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        // Move to previous input on backspace
        if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View style={styles.container}>
            {Array(props.length)
                .fill(0)
                .map((_, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => {
                            if (ref) inputs.current[index] = ref;
                        }}
                        style={[styles.input, props.hasError && styles.inputError]}
                        value={otp[index]}
                        onChangeText={(text) => handleChangeText(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        textAlign="center"
                    />
                ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
    },
    input: {
        width: 50,
        height: 56,
        borderWidth: 1,
        borderColor: Colors.border.light,
        borderRadius: 16,
        fontSize: 24,
        fontFamily: "ClashDisplaySemibold",
        color: Colors.text.primary,
        backgroundColor: Colors.background.primary,
    },
    inputError: {
        borderColor: Colors.status.error,
        borderWidth: 2,
    },
});