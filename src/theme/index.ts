export { colors, type Colors } from './colors';
export { typography, type Typography } from './typography';

// Re-exportar tudo como um objeto theme completo
export const theme = {
  colors: require('./colors').colors,
  typography: require('./typography').typography,
};
