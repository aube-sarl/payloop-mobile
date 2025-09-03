import {
  FONT_CONFIG,
  getFallbackFont,
  getFontFamily,
  PRIMARY_FONT,
} from "@/constants/Fonts";
import { useFonts as useExpoFonts } from "expo-font";
import { useEffect, useState } from "react";

interface FontLoadingResult {
  fontsLoaded: boolean;
  fontError: Error | null;
  fontFamily: string;
}

export function useFonts(): FontLoadingResult {
  const [fontError, setFontError] = useState<Error | null>(null);
  const [fontFamily, setFontFamily] = useState<string>(getFallbackFont());

  const [fontsLoaded, error] = useExpoFonts(FONT_CONFIG);

  useEffect(() => {
    if (error) {
      setFontError(
        new Error(`Failed to load ${PRIMARY_FONT} font: ${error.message}`)
      );
      // Use fallback font when there's an error
      setFontFamily(getFallbackFont());
    } else if (fontsLoaded) {
      setFontError(null);
      // Use primary font when successfully loaded
      setFontFamily(getFontFamily(true, true));
    }
  }, [error, fontsLoaded]);

  return {
    fontsLoaded,
    fontError,
    fontFamily,
  };
}
