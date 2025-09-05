import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { default as React } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ClashDisplay: require("../assets/fonts/clashdisplay/ClashDisplay-Regular.otf"),
    ClashDisplayMedium: require("../assets/fonts/clashdisplay/ClashDisplay-Medium.otf"),
    ClashDisplaySemibold: require("../assets/fonts/clashdisplay/ClashDisplay-Semibold.otf"),
    ClashDisplayBold: require("../assets/fonts/clashdisplay/ClashDisplay-Bold.otf"),
    ClashDisplayLight: require("../assets/fonts/clashdisplay/ClashDisplay-Light.otf"),
    ClashDisplayExtralight: require("../assets/fonts/clashdisplay/ClashDisplay-Extralight.otf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="onboarding-one" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding-two" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding-three" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="deposit" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="withdraw" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="exchange" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="send-money" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
