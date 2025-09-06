import { Colors } from "@/constants/Colors";
import { AntDesign, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Transaction {
  id: string;
  type: "send" | "receive" | "deposit" | "withdraw" | "exchange";
  amount: string;
  currency: string;
  recipient?: string;
  sender?: string;
  date: string;
  status: "completed" | "pending" | "failed";
  description: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "send",
    amount: "150.00",
    currency: "USD",
    recipient: "Marie Dubois",
    date: "2025-01-07",
    status: "completed",
    description: "Envoi d'argent",
  },
  {
    id: "2",
    type: "receive",
    amount: "2,500.00",
    currency: "CDF",
    sender: "Jean Mukendi",
    date: "2025-01-06",
    status: "completed",
    description: "Réception d'argent",
  },
  {
    id: "3",
    type: "deposit",
    amount: "500.00",
    currency: "USD",
    date: "2025-01-05",
    status: "completed",
    description: "Dépôt sur compte",
  },
  {
    id: "4",
    type: "withdraw",
    amount: "100.00",
    currency: "USD",
    date: "2025-01-04",
    status: "pending",
    description: "Retrait d'argent",
  },
  {
    id: "5",
    type: "exchange",
    amount: "200.00",
    currency: "USD",
    date: "2025-01-03",
    status: "completed",
    description: "Échange USD → CDF",
  },
  {
    id: "6",
    type: "send",
    amount: "75.50",
    currency: "USD",
    recipient: "Paul Kabila",
    date: "2025-01-02",
    status: "failed",
    description: "Envoi d'argent",
  },
];

export default function TransactionsScreen() {
  const [filter, setFilter] = useState<"all" | "send" | "receive" | "deposit" | "withdraw">("all");

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "send":
        return <Feather name="arrow-up-right" size={20} color={Colors.primary.red} />;
      case "receive":
        return <Feather name="arrow-down-left" size={20} color={Colors.status.success} />;
      case "deposit":
        return <AntDesign name="plus" size={20} color={Colors.status.success} />;
      case "withdraw":
        return <AntDesign name="minus" size={20} color={Colors.primary.red} />;
      case "exchange":
        return <AntDesign name="swap" size={20} color={Colors.primary.black} />;
      default:
        return <Feather name="circle" size={20} color={Colors.text.secondary} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return Colors.status.success;
      case "pending":
        return Colors.status.warning;
      case "failed":
        return Colors.status.error;
      default:
        return Colors.text.secondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Terminé";
      case "pending":
        return "En cours";
      case "failed":
        return "Échoué";
      default:
        return status;
    }
  };

  const filteredTransactions = filter === "all"
    ? mockTransactions
    : mockTransactions.filter(t => t.type === filter);

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TouchableOpacity style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        {getTransactionIcon(item.type)}
      </View>

      <View style={styles.transactionDetails}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionDescription}>{item.description}</Text>
          <Text style={[styles.transactionAmount,
          item.type === "receive" || item.type === "deposit"
            ? styles.positiveAmount
            : styles.negativeAmount
          ]}>
            {item.type === "receive" || item.type === "deposit" ? "+" : "-"}
            {item.amount} {item.currency}
          </Text>
        </View>

        <View style={styles.transactionMeta}>
          <Text style={styles.transactionRecipient}>
            {item.recipient ? `À ${item.recipient}` :
              item.sender ? `De ${item.sender}` :
                item.date}
          </Text>
          <Text style={[styles.transactionStatus, { color: getStatusColor(item.status) }]}>
            {getStatusText(item.status)}
          </Text>
        </View>

        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
          onPress={() => setFilter("all")}
        >
          <Text style={[styles.filterText, filter === "all" && styles.activeFilterText]}>
            Toutes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "send" && styles.activeFilter]}
          onPress={() => setFilter("send")}
        >
          <Text style={[styles.filterText, filter === "send" && styles.activeFilterText]}>
            Envoyées
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "receive" && styles.activeFilter]}
          onPress={() => setFilter("receive")}
        >
          <Text style={[styles.filterText, filter === "receive" && styles.activeFilterText]}>
            Reçues
          </Text>
        </TouchableOpacity>
      </View>

      {/* Transactions List */}
      <FlatList
        data={filteredTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  header: {
    backgroundColor: Colors.background.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: "ClashDisplayBold",
    color: Colors.text.primary,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.background.primary,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
  },
  activeFilter: {
    backgroundColor: Colors.primary.red,
  },
  filterText: {
    fontSize: 14,
    fontFamily: "ClashDisplayMedium",
    color: Colors.text.secondary,
  },
  activeFilterText: {
    color: Colors.text.white,
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  transactionItem: {
    flexDirection: "row",
    backgroundColor: Colors.background.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 16,
    fontFamily: "ClashDisplayMedium",
    color: Colors.text.primary,
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: "ClashDisplayBold",
  },
  positiveAmount: {
    color: Colors.status.success,
  },
  negativeAmount: {
    color: Colors.primary.red,
  },
  transactionMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  transactionRecipient: {
    fontSize: 14,
    fontFamily: "ClashDisplay",
    color: Colors.text.secondary,
  },
  transactionStatus: {
    fontSize: 12,
    fontFamily: "ClashDisplayMedium",
  },
  transactionDate: {
    fontSize: 12,
    fontFamily: "ClashDisplay",
    color: Colors.text.light,
  },
});
