import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@/theme";

import { ViewSubjectRegister } from "@/components/FloatingButton/ViewSubjectRegister";

/**
 * ModalFloatingButton — Componente Modal que adicionado por um botão flutuante no canto inferior direito.
 *
 */
export function FloatingButtonWithModal() {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.container}>
          <ViewSubjectRegister />

          <Pressable onPress={() => setModalVisible(false)}>
            <Text>Sair</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPage,
    padding: 16,
    borderRadius: 8,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 46,
    height: 46,
    borderRadius: 28,
    backgroundColor: colors.primaryBlue,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabIcon: { fontSize: 28, color: "#fff", lineHeight: 30 },
});
