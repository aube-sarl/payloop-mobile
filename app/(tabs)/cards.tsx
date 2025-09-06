import { Colors } from "@/constants/Colors";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Card {
  id: string;
  type: "debit" | "credit" | "virtual";
  balance: string;
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  isActive: boolean;
  currency: string;
}

const mockCards: Card[] = [
  {
    id: "1",
    type: "debit",
    balance: "$2,450.00",
    cardNumber: "**** **** **** 1234",
    holderName: "John Doe",
    expiryDate: "12/27",
    isActive: true,
    currency: "USD",
  },
  {
    id: "2",
    type: "credit",
    balance: "$5,000.00",
    cardNumber: "**** **** **** 5678",
    holderName: "John Doe",
    expiryDate: "08/26",
    isActive: true,
    currency: "USD",
  },
  {
    id: "3",
    type: "virtual",
    balance: "1,200,000 CDF",
    cardNumber: "**** **** **** 9012",
    holderName: "John Doe",
    expiryDate: "03/28",
    isActive: false,
    currency: "CDF",
  },
];

export default function CardsScreen() {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState(mockCards[0]);

  const getCardTypeIcon = (type: string) => {
    switch (type) {
      case "debit":
        return <AntDesign name="creditcard" size={20} color={Colors.text.white} />;
      case "credit":
        return <AntDesign name="creditcard" size={20} color={Colors.text.white} />;
      case "virtual":
        return <Feather name="smartphone" size={20} color={Colors.text.white} />;
      default:
        return <AntDesign name="creditcard" size={20} color={Colors.text.white} />;
    }
  };

  const getCardTypeText = (type: string) => {
    switch (type) {
      case "debit":
        return "Carte de débit";
      case "credit":
        return "Carte de crédit";
      case "virtual":
        return "Carte virtuelle";
      default:
        return "Carte";
    }
  };

  const renderCard = ({ item }: { item: Card }) => (
    <TouchableOpacity
      style={[
        styles.card,
        !item.isActive && styles.inactiveCard,
      ]}
      onPress={() => {
        setSelectedCard(item);
        router.push(`/card-details?cardId=${item.id}`);
      }}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTypeContainer}>
          {getCardTypeIcon(item.type)}
          <Text style={styles.cardType}>{getCardTypeText(item.type)}</Text>
        </View>
        <View style={styles.cardStatus}>
          <View style={[
            styles.statusDot,
            { backgroundColor: item.isActive ? Colors.status.success : Colors.text.light }
          ]} />
          <Text style={styles.statusText}>
            {item.isActive ? "Active" : "Inactive"}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.balance}>{item.balance}</Text>
        <Text style={styles.cardNumber}>{item.cardNumber}</Text>
      </View>

      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.holderLabel}>Titulaire</Text>
          <Text style={styles.holderName}>{item.holderName}</Text>
        </View>
        <View>
          <Text style={styles.expiryLabel}>Expire</Text>
          <Text style={styles.expiryDate}>{item.expiryDate}</Text>
        </View>
        <View style={styles.logo}>
          <Text style={styles.logoText}>PayLoop</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Cartes</Text>
        <TouchableOpacity style={styles.addButton}>
          <AntDesign name="plus" size={24} color={Colors.primary.red} />
        </TouchableOpacity>
      </View>

      {/* Cards List */}
      <FlatList
        data={mockCards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.actionsTitle}>Actions rapides</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <AntDesign name="lock" size={20} color={Colors.primary.red} />
            </View>
            <Text style={styles.actionText}>Bloquer carte</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Feather name="eye" size={20} color={Colors.primary.red} />
            </View>
            <Text style={styles.actionText}>Voir PIN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <AntDesign name="setting" size={20} color={Colors.primary.red} />
            </View>
            <Text style={styles.actionText}>Paramètres</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: "ClashDisplayBold",
    color: Colors.text.primary,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
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
  inactiveCard: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardType: {
    fontSize: 12,
    fontFamily: "ClashDisplayMedium",
    color: Colors.text.white,
    marginLeft: 8,
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
    fontSize: 24,
    fontFamily: "ClashDisplayBold",
    color: Colors.text.white,
    marginBottom: 8,
  },
  cardNumber: {
    fontSize: 16,
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
    fontSize: 10,
    fontFamily: "ClashDisplay",
    color: Colors.text.white,
    opacity: 0.8,
    marginBottom: 2,
  },
  holderName: {
    fontSize: 14,
    fontFamily: "ClashDisplayMedium",
    color: Colors.text.white,
  },
  expiryLabel: {
    fontSize: 10,
    fontFamily: "ClashDisplay",
    color: Colors.text.white,
    opacity: 0.8,
    marginBottom: 2,
  },
  expiryDate: {
    fontSize: 14,
    fontFamily: "ClashDisplayMedium",
    color: Colors.text.white,
  },
  logo: {
    alignItems: "flex-end",
  },
  logoText: {
    fontSize: 16,
    fontFamily: "ClashDisplayBold",
    color: Colors.primary.red,
  },
  actionsContainer: {
    backgroundColor: Colors.background.primary,
    padding: 24,
    marginTop: 16,
  },
  actionsTitle: {
    fontSize: 18,
    fontFamily: "ClashDisplaySemibold",
    color: Colors.text.primary,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: "row",
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
});
