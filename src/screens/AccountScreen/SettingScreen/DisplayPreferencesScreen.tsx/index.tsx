import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';

const DisplayPreferencesScreen: React.FC = () => {
    const [selectedView, setSelectedView] = useState('Card View');

    const cardImages = [
        require('../../../../assets/cardView1.jpg'),
        require('../../../../assets/cardView2.jpg'),
        require('../../../../assets/cardView3.jpg'),
    ];

    const listData = [
        { quantity: '5x', name: 'Potato', addedDate: '09/20', expiry: '7 days', image: require('../../../../assets/cardView1.jpg') },
        { quantity: '1x', name: 'Potato', addedDate: '10/20', expiry: '20 days', image: require('../../../../assets/cardView1.jpg') },
        { quantity: '1x', name: 'Cucumber', addedDate: '10/20', expiry: '5 days', image: require('../../../../assets/cardView2.jpg') },
        { quantity: '1x', name: 'Chili', addedDate: '10/20', expiry: '3 days', image: require('../../../../assets/cardView3.jpg') },
    ];

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
                    {cardImages.map((imageSrc, index) => (
                        <React.Fragment key={index}>
                            <Image
                                style={styles.cardImage}
                                source={imageSrc}
                            />
                            {index < cardImages.length - 1 && (
                                <View style={styles.imageSpacer} />
                            )}
                        </React.Fragment>
                    ))}
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
                        {listData.map((item, index) => (
                            <View key={index} style={styles.listRow}>
                                <Image source={item.image} style={styles.listImage} />
                                <Text style={styles.listItemText}>
                                    {item.quantity} {item.name} from {item.addedDate}, best in {item.expiry}
                                </Text>
                            </View>
                        ))}
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'rgba(211, 211, 211, 0.5)',
        marginBottom: 5,

    },
    listItemText: {
        fontSize: 16,
        flexShrink: 1,
    },
    listImage: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
});

export default DisplayPreferencesScreen;
