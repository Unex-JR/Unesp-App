/*
Basicamente separei o objeto para modo claro e outro para modo escuro

Pensei em seguir a seguinte lógica: 

 - Ao usar o useTheme, definimos se o ColorScheme é dark ou light, e então o colors será definido de acordo com isso

 - O colors será um objeto que terá as cores do tema atual, e o lightColors e darkColors serão objetos que terão as cores do tema claro e escuro

 - Um único objeto colors será usado em toda a aplicação, e ele será atualizado de acordo com o tema atual
*/

const lightColors = {
    primaryBlue: '#3E82E8', // Botões principais, cards de destaque
    secondaryBlue: '#2F6FCB',// Ícones ativos, texto de ênfase, links
    tertiaryBlue: '#E7F1FD', // Fundos de destaque, pílulas ativas

    white: '#FFFFFF', // Cards, barra de abas
    whiteSecondary: '#F7FAFD', // Fundo padrão das telas
    backgroundPage: '#EEF3FA', // Fundo geral do documento
    surface: '#FFFFFF', // Superfície de cards e componentes

    text: '#1B2430', // Títulos e texto de maior peso
    textSecondary: '#6B7686', // Legendas, metadados
    textTertiary: '#9AA3B2', // Ícones inativos, placeholders

    border: '#E7ECF3', // Linhas, trilhos de progresso

    alert: '#D9573F', // para prazos críticos, apenas em usos pontuais
    attention: '#C97F1E', // prazo proximo, faltas em risco
}

const darkColors = {
    primaryBlue: '#5B9CF2', // Botões principais, cards de destaque
    secondaryBlue: '#8FBBF7',// Ícones ativos, texto de ênfase, links
    tertiaryBlue: '#223142', // Fundos de destaque, pílulas ativas

    white: '#FFFFFF', // Cards, barra de abas
    whiteSecondary: '#F7FAFD', // Fundo padrão das telas
    surface: '#1A2430', // Superfície de cards e componentes

    backgroundPage: '#0F1620', // Fundo geral das telas

    text: '#F2F5F9', // Títulos e texto de maior peso
    textSecondary: '#9AA7B8', // Legendas, metadados
    textTertiary: '#64707F', // Ícones inativos, placeholders

    border: '#2A3644', // Linhas, trilhos de progresso

    alert: '#FF7A63', // para prazos críticos, apenas em usos pontuais
    attention: '#E8A855', // prazo proximo, faltas em risco
}

export const colorsTheme = {
  light: lightColors,
  dark: darkColors,
};

export const colors = lightColors; // padrão


export type Colors = typeof lightColors;
