# Design Document

## Overview

This design implements navigation functionality for the four home action buttons (Déposer, Retirer, Echanger, Envoyer) using Expo Router's modal presentation pattern. Each button will navigate to a dedicated screen that slides up from the bottom, providing a consistent and intuitive user experience. The design leverages the existing component architecture and maintains consistency with the current app styling.

## Architecture

### Navigation Structure

The app uses Expo Router with a Stack navigator. We'll add new modal screens to the existing navigation structure:

```
app/
├── _layout.tsx (existing Stack navigator)
├── (tabs)/
│   └── index.tsx (home screen with action buttons)
├── deposit.tsx (new modal screen)
├── withdraw.tsx (new modal screen)
├── exchange.tsx (new modal screen)
└── send-money.tsx (new modal screen)
```

### Modal Presentation Pattern

All action screens will use Expo Router's modal presentation:

- Screens slide up from bottom
- Semi-transparent overlay behind modal
- Swipe-to-dismiss gesture support
- Consistent header with close button

## Components and Interfaces

### Screen Components

#### 1. DepositScreen (`app/deposit.tsx`)

- **Purpose**: Handle deposit amount entry
- **Components Used**:
  - `AmountInput` (existing component)
  - `RoundedButton` (existing component)
- **State Management**: Local state for deposit amount
- **Navigation**: Modal presentation, returns to home on completion/cancel

#### 2. WithdrawScreen (`app/withdraw.tsx`)

- **Purpose**: Handle withdrawal amount entry
- **Components Used**:
  - `AmountInput` (existing component)
  - `RoundedButton` (existing component)
- **State Management**: Local state for withdrawal amount
- **Navigation**: Modal presentation, returns to home on completion/cancel

#### 3. ExchangeScreen (`app/exchange.tsx`)

- **Purpose**: Currency exchange with dual currency inputs
- **Components Used**:
  - `AmountInput` (existing component) - 2 instances
  - `CurrencyBottomSheet` (existing component)
  - `RoundedButton` (existing component)
- **State Management**:
  - Origin currency and amount
  - Destination currency and calculated amount
  - Exchange rate calculation
- **Navigation**: Modal presentation, returns to home on completion/cancel

#### 4. SendMoneyScreen (`app/send-money.tsx`)

- **Purpose**: Full send money functionality
- **Components Used**:
  - `SendMoneyForm` (existing component) - reused entirely
- **State Management**: Handled by existing SendMoneyForm
- **Navigation**: Modal presentation, returns to home on completion/cancel

### Updated Home Screen

The `HomeActionButton` components in `app/(tabs)/index.tsx` will be updated with navigation handlers:

```typescript
// Navigation handlers for each action button
const handleDeposit = () => router.push("/deposit");
const handleWithdraw = () => router.push("/withdraw");
const handleExchange = () => router.push("/exchange");
const handleSendMoney = () => router.push("/send-money");
```

### Navigation Configuration

Update `app/_layout.tsx` to include modal screen configurations:

```typescript
<Stack.Screen
  name="deposit"
  options={{
    presentation: 'modal',
    headerShown: false
  }}
/>
<Stack.Screen
  name="withdraw"
  options={{
    presentation: 'modal',
    headerShown: false
  }}
/>
<Stack.Screen
  name="exchange"
  options={{
    presentation: 'modal',
    headerShown: false
  }}
/>
<Stack.Screen
  name="send-money"
  options={{
    presentation: 'modal',
    headerShown: false
  }}
/>
```

## Data Models

### DepositData

```typescript
interface DepositData {
  amount: string;
  currency: string;
  currencyIcon: any;
}
```

### WithdrawData

```typescript
interface WithdrawData {
  amount: string;
  currency: string;
  currencyIcon: any;
}
```

### ExchangeData

```typescript
interface ExchangeData {
  originAmount: string;
  originCurrency: string;
  originCurrencyIcon: any;
  destinationAmount: string;
  destinationCurrency: string;
  destinationCurrencyIcon: any;
  exchangeRate: number;
}
```

### Common Modal Props

```typescript
interface ModalScreenProps {
  onClose: () => void;
  onComplete: (data: any) => void;
}
```

## Error Handling

### Input Validation

- **Amount Validation**: Ensure positive numbers, proper decimal formatting
- **Currency Selection**: Validate currency is selected before proceeding
- **Network Errors**: Handle API failures gracefully with user feedback

### Navigation Error Handling

- **Modal Dismissal**: Handle both programmatic and gesture-based dismissal
- **Navigation Stack**: Ensure proper cleanup when modals are dismissed
- **State Persistence**: Maintain form state during navigation interruptions

### User Feedback

- **Loading States**: Show loading indicators during processing
- **Success Messages**: Confirm successful operations
- **Error Messages**: Clear, actionable error messages

## Testing Strategy

### Unit Tests

- **Component Rendering**: Test each modal screen renders correctly
- **Input Validation**: Test amount input validation logic
- **Currency Selection**: Test currency selection functionality
- **Navigation Handlers**: Test navigation function calls

### Integration Tests

- **Modal Navigation**: Test navigation from home to each modal
- **Form Submission**: Test complete user flows for each action
- **State Management**: Test state updates and persistence
- **Bottom Sheet Integration**: Test currency and receiver selection

### User Acceptance Tests

- **Navigation Flow**: Verify smooth transitions between screens
- **Input Experience**: Test keyboard handling and input validation
- **Visual Consistency**: Ensure consistent styling across all modals
- **Gesture Support**: Test swipe-to-dismiss functionality

### Test Data

```typescript
const testCurrencies = [
  { currency: "USD", icon: usFlag },
  { currency: "CDF", icon: congoFlag },
  { currency: "RWF", icon: rwandaFlag },
];

const testAmounts = ["100.00", "50.50", "1000"];
const testExchangeRates = { "USD-CDF": 2000, "USD-RWF": 1200 };
```

## Implementation Notes

### Reusable Components

- Leverage existing `AmountInput`, `RoundedButton`, and bottom sheet components
- Maintain consistent styling using existing `Colors` constants
- Reuse `SendMoneyForm` component entirely for send money functionality

### Performance Considerations

- Lazy load modal screens to improve initial app load time
- Optimize currency conversion calculations
- Implement proper cleanup for bottom sheet refs

### Accessibility

- Ensure proper screen reader support for all interactive elements
- Implement proper focus management for modal navigation
- Add appropriate accessibility labels and hints

### Platform Considerations

- Test modal presentation on both iOS and Android
- Ensure proper keyboard handling across platforms
- Verify gesture support works consistently
