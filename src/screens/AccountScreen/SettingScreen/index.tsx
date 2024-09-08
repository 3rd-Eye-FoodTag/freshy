import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import AccountFlatList from '../../../component/AccountFlatList';

const data = [
    { key: 'Display Preferences' },
    { key: 'Food Profile' },
    { key: 'Language' },
    { key: 'Weekly Wrap Up Time' },
    { key: 'Push Notifications' },
];

const SettingScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <AccountFlatList
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.listItem}>
                            <Text style={styles.listItemText}>
                                {item.key}
                            </Text>
                            <Text style={styles.arrow}>{'>'}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.key}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        paddingTop: 30,
    },
    listItem: {
        padding: 15,
        paddingLeft: 25,
        paddingRight: 35,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(211, 211, 211, 0.5)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemText: {
        fontSize: 18,
    },
    arrow: {
        fontSize: 25,
        color: 'grey',
        opacity: 0.5,
    },
});

export default SettingScreen;
