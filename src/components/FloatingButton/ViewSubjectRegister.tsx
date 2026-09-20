import {useState} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import { colors, typography } from '@/theme';

import { SelectableButton } from '@/components/FloatingButton/SelectableButton';
import { CardScheduleRegister } from '@/components/FloatingButton/CardScheduleRegister'

export function ViewSubjectRegister () {
    const [subjectName, onChangeSubjectName] = useState('');
    const [classNumber, onChangeClassNumber] = useState('');
    const [block, onChangeBlock] = useState('');
    const [professorName, onChangeProfessorName] = useState('');

    {/* Variaveis para controle dos cards de horarios */}
    const [visibleSeg, setVisibleSeg] = useState(false);
    const [visibleTer, setVisibleTer] = useState(false);
    const [visibleQua, setVisibleQua] = useState(false);
    const [visibleQui, setVisibleQui] = useState(false);
    const [visibleSex, setVisibleSex] = useState(false);
    const [visibleSab, setVisibleSab] = useState(false);

    return(
        <View>
            <View>
                <Text style = { styles.title}> Registro de Materia </Text>

                {/* Seção dos campos do registro */}
                <TextInput
                    style ={styles.input}
                    placeholder='Nome da Materia'
                    onChangeText = {onChangeSubjectName}
                    value = {subjectName}
                    maxLength = {50}
                    keyboardType = 'default'
                    returnKeyType = 'next'
                />
                <View style = { styles.rowContainer }>
                    <TextInput
                        style ={styles.input}
                        placeholder='Sala'
                        onChangeText = {onChangeClassNumber}
                        value = {classNumber}
                        maxLength = {2}
                        keyboardType = 'numeric'
                        returnKeyType = 'next'
                    />
                    <TextInput
                        style ={styles.input}
                        placeholder='Bloco'
                        onChangeText = {onChangeBlock}
                        value = {block}
                        maxLength = {1}
                        keyboardType = 'default'
                        returnKeyType = 'next'
                    />
                </View>
                <TextInput
                    style ={styles.input}
                    placeholder='Nome do Professor'
                    onChangeText = {onChangeProfessorName}
                    value = {professorName}
                    maxLength = {50}
                    keyboardType = 'default'
                    returnKeyType = 'next'
                />
            </View>
            {/* Seção dos Horarios */}
            <Text style = { styles.title}> Horários </Text>

            <View style = {styles.rowContainer}>
                <SelectableButton text = 'Seg' onPress = { () => { setVisibleSeg(!visibleSeg) } }/>
                <SelectableButton text = 'Ter' onPress = { () => { setVisibleTer(!visibleTer) } }/>
                <SelectableButton text = 'Qua' onPress = { () => { setVisibleQua(!visibleQua) } }/>
                <SelectableButton text = 'Qui' onPress = { () => { setVisibleQui(!visibleQui) } }/>
                <SelectableButton text = 'Sex' onPress = { () => { setVisibleSex(!visibleSex) } }/>
                <SelectableButton text = 'Sab' onPress = { () => { setVisibleSab(!visibleSab) } }/>
            </View>

            {/* Container dos Cards de escolha dos horarios */}
            <ScrollView style = {{ padding: 12 }}>
                <CardScheduleRegister visible = {visibleSeg} day = 'Seg' />
                <CardScheduleRegister visible = {visibleTer} day = 'Ter' />
                <CardScheduleRegister visible = {visibleQua} day = 'Qua' />
                <CardScheduleRegister visible = {visibleQui} day = 'Qui' />
                <CardScheduleRegister visible = {visibleSex} day = 'Sex' />
                <CardScheduleRegister visible = {visibleSab} day = 'Sab' />

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: typography.fontFamily.extrabold,
        fontSize: typography.fontSize['2xl'],
        color: colors.text,
    },
    subtitle: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.fontSize.base,
        color: colors.textSecondary,
    },
    sectionTitle: {
        fontFamily: typography.fontFamily.bold,
        fontSize: typography.fontSize.sm,
        color: colors.text,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        fontFamily: typography.fontFamily.regular
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5
    }
});