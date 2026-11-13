export const colors = {
  background: "#121212",
  surface: "#1A1A1A",
  border: "#2B2B2B",
  peachSoft: "#170D06",
  muted: "#120C07",
  sand: "#0C0603",
  cacao: "#3E2015",
  terracotta: "#F67D51",
  terracottaLight: "#FFAA66",
  congressOrange: "#E8704E",
  gold: "#E8C163",
  goldDeep: "#D4A236",
  red: "#E62C2C",
  text: "#F5EDE4",
  textSecondary: "#B7A89B",
  textOnButton: "#030101",
  cream: "#FAF0E5",
  sponsorBackground: "#F7F5F1",
  sponsorText: "#1A1A1A",
  sponsorSecondary: "#5A5550",
  sponsorTertiary: "#A49C92",
  sponsorBorder: "#D8D2C9",
  success: "#9BCB8F",
} as const;

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const typography = {
  display: 34,
  title: 26,
  section: 19,
  body: 15,
  caption: 12,
  label: 11,
} as const;

export const shadows = {
  card: {
    shadowColor: "#000000",
    shadowOpacity: 0.24,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
} as const;

export const Colors = {
  light: {
    text: colors.text,
    textSecondary: colors.textSecondary,
    background: colors.background,
    backgroundElement: colors.surface,
    backgroundSelected: colors.cacao,
  },
  dark: {
    text: colors.text,
    textSecondary: colors.textSecondary,
    background: colors.background,
    backgroundElement: colors.surface,
    backgroundSelected: colors.cacao,
  },
} as const;

export const Spacing = {
  half: spacing.xs / 2,
  one: spacing.xs,
  two: spacing.sm,
  three: spacing.md,
  four: spacing.lg,
  five: spacing.xl,
} as const;

export const MaxContentWidth = 680;

export const Fonts = {
  mono: "monospace",
} as const;

export type ThemeColor = keyof typeof Colors.light;
