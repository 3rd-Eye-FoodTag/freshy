import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';

const DisplayPreferencesScreen: React.FC = () => {
    const [selectedView, setSelectedView] = useState('Card View');

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>

                {/* Card View */}
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => setSelectedView('Card View')}
                >
                    <Text style={styles.optionText}>Card View</Text>
                    {selectedView === 'Card View' && <Text style={styles.checkMark}>✔️</Text>}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cardView}
                    onPress={() => setSelectedView('Card View')}
                >
                    <View style={styles.card}></View>
                    <View style={styles.card}></View>
                    <View style={styles.card}></View>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.separator}></View>

                {/* List View */}
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => setSelectedView('List View')}
                >
                    <Text style={styles.optionText}>List View</Text>
                    {selectedView === 'List View' && <Text style={styles.checkMark}>✔️</Text>}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.listView}
                    onPress={() => setSelectedView('List View')}
                >
                    <View style={styles.listItem}></View>
                    <View style={styles.listItem}></View>
                    <View style={styles.listItem}></View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 20,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(211, 211, 211, 0.5)',
    },
    optionText: {
        fontSize: 18,
    },
    checkMark: {
        fontSize: 18,
        color: 'blue',
    },
    cardView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    card: {
        width: 120,
        height: 100,
        backgroundColor: 'lightgray',
    },
    listView: {
        marginVertical: 20,
    },
    listItem: {
        height: 35,
        backgroundColor: 'lightgray',
        marginBottom: 10,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(211, 211, 211, 0.5)',
    },
});

export default DisplayPreferencesScreen;
