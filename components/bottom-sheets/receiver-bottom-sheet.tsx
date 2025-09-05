import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback, useMemo, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Receiver {
    id: string;
    name: string;
    phone: string;
    avatar?: string;
}

interface ReceiverBottomSheetProps {
    onSelectReceiver: (receiver: Receiver) => void;
}

const mockReceivers: Receiver[] = [
    { id: "1", name: "John Doe", phone: "+1 234 567 8900" },
    { id: "2", name: "Jane Smith", phone: "+1 234 567 8901" },
    { id: "3", name: "Mike Johnson", phone: "+243 123 456 789" },
    { id: "4", name: "Sarah Wilson", phone: "+243 123 456 790" },
];

const ReceiverBottomSheet = forwardRef<BottomSheet, ReceiverBottomSheetProps>(
    ({ onSelectReceiver }, ref) => {
        const [searchQuery, setSearchQuery] = useState("");
        const [filteredReceivers, setFilteredReceivers] = useState(mockReceivers);

        const snapPoints = useMemo(() => ["90%"], []);

        const handleSheetChanges = useCallback((index: number) => {
            console.log("handleSheetChanges", index);
        }, []);

        const handleSearch = (query: string) => {
            setSearchQuery(query);
            const filtered = mockReceivers.filter(
                (receiver) =>
                    receiver.name.toLowerCase().includes(query.toLowerCase()) ||
                    receiver.phone.includes(query)
            );
            setFilteredReceivers(filtered);
        };

        const getInitials = (name: string) => {
            return name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase();
        };

        return (
            <BottomSheet
                ref={ref}
                index={-1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={styles.handle}
            >
                <BottomSheetView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => {
                                // @ts-ignore
                                ref?.current?.close();
                            }}
                            style={styles.closeButton}
                        >
                            <AntDesign name="close" size={24} color={Colors.text.primary} />
                        </TouchableOpacity>
                        <Text style={styles.title}>Choisir un destinataire</Text>
                        <View style={styles.placeholder} />
                    </View>

                    <View style={styles.searchContainer}>
                        <AntDesign name="search1" size={20} color={Colors.text.light} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Rechercher un contact..."
                            placeholderTextColor={Colors.text.light}
                            value={searchQuery}
                            onChangeText={handleSearch}
                        />
                    </View>

                    <BottomSheetScrollView style={styles.content}>
                        <TouchableOpacity style={styles.addNewButton}>
                            <View style={styles.addNewIcon}>
                                <AntDesign name="plus" size={24} color={Colors.primary.red} />
                            </View>
                            <View style={styles.addNewText}>
                                <Text style={styles.addNewTitle}>Ajouter un nouveau contact</Text>
                                <Text style={styles.addNewSubtitle}>
                                    Entrer un numéro de téléphone
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Contacts récents</Text>
                        </View>

                        {filteredReceivers.map((receiver) => (
                            <TouchableOpacity
                                key={receiver.id}
                                style={styles.receiverItem}
                                onPress={() => {
                                    onSelectReceiver(receiver);
                                    // @ts-ignore
                                    ref?.current?.close();
                                }}
                            >
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>{getInitials(receiver.name)}</Text>
                                </View>
                                <View style={styles.receiverInfo}>
                                    <Text style={styles.receiverName}>{receiver.name}</Text>
                                    <Text style={styles.receiverPhone}>{receiver.phone}</Text>
                                </View>
                                <AntDesign
                                    name="right"
                                    size={16}
                                    color={Colors.text.light}
                                />
                            </TouchableOpacity>
                        ))}
                    </BottomSheetScrollView>
                </BottomSheetView>
            </BottomSheet>
        );
    }
);

ReceiverBottomSheet.displayName = "ReceiverBottomSheet";

const styles = StyleSheet.create({
    bottomSheetBackground: {
        backgroundColor: Colors.background.primary,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border.light,
    },
    closeButton: {
        padding: 4,
    },
    title: {
        fontSize: 18,
        fontFamily: "ClashDisplaySemibold",
        color: Colors.text.primary,
    },
    placeholder: {
        width: 32,
    },
    handle: {
        backgroundColor: Colors.border.medium,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.background.secondary,
        marginHorizontal: 20,
        marginVertical: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        fontFamily: "ClashDisplay",
        color: Colors.text.primary,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    addNewButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: Colors.background.secondary,
        borderRadius: 12,
        marginBottom: 24,
    },
    addNewIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.background.primary,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    addNewText: {
        flex: 1,
    },
    addNewTitle: {
        fontSize: 16,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.primary,
        marginBottom: 2,
    },
    addNewSubtitle: {
        fontSize: 14,
        fontFamily: "ClashDisplay",
        color: Colors.text.light,
    },
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.secondary,
    },
    receiverItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: Colors.background.cardElevated,
        borderRadius: 12,
        marginBottom: 8,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: Colors.primary.red,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
    },
    avatarText: {
        fontSize: 16,
        fontFamily: "ClashDisplaySemibold",
        color: Colors.text.white,
    },
    receiverInfo: {
        flex: 1,
    },
    receiverName: {
        fontSize: 16,
        fontFamily: "ClashDisplayMedium",
        color: Colors.text.primary,
        marginBottom: 2,
    },
    receiverPhone: {
        fontSize: 14,
        fontFamily: "ClashDisplay",
        color: Colors.text.light,
    },
});

export default ReceiverBottomSheet;