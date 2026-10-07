import { colors, typography } from "@/theme";
import { useState } from "react";
import {
  PressableProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * PressableButton é um botão que alterna sua aparencia quando pressionado.
 * @param text
 */

type SelectableButtonProps = PressableProps & {
  text: string;
};

export function SelectableButton({ text, onPress }: SelectableButtonProps) {
  const [select, setSelect] = useState(false);

  const handlePress = () => {
    setSelect(true);
    // Chamada de função
  };

  return (
    <View>
      <TouchableOpacity
        style={select ? styles.buttonSelect : styles.button}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
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
