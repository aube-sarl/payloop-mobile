import { Platform } from "react-native";

/**
 * Font configuration constants for the application
 */

// Primary font family name
export const PRIMARY_FONT = "ClashDisplay";

// Platform-specific fallback fonts
export const FALLBACK_FONTS = {
  ios: "System",
  android: "Roboto",
  web: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  default: "System",
} as const;

/**
 * Get the appropriate fallback font for the current platform
 */
export const getFallbackFont = (): string => {
  return Platform.select(FALLBACK_FONTS) as string;
};

/**
 * Get the font family to use, with fallback support
 * @param preferPrimary - Whether to prefer the primary font (ClashDisplay)
 * @param isLoaded - Whether the primary font has been loaded successfully
 */
export const getFontFamily = (
  preferPrimary: boolean = true,
  isLoaded: boolean = false
): string => {
  if (preferPrimary && isLoaded) {
    return PRIMARY_FONT;
  }
  return getFallbackFont();
};

/**
 * Font loading configuration for expo-font
 */
export const FONT_CONFIG = {
  [PRIMARY_FONT]: require("../assets/fonts/ClashDisplay-Variable.ttf"),
};
