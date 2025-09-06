import OTPInput from "@/components/text-inputs/otp-input";
import { Colors } from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AuthVerifyOTP() {
    const params = useLocalSearchParams();
    const { phoneNumber, isLogin } = params;
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    setCanResend(true);
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleOTPComplete = async (otpValue: string) => {
        setOtp(otpValue);
        setHasError(false);
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate OTP validation (in real app, this would be server-side)
            if (otpValue === "123456") {
                if (isLogin === "true") {
                    // Login successful, go to main app
                    router.replace("/(tabs)");
                } else {
                    // Signup flow, continue to ID upload
                    router.push("/auth-upload-id");
                }
            } else {
                setHasError(true);
                Alert.alert("Code incorrect", "Le code OTP que vous avez saisi est incorrect.");
            }
        } catch (error) {
            Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setCanResend(false);
        setCountdown(60);

        try {
            // Simulate API call to resend OTP
            await new Promise(resolve => setTimeout(resolve, 1000));
            Alert.alert("Code envoyé", "Un nouveau code a été envoyé à votre téléphone.");

            // Restart countdown
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        setCanResend(true);
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (error) {
            Alert.alert("Erreur", "Impossible de renvoyer le code. Veuillez réessayer.");
            setCanResend(true);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>🔐</Text>
                    </View>
                    <Text style={styles.title}>Vérification</Text>
                    <Text style={styles.subtitle}>
                        Entrez le code à 6 chiffres envoyé au {phoneNumber}
                    </Text>
                </View>

                <View style={styles.form}>
                    <OTPInput
                        length={6}
                        onComplete={handleOTPComplete}
                        hasError={hasError}
                    />

                    {hasError && (
                        <Text style={styles.errorText}>
                            Code incorrect. Veuillez réessayer.
                        </Text>
                    )}

                    <View style={styles.resendContainer}>
                        {canResend ? (
                            <TouchableOpacity onPress={handleResendOTP}>
                                <Text style={styles.resendText}>Renvoyer le code</Text>
                            </TouchableOpacity>
                        ) : (
                            <Text style={styles.countdownText}>
                                Renvoyer le code dans {countdown}s
                            </Text>
                        )}
                    </View>

                    {isLoading && (
                        <View style={styles.loadingContainer}>
                            <Text style={styles.loadingText}>Vérification en cours...</Text>
                        </View>
                    )}
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.backText}>Modifier le numéro</Text>
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
        paddingHorizontal: 20,
    },
    form: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center",
    },
    errorText: {
        fontSize: 14,
        fontFamily: "ClashDisplay",
        color: Colors.status.error,
        textAlign: "center",
        marginTop: 16,
    },
    resendContainer: {
        marginTop: 32,
        alignItems: "center",
    },
    resendText: {
        fontSize: 16,
        fontFamily: "ClashDisplayMedium",
        color: Colors.primary.red,
    },
    countdownText: {
        fontSize: 14,
        fontFamily: "ClashDisplay",
        color: Colors.text.secondary,
    },
    loadingContainer: {
        marginTop: 24,
        alignItems: "center",
    },
    loadingText: {
        fontSize: 14,
        fontFamily: "ClashDisplay",
        color: Colors.text.secondary,
    },
    footer: {
        alignItems: "center",
        paddingBottom: 40,
    },
    backText: {
        fontSize: 14,
        fontFamily: "ClashDisplayMedium",
        color: Colors.primary.red,
    },
});