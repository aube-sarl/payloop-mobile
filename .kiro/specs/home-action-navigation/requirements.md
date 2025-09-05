# Requirements Document

## Introduction

This feature implements navigation functionality for the four main action buttons on the home screen (Deposer, Retirer, Echanger, Envoyer). Each button will navigate to a dedicated screen with specific functionality: deposit amount entry, withdrawal amount entry, currency exchange with dual currency inputs, and a comprehensive send money interface.

## Requirements

### Requirement 1

**User Story:** As a user, I want to click the "Deposer" button and be taken to a deposit screen, so that I can enter the amount I want to deposit.

#### Acceptance Criteria

1. WHEN the user taps the "Deposer" button THEN the system SHALL navigate to a deposit screen that slides up from the bottom
2. WHEN the deposit screen opens THEN the system SHALL display an amount input field for entering deposit amounts
3. WHEN the user enters a valid amount THEN the system SHALL enable a confirm deposit button
4. WHEN the user cancels or completes the deposit THEN the system SHALL return to the home screen

### Requirement 2

**User Story:** As a user, I want to click the "Retirer" button and be taken to a withdrawal screen, so that I can enter the amount I want to withdraw.

#### Acceptance Criteria

1. WHEN the user taps the "Retirer" button THEN the system SHALL navigate to a withdrawal screen that slides up from the bottom
2. WHEN the withdrawal screen opens THEN the system SHALL display an amount input field for entering withdrawal amounts
3. WHEN the user enters a valid amount THEN the system SHALL enable a confirm withdrawal button
4. WHEN the user cancels or completes the withdrawal THEN the system SHALL return to the home screen

### Requirement 3

**User Story:** As a user, I want to click the "Echanger" button and be taken to a currency exchange screen, so that I can convert between different currencies.

#### Acceptance Criteria

1. WHEN the user taps the "Echanger" button THEN the system SHALL navigate to a currency exchange screen
2. WHEN the exchange screen opens THEN the system SHALL display two currency input fields for origin and destination currencies
3. WHEN the user selects currencies THEN the system SHALL allow amount entry for the origin currency
4. WHEN the user enters an amount THEN the system SHALL calculate and display the converted amount in the destination currency
5. WHEN the user confirms the exchange THEN the system SHALL process the currency conversion
6. WHEN the user cancels or completes the exchange THEN the system SHALL return to the home screen

### Requirement 4

**User Story:** As a user, I want to click the "Envoyer" button and be taken to a comprehensive send money screen, so that I can transfer money to recipients.

#### Acceptance Criteria

1. WHEN the user taps the "Envoyer" button THEN the system SHALL navigate to a send money screen
2. WHEN the send money screen opens THEN the system SHALL display all features from the existing SendMoneyForm component
3. WHEN the user completes the send money process THEN the system SHALL process the money transfer
4. WHEN the user cancels or completes the send THEN the system SHALL return to the home screen

### Requirement 5

**User Story:** As a user, I want consistent navigation patterns across all action screens, so that the app feels cohesive and intuitive.

#### Acceptance Criteria

1. WHEN any action screen opens THEN the system SHALL use consistent animation patterns (bottom sheet or modal presentation)
2. WHEN any action screen is displayed THEN the system SHALL provide a clear way to cancel or go back
3. WHEN the user navigates between screens THEN the system SHALL maintain proper navigation stack management
4. WHEN screens are presented THEN the system SHALL follow the existing app's design patterns and styling
