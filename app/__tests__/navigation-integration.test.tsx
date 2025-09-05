import { render, fireEvent, waitFor } from '@testing-library/react-native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Mock expo-router
const mockPush = jest.fn();
const mockBack = jest.fn();
const mockReplace = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
    back: mockBack,
    replace: mockReplace,
  })),
}));

// Mock validation functions
jest.mock('@/utils/validation', () => ({
  validateAmount: jest.fn(() => ({ isValid: true })),
  validateCurrency: jest.fn(() => ({ isValid: true })),
  validateCurrencyExchange: jest.fn(() => ({ isValid: true })),
}));

// Create mock components for testing
const MockHomeScreen = () => {
  const { useRouter } = require('expo-router');
  const router = useRouter();
  
  const handleDeposit = () => router.push('/deposit');
  const handleWithdraw = () => router.push('/withdraw');
  const handleExchange = () => router.push('/exchange');
  const handleSendMoney = () => router.push('/send-money');

  return (
    <View testID="home-screen">
      <TouchableOpacity testID="deposit-button" onPress={handleDeposit}>
        <Text>Déposer</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="withdraw-button