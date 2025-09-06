import { Colors } from "@/constants/Colors";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Transaction {
    id: string;
    type: "purchase" | "withdrawal" | "refund";
    amount: string;
    merchant: string;
    date: string;
    status: "completed" | "pending";
}

const mockCardTransactions: Transaction[] = [
    {
        id: "1",
        type: "purchase",
        amount: "$45.99",
        merchant: "Amazon",
        date: "2025-01-07 14:30",
        status: "completed",
    },
    {
        id: "2",
        type: "withdrawal",
        amount: "$100.00",
        merchant: "ATM Rawbank",
        date: "2025-01-06 09:15",
        status: "completed",
    },
    {
        id: "3",
        type: "purchase",
        amount: "$23.50",
        merchant: "Uber",
        date: "2025-01-05 18:45",
        status: "completed",
    },
    {
        id: "4",
        type: "refund",
        amount: "$12.99",
        merchant: "Netflix",
        date: "2025-01-04 12:00",
        status: "pending",
    },
];

const mockCard = {
    id: "1",
    type: "debit",
    balance: "$2,450.00",
    cardNumber: "4532 1234 5678 9012",
    holderName: "John Doe",
    expiryDate: "12/27",
    cvv: "123",
    isActive: true,
    currency: "USD",
    limit: "$5,000.00",
    spent: "$1,250.00",
};

