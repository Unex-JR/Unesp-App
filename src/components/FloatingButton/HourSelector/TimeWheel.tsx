import { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet,Pressable} from 'react-native';
import { colors, typography } from '@/theme';
import { ViewHourSelector } from '@/components/FloatingButton/HourSelector/ViewHourSelector'
/*
    Botão informando o horario selecionado
        OnPress -> abre o modal para escolher entre os horarios
*/

type TimeWheelProps = {
    title:string;
};

export function TimeWheel( { title }:TimeWheelProps ) {
    const [selectedHour, setSelectedHour] = useState('08:00')
    const [modalVisible, setModalVisible] = useState(false);
    return(
        <View>
            /* Botão informando o horario selecionado */
            <TouchableOpacity style = { styles.tagBackground } onPress ={ () => setModalVisible(true) }>
                <Text style = { styles.tagSubject }>{title}</Text>
                <Text style = { styles.tagText} >{selectedHour}</Text>
            </TouchableOpacity>

            <Modal
            visible={modalVisible}
            transparent
            statusBarTranslucent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
            >

                <View style={styles.overlay}>
                    <Pressable style={StyleSheet.absoluteFill} onPress={ () => setModalVisible(false)} />

                    <View style={styles.card}>

                        <ViewHourSelector />

                    </View>
                </View>
            </Modal>
        </View>

    )

}

const styles = StyleSheet.create( {
    overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 22, 32, 0.55)',
    },
    card: {
        maxHeight: '88%',
        backgroundColor: colors.surface,
        borderRadius: 24,
        overflow: 'hidden',
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    },
    tagBlank: {
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 12,
    },
    tagBackground: {
        backgroundColor: colors.secondaryBlue,
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 12,
    },
    tagSubject: {
        fontFamily: typography.fontFamily.bold,
        fontSize: typography.fontSize.xs,
        color: colors.text,
    },
    tagText: {
        fontFamily: typography.fontFamily.bold,
        fontSize: typography.fontSize.sm,
        color: colors.white,
    }
});