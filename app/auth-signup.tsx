import RoundedButton from "@/components/buttons/rounded-button";
import AuthInput from "@/components/text-inputs/auth-input";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AuthSignup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{
        firstName?: string;
        lastName?: string;
        phone?: string;
        email?: string;
    }>({});

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "Le prénom est requis";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Le nom est requis";
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phone = "Le numéro de téléphone est requis";
        } else {
            const phoneRegex = /^\+?[1-9]\d{1,14}$/;
            if (!phoneRegex.test(formData.phoneNumber.replace(/\s/g, ""))) {
                newErrors.phone = "Numéro de téléphone invalide";
            }
        }

        if (!formData.email.trim()) {
            newErrors.email = "L'email est requis";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = "Email invalide";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async () => {
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Navigate to OTP verification
            router.push({
                pathname: "/auth-verify-otp",
                params: {
                    phoneNumber: formData.phoneNumber,
                    isLogin: "false",
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email
                }
            });
        } catch (error) {
            Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    const updateFormData = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>👤</Text>
                        </View>
                        <Text style={styles.title}>Créer un compte</Text>
                        <Text style={styles.subtitle}>
                            Remplissez vos informations pour commencer
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <AuthInput
                            label="Prénom"
                            value={formData.firstName}
                            onChangeText={(text) => updateFormData("firstName", text)}
                            placeholder="Votre prénom"
                            hasError={!!errors.firstName}
                            errorMessage={errors.firstName}
                        />

                        <AuthInput
                            label="Nom"
                            value={formData.lastName}
                            onChangeText={(text) => updateFormData("lastName", text)}
                            placeholder="Votre nom"
                            hasError={!!errors.lastName}
                            errorMessage={errors.lastName}
                        />

                        <AuthInput
                            label="Numéro de téléphone"
                            value={formData.phoneNumber}
                            onChangeText={(text) => updateFormData("phoneNumber", text)}
                            placeholder="+243 XXX XXX XXX"
                            keyboardType="phone-pad"
                            hasError={!!errors.phone}
                            errorMessage={errors.phone}
                        />

                        <AuthInput
                            label="Email"
                            value={formData.email}
                            onChangeText={(text) => updateFormData("email", text)}
                            placeholder="votre@email.com"
                            keyboardType="email-address"
                            hasError={!!errors.email}
                            errorMessage={errors.email}
                        />

                        <RoundedButton
                            text={isLoading ? "Création..." : "Créer le compte"}
                            onPress={handleSignup}
                            disabled={isLoading}
                        />
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Vous avez déjà un compte ?</Text>
                        <TouchableOpacity onPress={() => router.push("/auth-login")}>
                            <Text style={styles.linkText}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.primary,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 24,
        paddingBottom: 40,
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
        paddingTop: 20,
        paddingBottom: 40,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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