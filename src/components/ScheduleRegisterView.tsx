import {useState} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import { colors, typography } from '@/theme';

export function ScheduleRegisterView ( {visible} ) {

    return(
        <View>
        {visible ?
            <Text> Visible </Text>
            :
            <Text> Not Visible</Text>
        }
        </View>
    )
}