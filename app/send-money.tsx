import SendMoneyForm from "@/components/forms/send-money-form";
import ModalContainer from "@/components/ui/modal-container";
import { useRouter } from "expo-router";
import React from "react";
import {
    StyleSheet,
    View,
} from "react-native";

export default function SendMoneyScreen() {
    const router = useRouter();

    // Handle completion - navigate back to home screen
    const handleComplete = () => {
        router.back();
    };

    // Handle cancellation - navigate back to home screen
    const handleCancel = () => {
        router.back();
    };

    return (
        <ModalContainer title="Send Money" onClose={handleCancel}>
            {/* Main content with SendMoneyForm */}
            <View style={styles.content}>
                <SendMoneyForm onComplete={handleComplete} onCancel={handleCancel} />
            </View>
        </ModalContainer>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});