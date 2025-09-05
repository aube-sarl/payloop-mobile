import BottomSheetTest from "@/components/test/bottom-sheet-test";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CardsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <BottomSheetTest />
    </SafeAreaView>
  );
}
