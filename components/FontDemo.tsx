import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

export function FontDemo() {
    return (
        <View style={styles.container}>
            <ThemedText type="subtitle" style={styles.header}>
                Font Comparison Demo
            </ThemedText>

            <View style={styles.section}>
                <ThemedText type="defaultSemiBold" style={styles.label}>
                    ClashDisplay (Default):
                </ThemedText>
                <ThemedText style={styles.sampleText}>
                    The quick brown fox jumps over the lazy dog. 1234567890
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="defaultSemiBold" style={styles.label}>
                    System Font (Override):
                </ThemedText>
                <ThemedText style={[styles.sampleText, { fontFamily: 'System' }]}>
                    The quick brown fox jumps over the lazy dog. 1234567890
                </ThemedText>
            </View>

            <View style={styles.section}>
                <ThemedText type="defaultSemiBold" style={styles.label}>
                    ClashDisplay Title:
                </ThemedText>
                <ThemedText type="title" style={styles.titleText}>
                    Beautiful Typography
                </ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
    },
    header: {
        textAlign: 'center',
        marginBottom: 8,
    },
    section: {
        gap: 4,
    },
    label: {
        fontSize: 14,
        opacity: 0.7,
    },
    sampleText: {
        fontSize: 16,
        lineHeight: 24,
    },
    titleText: {
        textAlign: 'center',
    },
});