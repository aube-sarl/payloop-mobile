import { PRIMARY_FONT } from "@/constants/Fonts";
import { useFonts } from "@/hooks/useFonts";
import { renderHook, waitFor } from "@testing-library/react-native";

// Mocks are configured in jest.setup.js

const mockUseExpoFonts = require("expo-font")
  .useFonts as jest.MockedFunction<any>;

describe("useFonts Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return fallback font initially", () => {
    mockUseExpoFonts.mockReturnValue([false, null]);

    const { result } = renderHook(() => useFonts());

    expect(result.current.fontsLoaded).toBe(false);
    expect(result.current.fontError).toBe(null);
    expect(result.current.fontFamily).toBe("System");
  });

  it("should return primary font when fonts are loaded successfully", async () => {
    mockUseExpoFonts.mockReturnValue([true, null]);

    const { result } = renderHook(() => useFonts());

    await waitFor(() => {
      expect(result.current.fontsLoaded).toBe(true);
      expect(result.current.fontError).toBe(null);
      expect(result.current.fontFamily).toBe(PRIMARY_FONT);
    });
  });

  it("should return fallback font and error when font loading fails", async () => {
    const mockError = new Error("Font loading failed");
    mockUseExpoFonts.mockReturnValue([false, mockError]);

    const { result } = renderHook(() => useFonts());

    await waitFor(() => {
      expect(result.current.fontsLoaded).toBe(false);
      expect(result.current.fontError).toEqual(expect.any(Error));
      expect(result.current.fontError?.message).toContain(
        "Failed to load ClashDisplay font"
      );
      expect(result.current.fontFamily).toBe("System");
    });
  });

  it("should handle font loading state transitions correctly", async () => {
    // Start with loading state
    mockUseExpoFonts.mockReturnValue([false, null]);

    const { result, rerender } = renderHook(() => useFonts());

    expect(result.current.fontsLoaded).toBe(false);
    expect(result.current.fontFamily).toBe("System");

    // Simulate successful loading
    mockUseExpoFonts.mockReturnValue([true, null]);
    rerender({});

    await waitFor(() => {
      expect(result.current.fontsLoaded).toBe(true);
      expect(result.current.fontFamily).toBe(PRIMARY_FONT);
      expect(result.current.fontError).toBe(null);
    });
  });
});
