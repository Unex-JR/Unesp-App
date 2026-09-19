import { colors, typography } from "@/theme";
import { useState } from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

/**
 * PressableButton é um botão que alterna sua aparencia quando pressionado.
 * @param text - O texto do botão
 */

type SelectableButtonProps = PressableProps & {
  text: string;
};

export function SelectableButton({ text, onPress }: SelectableButtonProps) {
  const [select, setSelect] = useState(false);

  const handlePress = () => {
    setSelect(!select); //Altera entre selecionado/não selecionado
  };

  return (
    <View>
      {select ? ( //Baseado na select altena a aparencia do botão entre os dois modelos
        //Versão Não Selecionado
        <Pressable style={styles.buttonSelect} onPress={handlePress}>
          <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
      ) : (
        //Versão Selecionado
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  buttonText: {
    fontFamily: typography.fontFamily.extrabold,
    fontSize: typography.fontSize["sm"],
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primaryBlue,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonSelect: {
    backgroundColor: colors.attention,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
});
