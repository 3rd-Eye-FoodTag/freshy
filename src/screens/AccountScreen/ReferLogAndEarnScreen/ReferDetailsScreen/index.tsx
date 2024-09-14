import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface ReferData {
    id: string;
    name: string;
    bonus1: boolean;
    bonus2: boolean;
}

const DATA: ReferData[] = [
    { id: '1', name: 'Katie', bonus1: true, bonus2: true },
    { id: '2', name: 'JT', bonus1: true, bonus2: false },
];

const ReferDetailsScreen: React.FC = () => {
    const renderItem: ListRenderItem<ReferData> = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.bonusContainer}>
                <View style={[styles.bonus, item.bonus1 && styles.bonusActive]}>
                    <Text>sign up bonus</Text>
                    {item.bonus1 && <Icon as={AntDesign} name={'check'} size="sm" color={'black'} />}
                </View>
                <View style={[styles.bonus, item.bonus2 && styles.bonusActive]}>
                    <Text>log food bonus</Text>
                    {item.bonus2 && <Icon as={AntDesign} name={'check'} size="sm" color={'black'} />}
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Name</Text>
                <Text style={styles.headerText}>Bonus type</Text>
            </View>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 30,
        marginTop: 40,
        paddingLeft: 10
    },
    headerText: {
        fontFamily: 'PingFang SC',
        fontSize: 17,
        fontWeight: '400',
        color: '#6C6C6C',
    },
    list: {
        paddingVertical: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingLeft: -45,
    },
    name: {
        fontFamily: 'PingFang SC',
        width: 70,
        fontSize: 17,
        textAlign: 'center',
    },
    bonusContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bonus: {
        height: 50,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
    },
    bonusActive: {
        backgroundColor: '#FFFCED',
    },
    checkIcon: {
        marginTop: 5,
    },
});

export default ReferDetailsScreen;