export default function CardDetailsScreen() {
    const router = useRouter();
    const { cardId } = useLocalSearchParams();
    const [showCardDetails, setShowCardDetails] = useState(false);
    const [cardVisible, setCardVisible] = useState(false);

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case "purchase":
                return <AntDesign name="shoppingcart" size={16} color={Colors.primary.red} />;
            case "withdrawal":
                return <AntDesign name="creditcard" size={16} color={Colors.status.warning} />;
            case "refund":
                return <Feather name="rotate-ccw" size={16} color={Colors.status.success} />;
            default:
                return <Feather name="circle" size={16} color={Colors.text.secondary} />;
        }
    };

    const renderTransaction = ({ item }: { item: Transaction }) => (
        <View style={styles.transactionItem}>
            <View style={styles.transactionIcon}>
                {getTransactionIcon(item.type)}
            </View>
            <View style={styles.transactionDetails}>
                <View style={styles.transactionHeader}>
                    <Text style={styles.merchantName}>{item.merchant}</Text>
                    <Text style={styles.transactionAmount}>-{item.amount}</Text>
                </View>
                <View style={styles.transactionMeta}>
                    <Text style={styles.transactionDate}>{item.date}</Text>
                    <Text style={[
                        styles.transactionStatus,
                        { color: item.status === "completed" ? Colors.status.success : Colors.status.warning }
                    ]}>
                        {item.status === "completed" ? "Terminé" : "En cours"}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color={Colors.text.primary} />
                </TouchableOpacity>
                <Text style={styles.title}>Détails de la carte</Text>
                <TouchableOpacity style={styles.moreButton}>
                    <Feather name="more-vertical" size={24} color={Colors.text.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Card Display */}
                <View style={styles.cardContainer}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => setShowCardDetails(true)}
                    >
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardType}>Carte de débit</Text>
                            <View style={styles.cardStatus}>
                                <View style={[styles.statusDot, { backgroundColor: Colors.status.success }]} />
                                <Text style={styles.statusText}>Active</Text>
                            </View>
                        </View>

                        <View style={styles.cardBody}>
                            <Text style={styles.balance}>{mockCard.balance}</Text>
                            <Text style={styles.cardNumber}>
                                {cardVisible ? mockCard.cardNumber : "**** **** **** 1234"}
                            </Text>
                        </View>

                        <View style={styles.cardFooter}>
                            <View>
                                <Text style={styles.holderLabel}>Titulaire</Text>
                                <Text style={styles.holderName}>{mockCard.holderName}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => setCardVisible(!cardVisible)}
                                style={styles.eyeButton}
                            >
                                <Feather
                                    name={cardVisible ? "eye-off" : "eye"}
                                    size={20}
                                    color={Colors.text.white}
                                />
                            </TouchableOpacity>
                            <View style={styles.logo}>
                                <Text style={styles.logoText}>PayLoop</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Card Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Limite mensuelle</Text>
                        <Text style={styles.statValue}>{mockCard.limit}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Dépensé ce mois</Text>
                        <Text style={styles.statValue}>{mockCard.spent}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Disponible</Text>
                        <Text style={styles.statValue}>$3,750.00</Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <AntDesign name="lock" size={20} color={Colors.primary.red} />
                        </View>
                        <Text style={styles.actionText}>Bloquer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <Feather name="settings" size={20} color={Colors.primary.red} />
                        </View>
                        <Text style={styles.actionText}>Paramètres</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <AntDesign name="creditcard" size={20} color={Colors.primary.red} />
                        </View>
                        <Text style={styles.actionText}>Remplacer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <View style={styles.actionIcon}>
                            <Feather name="phone" size={20} color={Colors.primary.red} />
                        </View>
                        <Text style={styles.actionText}>Support</Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Transactions */}
                <View style={styles.transactionsContainer}>
                    <View style={styles.transactionsHeader}>
                        <Text style={styles.transactionsTitle}>Transactions récentes</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllText}>Voir tout</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={mockCardTransactions}
                        renderItem={renderTransaction}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </View>
            </ScrollView>

            {/* Card Details Modal */}
            <Modal
                visible={showCardDetails}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setShowCardDetails(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Informations de la carte</Text>
                        <TouchableOpacity onPress={() => setShowCardDetails(false)}>
                            <AntDesign name="close" size={24} color={Colors.text.primary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalContent}>
                        <View style={styles.cardInfoItem}>
                            <Text style={styles.cardInfoLabel}>Numéro de carte</Text>
                            <Text style={styles.cardInfoValue}>{mockCard.cardNumber}</Text>
                        </View>

                        <View style={styles.cardInfoItem}>
                            <Text style={styles.cardInfoLabel}>Date d'expiration</Text>
                            <Text style={styles.cardInfoValue}>{mockCard.expiryDate}</Text>
                        </View>

                        <View style={styles.cardInfoItem}>
                            <Text style={styles.cardInfoLabel}>CVV</Text>
                            <Text style={styles.cardInfoValue}>{mockCard.cvv}</Text>
                        </View>

                        <View style={styles.cardInfoItem}>
                            <Text style={styles.cardInfoLabel}>Titulaire</Text>
                            <Text style={styles.cardInfoValue}>{mockCard.holderName}</Text>
                        </View>

                        <Text style={styles.securityNote}>
                            ⚠️ Ne partagez jamais ces informations avec qui que ce soit
                        </Text>
                    </View>
                </SafeAreaView>
            </Modal>
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
        paddingVertical: 16,
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 18,
        fontFamily: "ClashDisplaySemibold",
        color: Colors.text.primary,
    },
    moreButton: {
        padding: 8,
    },
    cardContainer: {
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    card: {
        height: 200,
        backgroundColor: Colors.primary.black,
        borderRadius: 20,
        padding: 20,
        justifyContent: "space-between",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardType: {
        fontSize: 14,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.white,
    },
    cardStatus: {
        flexDirection: "row",
        alignItems: "center",
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontFamily: "ClashDisplay",
        color: Colors.text.white,
        opacity: 0.8,
    },
    cardBody: {
        flex: 1,
        justifyContent: "center",
    },
    balance: {
        fontSize: 28,
        fontFamily: "ClashDisplayBold",
        color: Colors.text.white,
        marginBottom: 8,
    },
    cardNumber: {
        fontSize: 18,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.white,
        letterSpacing: 2,
    },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    holderLabel: {
        fontSize: 12,
        fontFamily: "ClashDisplay",
        color: Colors.text.white,
        opacity: 0.8,
        marginBottom: 2,
    },
    holderName: {
        fontSize: 16,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.white,
    },
    eyeButton: {
        padding: 8,
    },
    logo: {
        alignItems: "flex-end",
    },
    logoText: {
        fontSize: 16,
        fontFamily: "ClashDisplayBold",
        color: Colors.primary.red,
    },
    statsContainer: {
        flexDirection: "row",
        backgroundColor: Colors.background.primary,
        marginHorizontal: 24,
        marginTop: 16,
        borderRadius: 16,
        padding: 16,
    },
    statItem: {
        flex: 1,
        alignItems: "center",
    },
    statLabel: {
        fontSize: 12,
        fontFamily: "ClashDisplay",
        color: Colors.text.secondary,
        marginBottom: 4,
        textAlign: "center",
    },
    statValue: {
        fontSize: 16,
        fontFamily: "ClashDisplayBold",
        color: Colors.text.primary,
    },
    actionsContainer: {
        flexDirection: "row",
        backgroundColor: Colors.background.primary,
        marginHorizontal: 24,
        marginTop: 16,
        borderRadius: 16,
        padding: 16,
        justifyContent: "space-between",
    },
    actionButton: {
        alignItems: "center",
        flex: 1,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.background.secondary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
    },
    actionText: {
        fontSize: 12,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.secondary,
        textAlign: "center",
    },
    transactionsContainer: {
        backgroundColor: Colors.background.primary,
        marginHorizontal: 24,
        marginTop: 16,
        marginBottom: 24,
        borderRadius: 16,
        padding: 16,
    },
    transactionsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    transactionsTitle: {
        fontSize: 18,
        fontFamily: "ClashDisplaySemibold",
        color: Colors.text.primary,
    },
    viewAllText: {
        fontSize: 14,
        fontFamily: "ClashDisplayMedium",
        color: Colors.primary.red,
    },
    transactionItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
    },
    transactionIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.background.secondary,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    transactionDetails: {
        flex: 1,
    },
    transactionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
    },
    merchantName: {
        fontSize: 16,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.primary,
    },
    transactionAmount: {
        fontSize: 16,
        fontFamily: "ClashDisplayBold",
        color: Colors.primary.red,
    },
    transactionMeta: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    transactionDate: {
        fontSize: 12,
        fontFamily: "ClashDisplay",
        color: Colors.text.light,
    },
    transactionStatus: {
        fontSize: 12,
        fontFamily: "ClashDisplayMedium",
    },
    separator: {
        height: 1,
        backgroundColor: Colors.border.light,
        marginVertical: 8,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: Colors.background.primary,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border.light,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: "ClashDisplaySemibold",
        color: Colors.text.primary,
    },
    modalContent: {
        padding: 24,
    },
    cardInfoItem: {
        marginBottom: 24,
    },
    cardInfoLabel: {
        fontSize: 14,
        fontFamily: "ClashDisplay",
        color: Colors.text.secondary,
        marginBottom: 8,
    },
    cardInfoValue: {
        fontSize: 18,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.primary,
    },
    securityNote: {
        fontSize: 14,
        fontFamily: "ClashDisplay",
        color: Colors.status.warning,
        textAlign: "center",
        marginTop: 24,
        padding: 16,
        backgroundColor: Colors.background.secondary,
        borderRadius: 12,
    },
});