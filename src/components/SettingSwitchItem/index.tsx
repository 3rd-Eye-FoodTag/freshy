import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

interface SettingSwitchItemProps {
    label: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
}

const SettingSwitchItem: React.FC<SettingSwitchItemProps> = ({ label, value, onValueChange }) => {
    return (
        <View style={styles.item}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.switchContainer}>
                <Switch value={value} onValueChange={onValueChange} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    label: {
        fontSize: 18,
        fontFamily: 'PingFang SC',
        paddingLeft: 15,
    },
    switchContainer: {
        paddingRight: 15,
    },
});

export default SettingSwitchItem;
