# Font Fallback Testing Guide

This document describes how to test the platform-specific font fallback implementation.

## Overview

The font fallback system ensures that:

1. ClashDisplay is used when available
2. Platform-specific fallbacks are used when ClashDisplay fails to load
3. Graceful degradation occurs across iOS, Android, and Web platforms

## Platform-Specific Fallbacks

| Platform | Fallback Font                                                        |
| -------- | -------------------------------------------------------------------- |
| iOS      | System                                                               |
| Android  | Roboto                                                               |
| Web      | system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif |
| Default  | System                                                               |

## Manual Testing Procedures

### 1. Test Successful Font Loading

**Steps:**

1. Ensure `assets/fonts/ClashDisplay-Variable.ttf` exists
2. Run the app on each platform: `npm run ios`, `npm run android`, `npm run web`
3. Verify that text displays with ClashDisplay font
4. Check console for no font loading errors

**Expected Result:**

- All text should display with ClashDisplay font
- No error messages in console
- Font loading should complete before app renders

### 2. Test Font Loading Failure

**Steps:**

1. Temporarily rename or remove `assets/fonts/ClashDisplay-Variable.ttf`
2. Run the app on each platform
3. Check console for font loading error messages
4. Verify that text displays with platform fallback fonts

**Expected Result:**

- iOS: Text displays with System font
- Android: Text displays with Roboto font
- Web: Text displays with system-ui font stack
- Console shows font loading error but app continues to work
- No crashes or blank screens

### 3. Test ThemedText Component Integration

**Steps:**

1. Navigate to screens using ThemedText components
2. Verify that ThemedText inherits the global font (ClashDisplay or fallback)
3. Test custom fontFamily overrides still work

**Expected Result:**

- ThemedText components use the global font by default
- Custom fontFamily props override the global font
- Type-based styling (fontSize, fontWeight) works correctly

### 4. Test Platform-Specific Behavior

**iOS Testing:**

```bash
npm run ios
```

- Verify System font is used as fallback
- Test on iOS Simulator and physical device

**Android Testing:**

```bash
npm run android
```

- Verify Roboto font is used as fallback
- Test on Android Emulator and physical device

**Web Testing:**

```bash
npm run web
```

- Verify system-ui font stack is used as fallback
- Test in different browsers (Chrome, Safari, Firefox)

## Using the Font Fallback Demo Component

Add the `FontFallbackDemo` component to a test screen to visualize font behavior:

```typescript
import { FontFallbackDemo } from "@/__tests__/FontFallbackDemo";

// Add to any screen for testing
<FontFallbackDemo />;
```

This component displays:

- Current font loading status
- Active font family
- Examples of different font configurations
- Error messages if font loading fails

## Automated Testing (Future Enhancement)

To add automated testing, install Jest and React Native Testing Library:

```bash
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native
```

Then run the test files:

- `__tests__/fonts.test.ts` - Tests font utility functions
- `__tests__/useFonts.test.ts` - Tests font loading hook

## Troubleshooting

### Common Issues

1. **Font not loading on Web:**

   - Ensure font file is accessible via web server
   - Check browser console for 404 errors
   - Verify font format is supported

2. **Android font issues:**

   - Clear Metro cache: `npx expo start --clear`
   - Rebuild the app
   - Check Android logs for font loading errors

3. **iOS font issues:**
   - Clean build folder in Xcode
   - Verify font is included in bundle
   - Check iOS device logs

### Debugging Commands

```bash
# Clear Metro cache
npx expo start --clear

# Reset Expo development client
npx expo install --fix

# Check bundle contents (Web)
npx expo export --platform web
```

## Implementation Details

The fallback system works through:

1. **Font Constants** (`constants/Fonts.ts`):

   - Defines platform-specific fallback fonts
   - Provides utility functions for font selection

2. **Font Loading Hook** (`hooks/useFonts.ts`):

   - Loads ClashDisplay font using expo-font
   - Returns appropriate font family based on loading status
   - Handles errors gracefully

3. **Global Font Configuration** (`app/_layout.tsx`):

   - Sets global Text.defaultProps.style.fontFamily
   - Uses either ClashDisplay or platform fallback
   - Waits for font loading before rendering

4. **Component Integration** (`components/ThemedText.tsx`):
   - Inherits global font by default
   - Supports fontFamily overrides
   - Maintains existing styling features
