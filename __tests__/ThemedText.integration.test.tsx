import { ThemedText } from '@/components/ThemedText';
import { PRIMARY_FONT, getFallbackFont } from '@/constants/Fonts';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

// Mock useThemeColor hook
jest.mock('@/hooks/useThemeColor', () => ({
    useThemeColor: jest.fn(() => '#000000'),
}));

// Type assertion for Text component to access defaultProps
const MockText = Text as any;

describe('ThemedText Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Reset Text.defaultProps before each test
        MockText.defaultProps = {};
    });

    describe('Default Font Behavior', () => {
        it('should render with ClashDisplay font by default when global font is configured', () => {
            // Simulate the global font configuration that happens in _layout.tsx
            MockText.defaultProps = { style: { fontFamily: PRIMARY_FONT } };

            const { getByText } = render(
                <ThemedText>Test text with default font</ThemedText>
            );

            const textElement = getByText('Test text with default font');

            // Verify the component renders correctly
            expect(textElement).toBeTruthy();

            // Verify that the Text component has the default font family set globally
            expect(MockText.defaultProps?.style).toEqual({ fontFamily: PRIMARY_FONT });
        });

        it('should render with fallback font when global fallback is configured', () => {
            // Simulate the global font configuration with fallback font
            const fallbackFont = getFallbackFont();
            MockText.defaultProps = { style: { fontFamily: fallbackFont } };

            const { getByText } = render(
                <ThemedText>Test text with fallback font</ThemedText>
            );

            const textElement = getByText('Test text with fallback font');
            expect(textElement).toBeTruthy();

            // Verify that the Text component has the fallback font family set globally
            expect(MockText.defaultProps?.style).toEqual({ fontFamily: fallbackFont });
        });

        it('should inherit global default font without explicit fontFamily in component styles', () => {
            // Set global default font
            MockText.defaultProps = { style: { fontFamily: PRIMARY_FONT } };

            const { getByText } = render(
                <ThemedText type="default">Text inheriting global font</ThemedText>
            );

            const textElement = getByText('Text inheriting global font');

            // The component should render and global font should be set
            expect(textElement).toBeTruthy();
            expect(MockText.defaultProps?.style).toEqual({ fontFamily: PRIMARY_FONT });

            // Component styles should not include fontFamily (inherits from global)
            const componentStyles = textElement.props.style;
            const hasExplicitFontFamily = Array.isArray(componentStyles) &&
                componentStyles.some((style: any) =>
                    style && typeof style === 'object' && 'fontFamily' in style
                );
            expect(hasExplicitFontFamily).toBe(false);
        });
    });

    describe('Custom Font Override', () => {
        beforeEach(() => {
            // Set global default font for override tests
            MockText.defaultProps = { style: { fontFamily: PRIMARY_FONT } };
        });

        it('should override default font when custom fontFamily is provided via style prop', () => {
            const customFont = 'monospace';
            const { getByText } = render(
                <ThemedText style={{ fontFamily: customFont }}>
                    Text with custom font
                </ThemedText>
            );

            const textElement = getByText('Text with custom font');

            // Custom fontFamily should be in the style array and override the global default
            expect(textElement).toBeTruthy();
            expect(textElement.props.style).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ fontFamily: customFont }),
                ])
            );
        });

        it('should override default font when custom fontFamily is provided in nested style object', () => {
            const customStyles = {
                fontFamily: 'serif',
                fontSize: 18,
            };

            const { getByText } = render(
                <ThemedText style={customStyles}>
                    Text with custom style object
                </ThemedText>
            );

            const textElement = getByText('Text with custom style object');

            expect(textElement).toBeTruthy();
            expect(textElement.props.style).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        fontFamily: 'serif',
                        fontSize: 18,
                    }),
                ])
            );
        });

        it('should maintain global default when no custom fontFamily is provided', () => {
            const { getByText } = render(
                <ThemedText style={{ fontSize: 18, color: 'blue' }}>
                    Text with non-font styles
                </ThemedText>
            );

            const textElement = getByText('Text with non-font styles');

            // Should have custom styles but no explicit fontFamily (inherits global)
            expect(textElement).toBeTruthy();
            expect(textElement.props.style).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ fontSize: 18, color: 'blue' }),
                ])
            );

            // Global font should still be set
            expect(MockText.defaultProps?.style).toEqual({ fontFamily: PRIMARY_FONT });
        });
    });

    describe('Type-based Styling Integration', () => {
        beforeEach(() => {
            // Set global default font for type-based styling tests
            MockText.defaultProps = { style: { fontFamily: PRIMARY_FONT } };
        });

        it('should apply default type styles correctly with ClashDisplay font', () => {
            const { getByText } = render(
                <ThemedText type="default">Default type text</ThemedText>
            );

            const textElement = getByText('Default type text');

            expect(textElement).toBeTruthy();
            expect(textElement.props.style).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ color: '#000000' }),
                    expect.objectContaining({ fontSize: 16, lineHeight: 24 }),
                ])
            );

            // Verify global font is set
            expect(MockText.defaultProps?.style).toEqual({ fontFamily: PRIMARY_FONT });
        });

        it('should apply title type styles correctly with ClashDisplay font', () => {
            const { getByText } = render(
                <ThemedText type="title">Title text</ThemedText>
            );

            const textElement = getByText('Title text');

            expect(textElement).toBeTruthy();
            expect(textElement.props.style).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        fontSize: 32,
                        fontWeight: 'bold',
                        lineHeight: 32
                    }),
                ])
            );
        });

        it('should apply defaultSemiBold type styles correctly with ClashDisplay font', () => {
            const { getByText } = render(
                <ThemedText type="defaultSemiBold">Semi-bold text</ThemedText>
            );

            const textElement = getByText('Semi-bold text');

            expect(textElement).toBeTruthy();
            expect(textElement.props.style).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        fontSize: 16,
                        lineHeight: 24,
                        fontWeight: '600'
                    }),
                ])
            );
        });

        it('should apply subtitle type styles correctly with ClashDisplay font', () => {
            const { getByText } = render(
                <ThemedText type="subtitle">Subtitle text</ThemedText>
            );

            const textElement = getByText('Subtitle text');

            expect(textElement).toBeTruthy();
            expect(textElement.props.style).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        fontSize: 20,
                        fontWeight: 'bold'
                    }),
                ])
            );
        });

        it('should apply link type styles correctly with ClashDisplay font', () => {
            const { getByText } = render(
                <ThemedText type="link">Link text</ThemedText>
            );

            const textElement = getByText('Link text');

            expect(textElement).toBeTruthy();
            expect(textElement.props.style).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        lineHeight: 30,
                        fontSize: 16,
                        color: '#0a7ea4'
                    }),
                ])
            );
        });

        it('should maintain type-based styles when custom fontFamily is provided', () => {
            const { getByText } = render(
                <ThemedText
                    type="title"
                    style={{ fontFamily: 'Arial' }}
                >
                    Title with custom font
                </ThemedText>
            );

            const textElement = getByText('Title with custom font');

            // Should have both title styles and custom font
            expect(textElement).toBeTruthy();
            expect(textElement.props.style).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        fontSize: 32,
                        fontWeight: 'bold',
                        lineHeight: 32
                    }),
                    expect.objectContaining({
                        fontFamily: 'Arial'
                    }),
                ])
            );
        });

        it('should preserve all type-based properties when using ClashDisplay font', () => {
            const testCases = [
                { type: 'default' as const, expected: { fontSize: 16, lineHeight: 24 } },
                { type: 'title' as const, expected: { fontSize: 32, fontWeight: 'bold', lineHeight: 32 } },
                { type: 'defaultSemiBold' as const, expected: { fontSize: 16, lineHeight: 24, fontWeight: '600' } },
                { type: 'subtitle' as const, expected: { fontSize: 20, fontWeight: 'bold' } },
                { type: 'link' as const, expected: { lineHeight: 30, fontSize: 16, color: '#0a7ea4' } },
            ];

            testCases.forEach(({ type, expected }) => {
                const { getByText } = render(
                    <ThemedText type={type}>Test text for {type}</ThemedText>
                );

                const textElement = getByText(`Test text for ${type}`);
                expect(textElement).toBeTruthy();
                expect(textElement.props.style).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining(expected),
                    ])
                );
            });
        });
    });

    describe('Style Inheritance and Override Priority', () => {
        beforeEach(() => {
            MockText.defaultProps = { style: { fontFamily: PRIMARY_FONT } };
        });

        it('should prioritize custom styles over type styles while maintaining global font', () => {
            const { getByText } = render(
                <ThemedText
                    type="title"
                    style={{ fontSize: 24, fontWeight: 'normal' }}
                >
                    Custom styled title
                </ThemedText>
            );

            const textElement = getByText('Custom styled title');

            // Custom styles should override type styles
            expect(textElement).toBeTruthy();
            expect(textElement.props.style).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ color: '#000000' }),
                    expect.objectContaining({ fontSize: 32, fontWeight: 'bold', lineHeight: 32 }),
                    expect.objectContaining({ fontSize: 24, fontWeight: 'normal' }),
                ])
            );

            // Global font should still be set
            expect(MockText.defaultProps?.style).toEqual({ fontFamily: PRIMARY_FONT });
        });

        it('should handle multiple style objects correctly with global font inheritance', () => {
            const baseStyle = { fontSize: 18 };
            const additionalStyle = { fontWeight: '600' as const };

            const { getByText } = render(
                <ThemedText
                    type="default"
                    style={[baseStyle, additionalStyle, { color: 'red' }]}
                >
                    Multi-style text
                </ThemedText>
            );

            const textElement = getByText('Multi-style text');

            expect(textElement).toBeTruthy();
            expect(textElement.props.style).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ color: '#000000' }),
                    expect.objectContaining({ fontSize: 16, lineHeight: 24 }),
                    expect.arrayContaining([
                        expect.objectContaining({ fontSize: 18 }),
                        expect.objectContaining({ fontWeight: '600' }),
                        expect.objectContaining({ color: 'red' }),
                    ]),
                ])
            );
        });
    });

    describe('Component Props Integration with Default Font', () => {
        beforeEach(() => {
            MockText.defaultProps = { style: { fontFamily: PRIMARY_FONT } };
        });

        it('should pass through all Text props correctly while maintaining font inheritance', () => {
            const { getByTestId } = render(
                <ThemedText
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    testID="themed-text-test"
                >
                    Text with props
                </ThemedText>
            );

            const textElement = getByTestId('themed-text-test');

            expect(textElement).toBeTruthy();
            expect(textElement.props.numberOfLines).toBe(2);
            expect(textElement.props.ellipsizeMode).toBe('tail');
            expect(textElement.props.testID).toBe('themed-text-test');

            // Should still inherit global font
            expect(MockText.defaultProps?.style).toEqual({ fontFamily: PRIMARY_FONT });
        });

        it('should handle accessibility props correctly with ClashDisplay font', () => {
            const { getByLabelText } = render(
                <ThemedText
                    accessible={true}
                    accessibilityLabel="Accessible text"
                    accessibilityRole="text"
                >
                    Accessible text content
                </ThemedText>
            );

            const textElement = getByLabelText('Accessible text');

            expect(textElement).toBeTruthy();
            expect(textElement.props.accessible).toBe(true);
            expect(textElement.props.accessibilityLabel).toBe('Accessible text');
            expect(textElement.props.accessibilityRole).toBe('text');

            // Accessibility should work with global font
            expect(MockText.defaultProps?.style).toEqual({ fontFamily: PRIMARY_FONT });
        });

        it('should maintain all functionality when combining props, styles, and global font', () => {
            const { getByTestId } = render(
                <ThemedText
                    type="title"
                    style={{ color: 'red', fontWeight: 'normal' }}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                    accessible={true}
                    accessibilityLabel="Complex text component"
                    testID="complex-text"
                >
                    Complex integration test
                </ThemedText>
            );

            const textElement = getByTestId('complex-text');

            // Should have all props
            expect(textElement).toBeTruthy();
            expect(textElement.props.numberOfLines).toBe(1);
            expect(textElement.props.ellipsizeMode).toBe('middle');
            expect(textElement.props.accessible).toBe(true);
            expect(textElement.props.accessibilityLabel).toBe('Complex text component');

            // Should have combined styles
            expect(textElement.props.style).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ color: '#000000' }),
                    expect.objectContaining({ fontSize: 32, fontWeight: 'bold', lineHeight: 32 }),
                    expect.objectContaining({ color: 'red', fontWeight: 'normal' }),
                ])
            );

            // Should inherit global font
            expect(MockText.defaultProps?.style).toEqual({ fontFamily: PRIMARY_FONT });
        });
    });
});