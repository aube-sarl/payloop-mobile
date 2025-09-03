import { ThemedText } from '@/components/ThemedText';
import { getFallbackFont, PRIMARY_FONT } from '@/constants/Fonts';
import { useFonts } from '@/hooks/useFonts';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Demo component to test font fallback behavior across platforms
 * This component can be used for manual testing to verify that:
 * 1. ClashDisplay loads correctly when available
 * 2. Platform-specific fallbacks work when ClashDisplay fails
 * 3. ThemedText components inherit the correct font
 */
export function FontFallbackDemo() {
    const { fontsLoaded, fontError, fontFamily } = useFonts();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Font Fallback Test</Text>

            <View style={styles.section}>
                <Text style={styles.label}>Font Loading Status:</Text>
                <Text style={styles.value}>
                    {fontsLoaded ? 'Loaded' : 'Loading...'}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Current Font Family:</Text>
                <Text style={styles.value}>{fontFamily}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Primary Font (ClashDisplay):</Text>
                <Text style={[styles.value, { fontFamily: PRIMARY_FONT }]}>
                    This text uses ClashDisplay (if loaded)
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Platform Fallback Font:</Text>
                <Text style={[styles.value, { fontFamily: getFallbackFont() }]}>
                    This text uses platform fallback font
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>ThemedText Component:</Text>
                <ThemedText style={styles.value}>
                    This ThemedText inherits global font
                </ThemedText>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>ThemedText with Override:</Text>
                <ThemedText style={[styles.value, { fontFamily: 'monospace' }]}>
                    This ThemedText uses monospace override
                </ThemedText>
            </View>

            {fontError && (
                <View style={[styles.section, styles.errorSection]}>
                    <Text style={styles.errorLabel}>Font Error:</Text>
                    <Text style={styles.errorText}>{fontError.message}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    value: {
        fontSize: 16,
        color: '#666',
    },
    errorSection: {
        backgroundColor: '#ffe6e6',
        borderColor: '#ff9999',
        borderWidth: 1,
    },
    errorLabel: {
        color: '#cc0000',
        fontWeight: 'bold',
    },
    errorText: {
        color: '#cc0000',
    },
});