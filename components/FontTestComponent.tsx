import { PRIMARY_FONT, getFallbackFont } from '@/constants/Fonts';
import { useFonts } from '@/hooks/useFonts';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedText } from './ThemedText';

/**
 * Simple component to test font fallback behavior
 * Add this to any screen to verify font loading works correctly
 */
export function FontTestComponent() {
    const { fontsLoaded, fontError, fontFamily } = useFonts();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Font Test</Text>

            <View style={styles.row}>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>
                    {fontsLoaded ? '✅ Loaded' : '⏳ Loading...'}
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Font:</Text>
                <Text style={styles.value}>{fontFamily}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Fallback:</Text>
                <Text style={styles.value}>{getFallbackFont()}</Text>
            </View>

            {fontError && (
                <View style={styles.row}>
                    <Text style={styles.errorLabel}>Error:</Text>
                    <Text style={styles.errorValue}>{fontError.message}</Text>
                </View>
            )}

            <View style={styles.samples}>
                <Text style={styles.sampleTitle}>Font Samples:</Text>

                <ThemedText style={styles.sample}>
                    ThemedText (inherits global font)
                </ThemedText>

                <Text style={[styles.sample, { fontFamily: PRIMARY_FONT }]}>
                    Direct ClashDisplay font
                </Text>

                <Text style={[styles.sample, { fontFamily: getFallbackFont() }]}>
                    Platform fallback font
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        margin: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        fontWeight: '600',
        width: 80,
    },
    value: {
        flex: 1,
    },
    errorLabel: {
        fontWeight: '600',
        width: 80,
        color: '#cc0000',
    },
    errorValue: {
        flex: 1,
        color: '#cc0000',
    },
    samples: {
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    sampleTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    sample: {
        fontSize: 16,
        marginBottom: 8,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
});