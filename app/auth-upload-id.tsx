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

export default function AuthUploadID() {
    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [backImage, setBackImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission requise",
                "Nous avons besoin d'accéder à votre galerie pour télécharger votre pièce d'identité."
            );
            return false;
        }
        return true;
    };

    const pickImage = async (side: "front" | "back") => {
        const hasPermission = await requestPermission();
        if (!hasPermission) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            if (side === "front") {
                setFrontImage(result.assets[0].uri);
            } else {
                setBackImage(result.assets[0].uri);
            }
        }
    };

    const takePhoto = async (side: "front" | "back") => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert(
                "Permission requise",
                "Nous avons besoin d'accéder à votre caméra pour prendre une photo de votre pièce d'identité."
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            if (side === "front") {
                setFrontImage(result.assets[0].uri);
            } else {
                setBackImage(result.assets[0].uri);
            }
        }
    };

    const showImageOptions = (side: "front" | "back") => {
        Alert.alert(
            "Ajouter une photo",
            "Choisissez une option",
            [
                { text: "Prendre une photo", onPress: () => takePhoto(side) },
                { text: "Choisir dans la galerie", onPress: () => pickImage(side) },
                { text: "Annuler", style: "cancel" },
            ]
        );
    };

    const handleContinue = async () => {
        if (!frontImage || !backImage) {
            Alert.alert(
                "Photos manquantes",
                "Veuillez télécharger les deux faces de votre pièce d'identité."
            );
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call to upload images
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Navigate to selfie verification
            router.push("/auth-selfie");
        } catch (error) {
            Alert.alert("Erreur", "Impossible de télécharger les images. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>🆔</Text>
                    </View>
                    <Text style={styles.title}>Pièce d&apos;identité</Text>
                    <Text style={styles.subtitle}>
                        Téléchargez les deux faces de votre carte d&apos;identité ou passeport
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.uploadSection}>
                        <Text style={styles.sectionTitle}>Face avant</Text>
                        <TouchableOpacity
                            style={styles.uploadBox}
                            onPress={() => showImageOptions("front")}
                        >
                            {frontImage ? (
                                <Image source={{ uri: frontImage }} style={styles.uploadedImage} />
                            ) : (
                                <View style={styles.uploadPlaceholder}>
                                    <Text style={styles.uploadIcon}>📷</Text>
                                    <Text style={styles.uploadText}>Ajouter une photo</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.uploadSection}>
                        <Text style={styles.sectionTitle}>Face arrière</Text>
                        <TouchableOpacity
                            style={styles.uploadBox}
                            onPress={() => showImageOptions("back")}
                        >
                            {backImage ? (
                                <Image source={{ uri: backImage }} style={styles.uploadedImage} />
                            ) : (
                                <View style={styles.uploadPlaceholder}>
                                    <Text style={styles.uploadIcon}>📷</Text>
                                    <Text style={styles.uploadText}>Ajouter une photo</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>
                            • Assurez-vous que toutes les informations sont lisibles{"\n"}
                            • Évitez les reflets et les ombres{"\n"}
                            • Utilisez un fond neutre
                        </Text>
                    </View>

                    <RoundedButton
                        text={isLoading ? "Téléchargement..." : "Continuer"}
                        onPress={handleContinue}
                        disabled={isLoading || !frontImage || !backImage}
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
    uploadSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.primary,
        marginBottom: 12,
    },
    uploadBox: {
        height: 120,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: Colors.border.light,
        borderStyle: "dashed",
        overflow: "hidden",
    },
    uploadPlaceholder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background.secondary,
    },
    uploadIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    uploadText: {
        fontSize: 14,
        fontFamily: "ClashDisplay",
        color: Colors.text.secondary,
    },
    uploadedImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    infoBox: {
        backgroundColor: Colors.background.secondary,
        padding: 16,
        borderRadius: 12,
        marginBottom: 32,
    },
    infoText: {
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