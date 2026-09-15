import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';

import { colors, typography } from '@/theme';

import { ViewSubjectRegister } from '@/components/ViewSubjectRegister'

/**
 * ModalFloatingButton — Componente Modal que adicionado por um botão flutuante no canto inferior direito.
 *
 */
export function ModalFloatingButton() {

    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View >
            <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
            <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>

            <Modal
              visible={modalVisible}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
                <View style = {styles.container}>
                    <ViewSubjectRegister> </ViewSubjectRegister>

                    <TouchableOpacity onPress ={ () => setModalVisible(false) }>
                        <Text>Sair</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 4,
        paddingTop: 4,
        borderRadius: 12,
    },
    fab: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 46,
        height: 46,
        borderRadius: 28,
        backgroundColor: '#6200ee',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabIcon: { fontSize: 28, color: '#fff', lineHeight: 30 }
})