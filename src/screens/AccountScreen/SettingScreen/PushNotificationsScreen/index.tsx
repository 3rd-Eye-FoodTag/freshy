import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import SettingSwitchItem from '../../../../components/SettingSwitchItem';
import ReminderTimeDropDown from '../../../../components/ReminderTimeDropDown';

const PushNotificationsScreen: React.FC = () => {
    const [isPushNotificationEnabled, setIsPushNotificationEnabled] = useState(true);
    const [isWeeklyWrapUpEnabled, setIsWeeklyWrapUpEnabled] = useState(true);
    const [isExpiryAlarmEnabled, setIsExpiryAlarmEnabled] = useState(true);
    const [isExpiringReminderEnabled, setIsExpiringReminderEnabled] = useState(true);
    const [isAddRemovalReminderEnabled, setIsAddRemovalReminderEnabled] = useState(true);


    return (
        <SafeAreaView style={styles.screen}>

            <SettingSwitchItem
                label="Push Notification"
                value={isPushNotificationEnabled}
                onValueChange={() => setIsPushNotificationEnabled(!isPushNotificationEnabled)}
            />

            <Text style={styles.sectionHeader}>Notification Type</Text>
            {/* Divider */}
            <View style={styles.separator}></View>
            <SettingSwitchItem
                label="Weekly Wrap Up"
                value={isWeeklyWrapUpEnabled}
                onValueChange={() => setIsWeeklyWrapUpEnabled(!isWeeklyWrapUpEnabled)}
            />
            <SettingSwitchItem
                label="Expiry Alarm"
                value={isExpiryAlarmEnabled}
                onValueChange={() => setIsExpiryAlarmEnabled(!isExpiryAlarmEnabled)}
            />
            <SettingSwitchItem
                label="Expiring Reminder"
                value={isExpiringReminderEnabled}
                onValueChange={() => setIsExpiringReminderEnabled(!isExpiringReminderEnabled)}
            />
            {/* 当Exipring Reminder为true后再展示 */}
            {isExpiringReminderEnabled && (
                <View style={styles.item}>
                    <Text style={styles.itemText}>Default Reminder Time</Text>
                    <ReminderTimeDropDown
                        options={['1 day', '2 days', '3 days']}
                        placeholder='1 day'
                    />
                </View>
            )}
            <SettingSwitchItem
                label="Add/Removal Reminder"
                value={isAddRemovalReminderEnabled}
                onValueChange={() => setIsAddRemovalReminderEnabled(!isAddRemovalReminderEnabled)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemText: {
        fontFamily: 'PingFang SC',
        fontSize: 18,
        paddingLeft: 50,
    },
    sectionHeader: {
        marginTop: 60,
        marginBottom: 10,
        fontSize: 16,
        color: 'grey',
        paddingLeft: 15,
        fontFamily: 'PingFang SC',
    },
    time: {
        fontSize: 18,
        color: 'grey',
        marginHorizontal: 10,
    },
    selectedTime: {
        fontSize: 18,
        color: 'blue',
        marginHorizontal: 10,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(211, 211, 211, 0.5)',
    },
});

export default PushNotificationsScreen;
