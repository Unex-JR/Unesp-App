export const typography = {
  // Tamanhos de fonte
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  // Pesos de fonte
  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  // Alturas de linha
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Estilos de texto pré-definidos
  heading: {
    h1: {
      fontSize: 36,
      fontWeight: '700' as const,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 30,
      fontWeight: '700' as const,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 1.4,
    },
  },

  body: {
    large: {
      fontSize: 18,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    base: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    small: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    xsmall: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
  },

  // Famílias de fonte
  fontFamily: {
    primary: 'System',
    monospace: 'Menlo',
  },
};

export type Typography = typeof typography;
