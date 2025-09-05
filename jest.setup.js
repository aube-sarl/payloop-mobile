import "@testing-library/react-native/extend-expect";

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  })),
}));

// Mock @gorhom/bottom-sheet
jest.mock("@gorhom/bottom-sheet", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: React.forwardRef((props, ref) => {
      React.useImperativeHandle(ref, () => ({
        expand: jest.fn(),
        close: jest.fn(),
        collapse: jest.fn(),
      }));
      return null;
    }),
  };
});

// Mock expo-haptics
jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: "light",
    Medium: "medium",
    Heavy: "heavy",
  },
}));

// Mock react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock @expo/vector-icons
jest.mock("@expo/vector-icons", () => ({
  AntDesign: "AntDesign",
  Ionicons: "Ionicons",
  MaterialIcons: "MaterialIcons",
}));

// Mock assets
jest.mock("@/assets/icons/_icons", () => ({
  usFlag: "mocked-us-flag",
  congoFlag: "mocked-congo-flag",
  rwandaFlag: "mocked-rwanda-flag",
}));

// Mock components
jest.mock("@/components/ui/modal-container", () => {
  const React = require("react");
  return function MockModalContainer({ title, onClose, children }) {
    return React.createElement(
      "div",
      { "data-testid": "modal-container" },
      React.createElement("div", { "data-testid": "modal-title" }, title),
      React.createElement(
        "button",
        {
          "data-testid": "modal-close-button",
          onClick: onClose,
        },
        "Close"
      ),
      children
    );
  };
});

jest.mock("@/components/text-inputs/amount-input", () => {
  const React = require("react");
  return function MockAmountInput({
    value,
    onChangeText,
    placeholder,
    hasError,
    currency,
    onCurrencyPress,
  }) {
    return React.createElement(
      "div",
      { "data-testid": "amount-input" },
      React.createElement("input", {
        placeholder,
        value,
        onChange: (e) => onChangeText && onChangeText(e.target.value),
        "data-testid": "amount-input-field",
      }),
      React.createElement(
        "button",
        {
          onClick: onCurrencyPress,
          "data-testid": "currency-button",
        },
        currency
      )
    );
  };
});

jest.mock("@/components/buttons/rounded-button", () => {
  const React = require("react");
  return function MockRoundedButton({ text, onPress, disabled }) {
    return React.createElement(
      "button",
      {
        onClick: onPress,
        disabled,
        "data-testid": "rounded-button",
      },
      text
    );
  };
});

jest.mock("@/components/bottom-sheets/currency-bottom-sheet", () => {
  const React = require("react");
  return React.forwardRef(function MockCurrencyBottomSheet(props, ref) {
    React.useImperativeHandle(ref, () => ({
      expand: jest.fn(),
      close: jest.fn(),
      collapse: jest.fn(),
    }));
    return null;
  });
});

jest.mock("@/components/forms/send-money-form", () => {
  const React = require("react");
  return function MockSendMoneyForm({ onComplete, onCancel }) {
    return React.createElement(
      "div",
      { "data-testid": "send-money-form" },
      React.createElement(
        "button",
        {
          "data-testid": "complete-button",
          onClick: onComplete,
        },
        "Complete"
      ),
      React.createElement(
        "button",
        {
          "data-testid": "cancel-button",
          onClick: onCancel,
        },
        "Cancel"
      )
    );
  };
});
