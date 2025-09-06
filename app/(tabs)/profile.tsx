import { Colors } from "@/constants/Colors";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    nationality: string;
    accountNumber: string;
    memberSince: string;
    verificationStatus: "verified" | "pending" | "unverified";
}

const mockUser: UserProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+243 123 456 789",
    address: "123 Avenue de la Paix, Kinshasa, RDC",
    dateOfBirth: "15/03/1990",
    nationality: "Congolaise",
    accountNumber: "PL-2024-001234",
    memberSince: "Janvier 2024",
    verificationStatus: "verified",
};

export default function ProfileScreen() {
    const router = useRouter();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [biometricEnabled, setBiometricEnabled] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

    const getVerificationColor = (status: string) => {
        switch (status) {
            case "verified":
                return Colors.status.success;
            case "pending":
                return Colors.status.warning;
            case "unverified":
                return Colors.status.error;
            default:
                return Colors.text.secondary;
        }
    };

    const getVerificationText = (status: string) => {
        switch (status) {
            case "verified":
                return "Vérifié";
            case "pending":
                return "En attente";
            case "unverified":
                return "Non vérifié";
            default:
                return status;
        }
    };

    const handleLogout = () => {
        Alert.alert(
            "Déconnexion",
            "Êtes-vous sûr de vouloir vous déconnecter ?",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Déconnexion", style: "destructive", onPress: () => {
                        // Handle logout logic here
                        console.log("User logged out");
                    }
                },
            ]
        );
    };

    const ProfileItem = ({
        icon,
        title,
        value,
        onPress,
        showArrow = true
    }: {
        icon: React.ReactNode;
        title: string;
        value?: string;
        onPress?: () => void;
        showArrow?: boolean;
    }) => (
        <TouchableOpacity style={styles.profileItem} onPress={onPress}>
            <View style={styles.profileItemLeft}>
                <View style={styles.profileItemIcon}>{icon}</View>
                <View>
                    <Text style={styles.profileItemTitle}>{title}</Text>
                    {value && <Text style={styles.profileItemValue}>{value}</Text>}
                </View>
            </View>
            {showArrow && (
                <AntDesign name="right" size={16} color={Colors.text.light} />
            )}
        </TouchableOpacity>
    );

    const SettingItem = ({
        icon,
        title,
        value,
        onToggle,
        isSwitch = false
    }: {
        icon: React.ReactNode;
        title: string;
        value?: boolean;
        onToggle?: (value: boolean) => void;
        isSwitch?: boolean;
    }) => (
        <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
                <View style={styles.settingItemIcon}>{icon}</View>
                <Text style={styles.settingItemTitle}>{title}</Text>
            </View>
            {isSwitch && onToggle ? (
                <Switch
                    value={value}
                    onValueChange={onToggle}
                    trackColor={{ false: Colors.border.light, true: Colors.primary.red }}
                    thumbColor={Colors.background.primary}
                />
            ) : (
                <AntDesign name="right" size={16} color={Colors.text.light} />
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.profileHeader}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>JD</Text>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.userName}>{mockUser.name}</Text>
                            <View style={styles.verificationBadge}>
                                <View style={[
                                    styles.verificationDot,
                                    { backgroundColor: getVerificationColor(mockUser.verificationStatus) }
                                ]} />
                                <Text style={[
                                    styles.verificationText,
                                    { color: getVerificationColor(mockUser.verificationStatus) }
                                ]}>
                                    {getVerificationText(mockUser.verificationStatus)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Feather name="edit-2" size={20} color={Colors.primary.red} />
                    </TouchableOpacity>
                </View>

                {/* Account Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informations du compte</Text>

                    <ProfileItem
                        icon={<AntDesign name="user" size={20} color={Colors.primary.red} />}
                        title="Nom complet"
                        value={mockUser.name}
                        onPress={() => console.log("Edit name")}
                    />

                    <ProfileItem
                        icon={<AntDesign name="mail" size={20} color={Colors.primary.red} />}
                        title="Email"
                        value={mockUser.email}
                        onPress={() => console.log("Edit email")}
                    />

                    <ProfileItem
                        icon={<AntDesign name="phone" size={20} color={Colors.primary.red} />}
                        title="Téléphone"
                        value={mockUser.phone}
                        onPress={() => console.log("Edit phone")}
                    />

                    <ProfileItem
                        icon={<AntDesign name="home" size={20} color={Colors.primary.red} />}
                        title="Adresse"
                        value={mockUser.address}
                        onPress={() => console.log("Edit address")}
                    />

                    <ProfileItem
                        icon={<AntDesign name="calendar" size={20} color={Colors.primary.red} />}
                        title="Date de naissance"
                        value={mockUser.dateOfBirth}
                        onPress={() => console.log("Edit birth date")}
                    />

                    <ProfileItem
                        icon={<AntDesign name="flag" size={20} color={Colors.primary.red} />}
                        title="Nationalité"
                        value={mockUser.nationality}
                        onPress={() => console.log("Edit nationality")}
                    />
                </View>

                {/* Account Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Détails du compte</Text>

                    <ProfileItem
                        icon={<AntDesign name="creditcard" size={20} color={Colors.primary.red} />}
                        title="Numéro de compte"
                        value={mockUser.accountNumber}
                        showArrow={false}
                    />

                    <ProfileItem
                        icon={<AntDesign name="clockcircle" size={20} color={Colors.primary.red} />}
                        title="Membre depuis"
                        value={mockUser.memberSince}
                        showArrow={false}
                    />
                </View>

                {/* Security Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sécurité</Text>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingItemLeft}>
                            <View style={styles.settingItemIcon}>
                                <AntDesign name="lock" size={20} color={Colors.primary.red} />
                            </View>
                            <Text style={styles.settingItemTitle}>Changer le mot de passe</Text>
                        </View>
                        <AntDesign name="right" size={16} color={Colors.text.light} />
                    </TouchableOpacity>

                    <SettingItem
                        icon={<AntDesign name="mobile1" size={20} color={Colors.primary.red} />}
                        title="Authentification à deux facteurs"
                        value={twoFactorEnabled}
                        onToggle={setTwoFactorEnabled}
                        isSwitch={true}
                    />

                    <SettingItem
                        icon={<AntDesign name="scan1" size={20} color={Colors.primary.red} />}
                        title="Authentification biométrique"
                        value={biometricEnabled}
                        onToggle={setBiometricEnabled}
                        isSwitch={true}
                    />
                </View>

                {/* App Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Paramètres de l'application</Text>

                    <SettingItem
                        icon={<AntDesign name="notification" size={20} color={Colors.primary.red} />}
                        title="Notifications"
                        value={notificationsEnabled}
                        onToggle={setNotificationsEnabled}
                        isSwitch={true}
                    />

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingItemLeft}>
                            <View style={styles.settingItemIcon}>
                                <AntDesign name="earth" size={20} color={Colors.primary.red} />
                            </View>
                            <Text style={styles.settingItemTitle}>Langue</Text>
                        </View>
                        <View style={styles.settingItemRight}>
                            <Text style={styles.settingItemValue}>Français</Text>
                            <AntDesign name="right" size={16} color={Colors.text.light} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingItemLeft}>
                            <View style={styles.settingItemIcon}>
                                <AntDesign name="dollarcircle" size={20} color={Colors.primary.red} />
                            </View>
                            <Text style={styles.settingItemTitle}>Devise par défaut</Text>
                        </View>
                        <View style={styles.settingItemRight}>
                            <Text style={styles.settingItemValue}>USD</Text>
                            <AntDesign name="right" size={16} color={Colors.text.light} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Support & Legal */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support et légal</Text>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingItemLeft}>
                            <View style={styles.settingItemIcon}>
                                <AntDesign name="customerservice" size={20} color={Colors.primary.red} />
                            </View>
                            <Text style={styles.settingItemTitle}>Centre d'aide</Text>
                        </View>
                        <AntDesign name="right" size={16} color={Colors.text.light} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingItemLeft}>
                            <View style={styles.settingItemIcon}>
                                <AntDesign name="filetext1" size={20} color={Colors.primary.red} />
                            </View>
                            <Text style={styles.settingItemTitle}>Conditions d'utilisation</Text>
                        </View>
                        <AntDesign name="right" size={16} color={Colors.text.light} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingItem}>
                        <View style={styles.settingItemLeft}>
                            <View style={styles.settingItemIcon}>
                                <AntDesign name="Safety" size={20} color={Colors.primary.red} />
                            </View>
                            <Text style={styles.settingItemTitle}>Politique de confidentialité</Text>
                        </View>
                        <AntDesign name="right" size={16} color={Colors.text.light} />
                    </TouchableOpacity>
                </View>

                {/* Logout */}
                <View style={styles.section}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <AntDesign name="logout" size={20} color={Colors.status.error} />
                        <Text style={styles.logoutText}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 32 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.secondary,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.background.primary,
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    profileHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.primary.red,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    avatarText: {
        fontSize: 24,
        fontFamily: "ClashDisplayBold",
        color: Colors.text.white,
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 24,
        fontFamily: "ClashDisplayBold",
        color: Colors.text.primary,
        marginBottom: 4,
    },
    verificationBadge: {
        flexDirection: "row",
        alignItems: "center",
    },
    verificationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    verificationText: {
        fontSize: 14,
        fontFamily: "ClashDisplayMedium",
    },
    editButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.background.secondary,
        alignItems: "center",
        justifyContent: "center",
    },
    section: {
        backgroundColor: Colors.background.primary,
        marginTop: 16,
        paddingVertical: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: "ClashDisplaySemibold",
        color: Colors.text.primary,
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    profileItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border.light,
    },
    profileItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    profileItemIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.background.secondary,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    profileItemTitle: {
        fontSize: 16,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.primary,
        marginBottom: 2,
    },
    profileItemValue: {
        fontSize: 14,
        fontFamily: "ClashDisplay",
        color: Colors.text.secondary,
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border.light,
    },
    settingItemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    settingItemIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.background.secondary,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    settingItemTitle: {
        fontSize: 16,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.primary,
    },
    settingItemRight: {
        flexDirection: "row",
        alignItems: "center",
    },
    settingItemValue: {
        fontSize: 14,
        fontFamily: "ClashDisplay",
        color: Colors.text.secondary,
        marginRight: 8,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
        marginHorizontal: 24,
        borderRadius: 12,
        backgroundColor: Colors.background.secondary,
    },
    logoutText: {
        fontSize: 16,
        fontFamily: "ClashDisplayMedium",
        color: Colors.status.error,
        marginLeft: 8,
    },
});