import RoundedButton from "@/components/buttons/rounded-button";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function AuthSelfie() {
    const [selfieImage, setSelfieImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const takeSelfie = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission requise",
                "Nous avons besoin d'accéder à votre caméra pour prendre votre selfie."
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
            cameraType: ImagePicker.CameraType.front,
        });

        if (!result.canceled && result.assets[0]) {
            setSelfieImage(result.assets[0].uri);
        }
    };

    const pickFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission requise",
                "Nous avons besoin d'accéder à votre galerie pour sélectionner votre selfie."
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setSelfieImage(result.assets[0].uri);
        }
    };

    const showImageOptions = () => {
        Alert.alert(
            "Prendre un selfie",
            "Choisissez une option",
            [
                { text: "Prendre une photo", onPress: takeSelfie },
                { text: "Choisir dans la galerie", onPress: pickFromGallery },
                { text: "Annuler", style: "cancel" },
            ]
        );
    };

    const handleComplete = async () => {
        if (!selfieImage) {
            Alert.alert(
                "Selfie manquant",
                "Veuillez prendre un selfie pour continuer."
            );
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call to upload selfie and complete verification
            await new Promise(resolve => setTimeout(resolve, 3000));

            Alert.alert(
                "Vérification terminée !",
                "Votre compte a été créé avec succès. Vous pouvez maintenant utiliser l'application.",
                [
                    {
                        text: "Commencer",
                        onPress: () => router.replace("/(tabs)"),
                    },
                ]
            );
        } catch (error) {
            Alert.alert("Erreur", "Impossible de terminer la vérification. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>🤳</Text>
                    </View>
                    <Text style={styles.title}>Selfie de vérification</Text>
                    <Text style={styles.subtitle}>
                        Prenez un selfie pour vérifier votre identité
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.selfieContainer}>
                        <TouchableOpacity
                            style={styles.selfieBox}
                            onPress={showImageOptions}
                        >
                            {selfieImage ? (
                                <Image source={{ uri: selfieImage }} style={styles.selfieImage} />
                            ) : (
                                <View style={styles.selfiePlaceholder}>
                                    <View style={styles.faceOutline} />
                                    <Text style={styles.selfieText}>Appuyez pour prendre un selfie</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.instructionsBox}>
                        <Text style={styles.instructionsTitle}>Instructions :</Text>
                        <Text style={styles.instructionsText}>
                            • Regardez directement la caméra{"\n"}
                            • Assurez-vous que votre visage est bien éclairé{"\n"}
                            • Retirez lunettes de soleil et chapeau{"\n"}
                            • Gardez une expression neutre
                        </Text>
                    </View>

                    <RoundedButton
                        text={isLoading ? "Vérification..." : "Terminer la vérification"}
                        onPress={handleComplete}
                        disabled={isLoading || !selfieImage}
                    />
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.backText}>Retour</Text>
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
        paddingTop: 20,
    },
    selfieContainer: {
        alignItems: "center",
        marginBottom: 32,
    },
    selfieBox: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: Colors.primary.red,
    },
    selfiePlaceholder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background.secondary,
    },
    faceOutline: {
        width: 120,
        height: 150,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: Colors.border.medium,
        borderStyle: "dashed",
        marginBottom: 16,
    },
    selfieText: {
        fontSize: 14,
        fontFamily: "ClashDisplay",
        color: Colors.text.secondary,
        textAlign: "center",
        paddingHorizontal: 20,
    },
    selfieImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    instructionsBox: {
        backgroundColor: Colors.background.secondary,
        padding: 16,
        borderRadius: 12,
        marginBottom: 32,
    },
    instructionsTitle: {
        fontSize: 16,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.primary,
        marginBottom: 8,
    },
    instructionsText: {
        fontSize: 14,
        fontFamily: "ClashDisplay",
        color: Colors.text.secondary,
        lineHeight: 20,
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