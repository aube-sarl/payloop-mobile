/**
 * Validation utilities for form inputs
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates amount input for positive numbers and proper decimal formatting
 */
export const validateAmount = (amount: string): ValidationResult => {
  // Check if amount is empty
  if (!amount || amount.trim().length === 0) {
    return {
      isValid: false,
      error: "Amount is required",
    };
  }

  // Check if amount is a valid number
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) {
    return {
      isValid: false,
      error: "Please enter a valid number",
    };
  }

  // Check if amount is positive
  if (numAmount <= 0) {
    return {
      isValid: false,
      error: "Amount must be greater than 0",
    };
  }

  // Check decimal places (max 2 decimal places)
  const decimalParts = amount.split(".");
  if (decimalParts.length > 2) {
    return {
      isValid: false,
      error: "Invalid decimal format",
    };
  }

  if (decimalParts.length === 2 && decimalParts[1].length > 2) {
    return {
      isValid: false,
      error: "Maximum 2 decimal places allowed",
    };
  }

  // Check for reasonable maximum amount (prevent extremely large numbers)
  if (numAmount > 999999999.99) {
    return {
      isValid: false,
      error: "Amount is too large",
    };
  }

  return {
    isValid: true,
  };
};

/**
 * Validates currency selection
 */
export const validateCurrency = (currency: string): ValidationResult => {
  if (!currency || currency.trim().length === 0) {
    return {
      isValid: false,
      error: "Please select a currency",
    };
  }

  return {
    isValid: true,
  };
};

/**
 * Validates that two currencies are different for exchange
 */
export const validateCurrencyExchange = (
  fromCurrency: string,
  toCurrency: string
): ValidationResult => {
  const fromValidation = validateCurrency(fromCurrency);
  if (!fromValidation.isValid) {
    return fromValidation;
  }

  const toValidation = validateCurrency(toCurrency);
  if (!toValidation.isValid) {
    return toValidation;
  }

  if (fromCurrency === toCurrency) {
    return {
      isValid: false,
      error: "Please select different currencies for exchange",
    };
  }

  return {
    isValid: true,
  };
};

/**
 * Validates receiver selection for send money
 */
export const validateReceiver = (
  receiver: { name: string; phone: string } | undefined
): ValidationResult => {
  if (!receiver) {
    return {
      isValid: false,
      error: "Please select a receiver",
    };
  }

  if (!receiver.name || receiver.name.trim().length === 0) {
    return {
      isValid: false,
      error: "Receiver name is required",
    };
  }

  if (!receiver.phone || receiver.phone.trim().length === 0) {
    return {
      isValid: false,
      error: "Receiver phone is required",
    };
  }

  return {
    isValid: true,
  };
};

/**
 * Formats amount input to ensure proper decimal formatting
 */
export const formatAmountInput = (input: string): string => {
  // Remove any non-numeric characters except decimal point
  let cleaned = input.replace(/[^0-9.]/g, "");

  // Ensure only one decimal point
  const parts = cleaned.split(".");
  if (parts.length > 2) {
    cleaned = parts[0] + "." + parts.slice(1).join("");
  }

  // Limit to 2 decimal places
  if (parts.length === 2 && parts[1].length > 2) {
    cleaned = parts[0] + "." + parts[1].substring(0, 2);
  }

  return cleaned;
};
