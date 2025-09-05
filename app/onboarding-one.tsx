import RoundedButton from "@/components/buttons/rounded-button";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function OnboardingOne() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.hero}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>💳</Text>
                    </View>
                    <Text style={styles.title}>Envoyez de l'argent facilement</Text>
                    <Text style={styles.subtitle}>
                        Transférez de l&apos;argent vers vos proches en quelques secondes avec PayLoop
                    </Text>
                </View>

                <View style={styles.footer}>
                    <RoundedButton
                        text="Continuer"
                        onPress={() => router.push("/onboarding-two")}
                    />
                    <RoundedButton
                        text="Passer"
                        onPress={() => router.push("/(tabs)")}
                        variant="secondary"
                    />
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
    hero: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 60,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: Colors.background.secondary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 32,
    },
    icon: {
        fontSize: 48,
    },
    title: {
        fontSize: 28,
        fontFamily: "ClashDisplayBold",
        color: Colors.text.primary,
        textAlign: "center",
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: "ClashDisplay",
        color: Colors.text.secondary,
        textAlign: "center",
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    footer: {
        paddingBottom: 40,
        gap: 16,
    },
});