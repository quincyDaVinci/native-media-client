export const AppTheme = {
  colors: {
    background: "#0F1115",
    surface: "#181C23",
    surfaceAlt: "#222833",
    border: "#2D3442",
    textPrimary: "#F4F6FA",
    textSecondary: "#C5CCDA",
    textMuted: "#9AA3B2",
    accent: "#2EC4FF",
    onAccent: "#0F1115",
    danger: "#FF5D5D",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 28,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    pill: 999,
  },
  typography: {
    hero: 28,
    title: 22,
    subtitle: 16,
    body: 15,
    caption: 12,
    button: 16,
  },
  borderWidth: {
    thin: 1,
  },
  shadows: {
    card: {
      shadowColor: "#000000",
      shadowOpacity: 0.25,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },
  },
  buttons: {
    primary: {
      backgroundColor: "#2EC4FF",
      textColor: "#0F1115",
      borderColor: "#2EC4FF",
    },
    secondary: {
      backgroundColor: "#222833",
      textColor: "#F4F6FA",
      borderColor: "#2D3442",
    },
    danger: {
      backgroundColor: "#FF5D5D",
      textColor: "#0F1115",
      borderColor: "#FF5D5D",
    },
  },
} as const;
