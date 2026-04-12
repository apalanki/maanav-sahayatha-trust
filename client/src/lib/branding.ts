/**
 * MST Branding System
 * Centralized color and styling constants for easy updates across the entire website
 * Update these values to instantly reflect changes throughout the site
 */

export const MST_COLORS = {
  // Primary Brand Colors
  primary: '#003D7A',      // Navy Blue
  primaryLight: '#E6F0FF', // Light Navy (10% opacity)
  primaryDark: '#002856',  // Dark Navy
  
  // Secondary Brand Colors
  secondary: '#FF9900',    // Saffron Orange
  secondaryLight: '#FFF4E6', // Light Saffron (10% opacity)
  secondaryDark: '#CC7A00', // Dark Saffron
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  foreground: '#1F2937',   // Dark gray for text
  background: '#F9FAFB',   // Light gray for backgrounds
  border: '#E5E7EB',       // Light border color
  
  // Semantic Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

export const MST_CARD_STYLES = {
  primary: {
    border: `2px solid ${MST_COLORS.primary}`,
    background: MST_COLORS.primaryLight,
    icon: MST_COLORS.primary,
    iconBackground: MST_COLORS.primary,
    text: MST_COLORS.primary,
  },
  secondary: {
    border: `2px solid ${MST_COLORS.secondary}`,
    background: MST_COLORS.secondaryLight,
    icon: MST_COLORS.secondary,
    iconBackground: MST_COLORS.secondary,
    text: MST_COLORS.secondary,
  },
} as const;

export const MST_CARD_COLORS = [
  MST_CARD_STYLES.primary,
  MST_CARD_STYLES.secondary,
  MST_CARD_STYLES.primary,
  MST_CARD_STYLES.secondary,
  MST_CARD_STYLES.primary,
  MST_CARD_STYLES.secondary,
] as const;

/**
 * Get card styling for a specific index
 * Alternates between primary and secondary colors
 */
export function getCardStyle(index: number) {
  return MST_CARD_COLORS[index % MST_CARD_COLORS.length];
}
