import {useState} from 'react';
import { View, Text, TextInput, StyleSheet} from 'react-native';
import { colors, typography } from '@/theme';


export function ViewSubjectRegister () {
    const [subjectName, onChangeSubjectName] = useState('');
    const [classNumber, onChangeClassNumber] = useState('');
    const [block, onChangeBlock] = useState('');
    const [professorName, onChangeProfessorName] = useState('');

    return(
        <View>

            <Text style = { styles.title}> Registro de Materia </Text>

            //TextInput dos campos do registro
            <TextInput
                style ={styles.input}
                placeholder='Nome da Materia'
                onChangeText = {onChangeSubjectName}
                value = {subjectName}
                keyboardType = 'default'
                returnKeyType = 'next'
            />
            <View style = { styles.rowContainer }>
                <TextInput
                    style ={styles.input}
                    placeholder='Sala'
                    onChangeText = {onChangeClassNumber}
                    value = {classNumber}
                    keyboardType = 'numeric'
                    returnKeyType = 'next'
                />
                <TextInput
                    style ={styles.input}
                    placeholder='Bloco'
                    onChangeText = {onChangeBlock}
                    value = {block}
                    keyboardType = 'default'
                    returnKeyType = 'next'
                />
            </View>
            <TextInput
                style ={styles.input}
                placeholder='Nome do Professor'
                onChangeText = {onChangeProfessorName}
                value = {professorName}
                keyboardType = 'default'
                returnKeyType = 'next'
            />
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
        minWidth: 100,
        borderRadius: 12,
        marginBottom: 8,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        fontFamily: typography.fontFamily.regular
    },

    rowContainer: {
        flexDirection: 'row',       // alinha os filhos na horizontal
        alignItems: 'center',       // centraliza verticalmente
        justifyContent: 'space-between', // distribui o espaço entre eles
        }
});