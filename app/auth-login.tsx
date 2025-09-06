import RoundedButton from "@/components/buttons/rounded-button";
import AuthInput from "@/components/text-inputs/auth-input";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AuthLogin() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ phone?: string }>({});

    const validatePhoneNumber = (phone: string) => {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(phone.replace(/\s/g, ""));
    };

    const handleLogin = async () => {
        setErrors({});

        if (!phoneNumber.trim()) {
            setErrors({ phone: "Le numéro de téléphone est requis" });
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            setErrors({ phone: "Veuillez entrer un numéro de téléphone valide" });
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Navigate to OTP verification
            router.push({
                pathname: "/auth-verify-otp",
                params: { phoneNumber, isLogin: "true" }
            });
        } catch (error) {
            Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>📱</Text>
                    </View>
                    <Text style={styles.title}>Connexion</Text>
                    <Text style={styles.subtitle}>
                        Entrez votre numéro de téléphone pour vous connecter
                    </Text>
                </View>

                <View style={styles.form}>
                    <AuthInput
                        label="Numéro de téléphone"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        placeholder="+243 XXX XXX XXX"
                        keyboardType="phone-pad"
                        hasError={!!errors.phone}
                        errorMessage={errors.phone}
                    />

                    <RoundedButton
                        text={isLoading ? "Connexion..." : "Se connecter"}
                        onPress={handleLogin}
                        disabled={isLoading}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Vous n&apos;avez pas de compte ?</Text>
                    <TouchableOpacity onPress={() => router.push("/auth-signup")}>
                        <Text style={styles.linkText}>Créer un compte</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.primary,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: "space-between",
    },
    header: {
        alignItems: "center",
        paddingTop: 60,
        paddingBottom: 40,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.background.secondary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    icon: {
        fontSize: 32,
    },
    title: {
        fontSize: 28,
        fontFamily: "ClashDisplayBold",
        color: Colors.text.primary,
        textAlign: "center",
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: "ClashDisplay",
        color: Colors.text.secondary,
        textAlign: "center",
        lineHeight: 24,
    },
    form: {
        flex: 1,
        paddingTop: 20,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 40,
        gap: 4,
    },
    footerText: {
        fontSize: 14,
        fontFamily: "ClashDisplay",
        color: Colors.text.secondary,
    },
    linkText: {
        fontSize: 14,
        fontFamily: "ClashDisplayMedium",
        color: Colors.primary.red,
    },
});