// Define __DEV__ global
global.__DEV__ = true;

// Mock react-native modules
jest.mock("react-native", () => {
  const React = require("react");

  const MockText = React.forwardRef(({ children, style, ...props }, ref) => {
    return React.createElement(
      "Text",
      {
        ...props,
        style,
        ref,
        "data-testid": props.testID,
      },
      children
    );
  });

  // Add defaultProps property to the mock
  MockText.defaultProps = {};
  MockText.displayName = "Text";

  return {
    Platform: {
      select: jest.fn(() => "System"),
    },
    Text: MockText,
    StyleSheet: {
      create: (styles) => styles,
      flatten: (style) => {
        if (Array.isArray(style)) {
          return style.reduce((acc, s) => ({ ...acc, ...s }), {});
        }
        return style || {};
      },
    },
  };
});

// Mock expo-font
jest.mock("expo-font", () => ({
  useFonts: jest.fn(),
}));
