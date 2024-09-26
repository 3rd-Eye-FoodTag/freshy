import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';

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

                {/* Card View Images with Spacing */}
                <TouchableOpacity
                    style={styles.cardView}
                    onPress={() => setSelectedView('Card View')}
                >
                    <Image
                        style={styles.cardImage}
                        source={require('../../../../assets/cardView1.jpg')}
                    />
                    <View style={styles.imageSpacer} />

                    <Image
                        style={styles.cardImage}
                        source={require('../../../../assets/cardView2.jpg')}
                    />
                    <View style={styles.imageSpacer} />

                    <Image
                        style={styles.cardImage}
                        source={require('../../../../assets/cardView3.jpg')}
                    />
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
                    <View style={styles.listView}>
                        <View style={styles.listRow}>
                            <Text style={styles.listItemText}>照片</Text>
                        </View>
                        <View style={styles.listRow}>
                            <Text style={styles.listItemText}>数量</Text>
                        </View>
                        <View style={styles.listRow}>
                            <Text style={styles.listItemText}>哪天添加的</Text>
                        </View>
                        <View style={styles.listRow}>
                            <Text style={styles.listItemText}>几天后过期</Text>
                        </View>
                    </View>
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
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    cardImage: {
        width: 120,
        height: 100,
        resizeMode: 'cover',
    },
    imageSpacer: {
        width: 2,
        backgroundColor: 'lightgray',
    },
    listView: {
        marginVertical: 10,
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
    listRow: {
        marginBottom: 15,
    },
    listItemText: {
        fontSize: 16,
        textAlign: 'left',
    },
});

export default DisplayPreferencesScreen;
