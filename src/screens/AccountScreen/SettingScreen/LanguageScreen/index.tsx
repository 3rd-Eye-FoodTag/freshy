import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';

const LANGUAGES = [
    { key: '简体中文' },
    { key: '繁体中文' },
    { key: 'English' },
];

const LanguageScreen: React.FC = () => {
    // 设置初始值
    const [selectedLanguage, setSelectedLanguage] = useState('简体中文');

    const renderItem = ({ item }: { item: { key: string } }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => setSelectedLanguage(item.key)}
        >
            <Text style={styles.listItemText}>{item.key}</Text>
            {selectedLanguage === item.key && <Text style={styles.checkMark}>✔️</Text>}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.screen}>
            <FlatList
                data={LANGUAGES}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listItem: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(211, 211, 211, 0.7)',
    },
    listItemText: {
        fontSize: 20,
        fontFamily: 'PingFang SC',
    },
    checkMark: {
        fontSize: 10,
    },
});

export default LanguageScreen;
