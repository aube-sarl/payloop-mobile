#!/usr/bin/env node

/**
 * Font Fallback Validation Script
 *
 * This script validates that the font fallback system is properly configured
 * by checking file existence, imports, and configuration consistency.
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 Validating Font Fallback Implementation...\n");

let hasErrors = false;

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${description}: ${filePath}`);
    return true;
  } else {
    console.log(`❌ ${description}: ${filePath} (NOT FOUND)`);
    hasErrors = true;
    return false;
  }
}

function checkFileContent(filePath, searchText, description) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");
    if (content.includes(searchText)) {
      console.log(`✅ ${description}`);
      return true;
    } else {
      console.log(`❌ ${description} (NOT FOUND)`);
      hasErrors = true;
      return false;
    }
  } else {
    console.log(`❌ ${description}: File not found`);
    hasErrors = true;
    return false;
  }
}

// Check required files exist
console.log("📁 Checking Required Files:");
checkFile("assets/fonts/ClashDisplay-Variable.ttf", "ClashDisplay font file");
checkFile("constants/Fonts.ts", "Font constants file");
checkFile("hooks/useFonts.ts", "Font loading hook");
checkFile("app/_layout.tsx", "Root layout file");
checkFile("components/ThemedText.tsx", "ThemedText component");

console.log("\n📋 Checking File Contents:");

// Check font constants implementation
checkFileContent(
  "constants/Fonts.ts",
  "getFallbackFont",
  "Font constants exports getFallbackFont function"
);

checkFileContent(
  "constants/Fonts.ts",
  "Platform.select",
  "Font constants uses Platform.select for fallbacks"
);

// Check useFonts hook implementation
checkFileContent(
  "hooks/useFonts.ts",
  "fontFamily",
  "useFonts hook returns fontFamily"
);

checkFileContent(
  "hooks/useFonts.ts",
  "getFallbackFont",
  "useFonts hook imports getFallbackFont"
);

// Check root layout integration
checkFileContent(
  "app/_layout.tsx",
  "fontFamily",
  "Root layout uses fontFamily from useFonts"
);

checkFileContent(
  "app/_layout.tsx",
  "Text.defaultProps",
  "Root layout sets Text.defaultProps"
);

// Check app.json configuration
if (fs.existsSync("app.json")) {
  const appConfig = JSON.parse(fs.readFileSync("app.json", "utf8"));
  if (appConfig.expo && appConfig.expo.assetBundlePatterns) {
    const hasAssetPattern = appConfig.expo.assetBundlePatterns.some(
      (pattern) => pattern.includes("fonts") || pattern.includes("assets")
    );
    if (hasAssetPattern) {
      console.log("✅ app.json includes font assets in bundle patterns");
    } else {
      console.log("❌ app.json missing font assets in bundle patterns");
      hasErrors = true;
    }
  } else {
    console.log("❌ app.json missing assetBundlePatterns configuration");
    hasErrors = true;
  }
} else {
  console.log("❌ app.json file not found");
  hasErrors = true;
}

console.log("\n🧪 Test Files:");
checkFile("__tests__/fonts.test.ts", "Font utility tests");
checkFile("__tests__/useFonts.test.ts", "Font hook tests");
checkFile("__tests__/FontFallbackDemo.tsx", "Font fallback demo component");
checkFile("__tests__/FONT_FALLBACK_TESTING.md", "Testing documentation");

console.log("\n📊 Validation Summary:");
if (hasErrors) {
  console.log("❌ Font fallback validation FAILED");
  console.log("Please fix the issues above before proceeding.");
  process.exit(1);
} else {
  console.log("✅ Font fallback validation PASSED");
  console.log("All required files and configurations are in place.");
  console.log("\nNext steps:");
  console.log("1. Run the app: npm run ios/android/web");
  console.log("2. Test font loading behavior manually");
  console.log("3. Check console for any font loading errors");
  console.log("4. Verify fallback fonts display correctly");
}

console.log("\n📖 For detailed testing instructions, see:");
console.log("   __tests__/FONT_FALLBACK_TESTING.md");
