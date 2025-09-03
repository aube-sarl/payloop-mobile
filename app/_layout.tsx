import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from '@/hooks/useFonts';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { fontsLoaded, fontError, fontFamily } = useFonts();

  // Set global default font family for all Text components
  // This will be either ClashDisplay (if loaded successfully) or platform fallback
  if (fontsLoaded) {
    const TextWithDefaults = Text as any;
    TextWithDefaults.defaultProps = TextWithDefaults.defaultProps || {};
    TextWithDefaults.defaultProps.style = { fontFamily };
  }

  // Wait for fonts to load before rendering the app
  if (!fontsLoaded) {
    return null;
  }

  // If there's a font error, log it but continue with fallback fonts
  if (fontError) {
    console.warn('Font loading error, using fallback font:', fontError.message);
    console.info('Using fallback font:', fontFamily);
  } else {
    console.info('✅ Fonts loaded successfully! Using font:', fontFamily);
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
