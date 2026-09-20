import {useState} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import { colors, typography } from '@/theme';

/**
 * ScheduleRegisterView - Card para escolha dos horarios das aulas.
 * @param visible - Variavel para controle do aparecimento do card;
 * @param day - Dia da semana que deve ser associado os horarios.
 */

type ScheduleRegisterProps = {
    visible: bool;
    day: string;
};

export function CardScheduleRegister ( {visible, day}:ScheduleRegisterProps ) {

    return(
        <View>
            {visible &&
                <View style = { styles.containerRow } >

                    <View style = { styles.tagBlank } >
                        <Text style = { styles.tagSubject } >{day}</Text>
                    </View>

                    <View style = { styles.tagBackground } >
                        <Text style = { styles.tagSubject } >Início</Text>
                        <Text style = { styles.tagText} >16:00</Text>
                    </View>

                    <View style = { styles.tagBackground } >
                        <Text style = { styles.tagSubject } >Fim</Text>
                        <Text style = { styles.tagText } >18:00</Text>
                    </View>
                </View>
            }
        </View>
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