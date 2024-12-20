import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import UnstyleButton from '../../../components/UnstyleButton';

const SubscriptionScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.pricingContainer}>
                <Text style={styles.priceText}>$2.99</Text>
                <Text style={styles.priceDescription}>per month/per household{'\n'}free for first 6 months</Text>
            </View>

            <View style={styles.nextPaymentContainer}>
                <Text style={styles.nextPaymentLabel}>Next Payment</Text>
                <Text style={styles.nextPaymentText}>$2.99 on May 28, 2024</Text>
            </View>

            <UnstyleButton text={'Modify Subscription'} backgroundColor='#00B578' style={{ marginTop: -50 }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    pricingContainer: {
        backgroundColor: '#F0F0F0',
        width: '90%',
        alignItems: 'center',
        padding: 20,
        borderRadius: 5,
        marginTop: 40,
        marginBottom: 40,
    },
    priceText: {
        fontSize: 55,
        fontFamily: 'PingFang SC',
        color: '#6C6C6C',
        marginLeft: -90,
    },
    priceDescription: {
        fontSize: 20,
        fontFamily: 'PingFang SC',
        color: '#666',

    },
    nextPaymentContainer: {
        width: '100%',
        marginBottom: '85%',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#E0E0E0',
        paddingVertical: 10,
    },
    nextPaymentLabel: {
        fontSize: 16,
        fontFamily: 'PingFang SC',
        color: '#999999',
        marginBottom: 5,
        marginLeft: 20
    },
    nextPaymentText: {
        fontSize: 18,
        fontFamily: 'PingFang SC',
        color: '#333333',
        marginLeft: 20
    },
});

export default SubscriptionScreen;
