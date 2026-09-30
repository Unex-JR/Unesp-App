import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { colors, typography } from '@/theme';

const DATA: ItemData[] = [
  {title: '8:00'},{title: '10:00'},{title: '12:00'},{title: '14:00'},{title: '19:00'},{title: '20:00'},{title: '22:00'}
]
type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
};

const Item = ({item, onPress, backgroundColor}: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
        <Text style={styles.item}>{item.title}</Text>
    </TouchableOpacity>
);

/*
    ViewHourSelector - View do modal para seleção dos horarios
*/
export function ViewHourSelector( ){

        const [selectedId, setSelectedId] = useState();

        const renderItem = ({item}: {item: ItemData}) => {
        const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
        const color = item.id === selectedId ? 'white' : 'black';


            return (
              <Item
                item={item}
                onPress={() => setSelectedId(item.id) }
                backgroundColor={backgroundColor}
                textColor={color}
              />
            );
        };

        return (
            <View style= { styles.container}>
                <FlatList

                  data={DATA}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  extraData={selectedId}
                />
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 8,
        width: 150,
        height: 150
    },
    item: {
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        fontSize: 24,
        marginVertical: 8,
        marginHorizontal: 16,
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