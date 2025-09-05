# Implementation Plan

- [x] 1. Configure navigation structure for modal screens

  - Update `app/_layout.tsx` to add Stack.Screen configurations for deposit, withdraw, exchange, and send-money modals
  - Set presentation: 'modal' and headerShown: false for consistent modal behavior
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1_

- [x] 2. Create deposit screen with amount input functionality

  - Create `app/deposit.tsx` with modal layout and AmountInput component
  - Implement local state management for deposit amount and currency selection
  - Add currency selection using existing CurrencyBottomSheet component
  - Implement confirm deposit button with validation
  - Add navigation back to home screen on completion or cancellation
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 3. Create withdrawal screen with amount input functionality

  - Create `app/withdraw.tsx` with modal layout and AmountInput component
  - Implement local state management for withdrawal amount and currency selection
  - Add currency selection using existing CurrencyBottomSheet component
  - Implement confirm withdrawal button with validation
  - Add navigation back to home screen on completion or cancellation
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 4. Create currency exchange screen with dual currency inputs

  - Create `app/exchange.tsx` with modal layout and two AmountInput components
  - Implement state management for origin and destination currencies and amounts
  - Add currency selection for both origin and destination using CurrencyBottomSheet
  - Implement exchange rate calculation logic between currencies
  - Add confirm exchange button with validation
  - Add navigation back to home screen on completion or cancellation
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [x] 5. Create send money screen using existing SendMoneyForm

  - Create `app/send-money.tsx` with modal layout
  - Integrate existing SendMoneyForm component with all its functionality
  - Ensure proper navigation back to home screen on completion or cancellation
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 6. Update home screen action buttons with navigation handlers

  - Modify `app/(tabs)/index.tsx` to import useRouter from expo-router
  - Implement navigation handler functions for each action button (handleDeposit, handleWithdraw, handleExchange, handleSendMoney)
  - Update HomeActionButton onPress props to use navigation handlers
  - _Requirements: 1.1, 2.1, 3.1, 4.1_

- [x] 7. Implement consistent modal styling and layout

  - Create reusable modal container styling that matches existing app design
  - Add consistent header with close button for all modal screens
  - Implement proper SafeAreaView usage for modal screens
  - Ensure consistent spacing and styling using existing Colors constants
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

-

- [x] 8. Add input validation and error handling

  - Implement amount validation logic for positive numbers and proper decimal formatting
  - Add currency selection validation before allowing form submission
  - Implement error state handling with user-friendly error messages
  - Add loading states for form submissions
  - _Requirements: 1.3, 2.3, 3.4, 4.2_

- [ ] 9. Write unit tests for modal screen components

  - Create test files for deposit, withdraw, exchange, and send-money screens
  - Test component rendering and initial state
  - Test input validation logic and error handling
  - Test navigation handler functions
  - _Requirements: 1.1, 2.1, 3.1, 4.1_

-

- [x] 10. Write integration tests for navigation flow

  - Test navigation from home screen to each modal screen
  - Test modal dismissal and return to home screen
  - Test complete user flows for each action type
  - Test currency selection and form submission workflows
  - _Requirements: 5.1, 5.2, 5.3_
