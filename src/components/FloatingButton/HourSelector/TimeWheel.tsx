import {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import { colors, typography } from '@/theme';

/*
    Botão informando o horario selecionado
        OnPress -> abre o modal para escolher entre os horarios
*/

type TimeWheelProps = {
    title:string;
};

export function TimeWheel( { title }:TimeWheelProps ) {
    const [selectedHour, setSelectedHour] = useState('08:00')

    return(
        /* Botão informando o horario selecionado */
        <TouchableOpacity style = { styles.tagBackground  }>
            <Text style = { styles.tagSubject }>{title}</Text>
            <Text style = { styles.tagText} >{selectedHour}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create( {

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