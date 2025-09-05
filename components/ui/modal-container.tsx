import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface ModalContainerProps {
    title: string;
    children: React.ReactNode;
    onClose?: () => void;
}

export default function ModalContainer({ title, children, onClose }: ModalContainerProps) {
    const router = useRouter();

    // Handle close action - use custom onClose if provided, otherwise navigate back
    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            router.back();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Consistent modal header with close button */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleClose}
                    style={styles.closeButton}
                    testID="modal-close-button"
                >
                    <AntDesign name="close" size={24} color={Colors.text.primary} />
                </TouchableOpacity>
                <Text style={styles.title} testID="modal-title">{title}</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Main content area */}
            <View style={styles.content}>
                {children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.primary,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border.light,
    },
    closeButton: {
        padding: 4,
    },
    title: {
        fontSize: 18,
        fontFamily: "ClashDisplaySemibold",
        color: Colors.text.primary,
    },
    placeholder: {
        width: 32, // Same width as close button for centering
    },
    content: {
        flex: 1,
        padding: 20,
    },
});