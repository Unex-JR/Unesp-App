import { useState } from 'react';
import { View, TouchableOpacity, Text,StyleSheet, PressableProps} from 'react-native';
import { colors, typography } from '@/theme';

/**
 * PressableButton é um botão que alterna sua aparencia quando pressionado.
 * @param text - O texto do botão
 */

type SelectableButtonProps = PressableProps & {
    text: string;
};

export function SelectableButton({text, onPress}: SelectableButtonProps){

  const [select, setSelect] = useState(false);

  const handlePress = () => {
    setSelect(!select); {/* Altera entre selecionado/não selecionado */}

    if(onPress)
      onPress?.();  {/* chama a função vinda do pai (com segurança, caso não exista) */}
  };

  return(
    <View>
      {select ? {/* Baseado na select altena a aparencia do botão entre os dois modelos */}
        {/* Versão Não Selecionado */}
        <TouchableOpacity style={styles.buttonSelect} onPress={handlePress}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
        :
        {/* Versão Selecionado */}
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      }
    </View>
  )
}
const styles = StyleSheet.create({
    buttonText: {
        fontFamily: typography.fontFamily.extrabold,
        fontSize: typography.fontSize['sm'],
        color: colors.text,
    },
    button: {
    backgroundColor: colors.primaryBlue,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    },
    buttonSelect: {
    backgroundColor: colors.attention,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    }
});