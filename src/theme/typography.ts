export const typography = {
  // Inter
  fontFamily: {
    regular: 'Inter_400Regular',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
    monospace: 'Menlo',
  },
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
      lineHeight: {                                                                                                           
        tight: 1.2,                                                                                                           
        normal: 1.5,                                                                                                          
        relaxed: 1.75,                                                                                                        
      },
};

export type Typography = typeof typography;
