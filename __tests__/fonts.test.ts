import {
  FALLBACK_FONTS,
  getFallbackFont,
  getFontFamily,
  PRIMARY_FONT,
} from "@/constants/Fonts";
import { Platform } from "react-native";

// Mock Platform.select
jest.mock("react-native", () => ({
  Platform: {
    select: jest.fn(),
  },
}));

const mockPlatformSelect = Platform.select as jest.MockedFunction<
  typeof Platform.select
>;

describe("Font Fallback System", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getFallbackFont", () => {
    it("should return iOS system font for iOS platform", () => {
      mockPlatformSelect.mockReturnValue(FALLBACK_FONTS.ios);
      const result = getFallbackFont();
      expect(result).toBe("System");
      expect(mockPlatformSelect).toHaveBeenCalledWith(FALLBACK_FONTS);
    });

    it("should return Android Roboto font for Android platform", () => {
      mockPlatformSelect.mockReturnValue(FALLBACK_FONTS.android);
      const result = getFallbackFont();
      expect(result).toBe("Roboto");
      expect(mockPlatformSelect).toHaveBeenCalledWith(FALLBACK_FONTS);
    });

    it("should return web system fonts for web platform", () => {
      mockPlatformSelect.mockReturnValue(FALLBACK_FONTS.web);
      const result = getFallbackFont();
      expect(result).toBe(
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      );
      expect(mockPlatformSelect).toHaveBeenCalledWith(FALLBACK_FONTS);
    });

    it("should return default system font for unknown platforms", () => {
      mockPlatformSelect.mockReturnValue(FALLBACK_FONTS.default);
      const result = getFallbackFont();
      expect(result).toBe("System");
      expect(mockPlatformSelect).toHaveBeenCalledWith(FALLBACK_FONTS);
    });
  });

  describe("getFontFamily", () => {
    beforeEach(() => {
      mockPlatformSelect.mockReturnValue(FALLBACK_FONTS.ios);
    });

    it("should return primary font when preferPrimary is true and font is loaded", () => {
      const result = getFontFamily(true, true);
      expect(result).toBe(PRIMARY_FONT);
    });

    it("should return fallback font when preferPrimary is true but font is not loaded", () => {
      const result = getFontFamily(true, false);
      expect(result).toBe("System");
    });

    it("should return fallback font when preferPrimary is false", () => {
      const result = getFontFamily(false, true);
      expect(result).toBe("System");
    });

    it("should return fallback font when preferPrimary is false and font is not loaded", () => {
      const result = getFontFamily(false, false);
      expect(result).toBe("System");
    });
  });

  describe("Platform-specific fallback behavior", () => {
    const platforms = [
      { platform: "ios", expected: "System" },
      { platform: "android", expected: "Roboto" },
      {
        platform: "web",
        expected:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      },
    ];

    platforms.forEach(({ platform, expected }) => {
      it(`should provide correct fallback for ${platform}`, () => {
        mockPlatformSelect.mockReturnValue(
          FALLBACK_FONTS[platform as keyof typeof FALLBACK_FONTS]
        );
        const result = getFallbackFont();
        expect(result).toBe(expected);
      });
    });
  });
});
