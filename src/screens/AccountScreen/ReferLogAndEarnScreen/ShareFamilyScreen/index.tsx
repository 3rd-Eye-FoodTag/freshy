import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';
import UnstyleButton from '../../../../components/UnstyleButton';

const ShareFamilyScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.screen}>
            <Text style={styles.title}>Share with your families</Text>
            <Image
                style={styles.qrCode}
                source={require('../../../../assets/qr-code.png')}
            />
            <Text style={styles.description}>
                To join this household, they can {"\n"} download the app and scan this QR code {"\n"} in the sign-up process
            </Text>
            <UnstyleButton text="Share" backgroundColor="#00B578" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        marginTop: 50,
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'PingFang SC',
        marginBottom: 50,
    },
    qrCode: {
        width: '55%',
        height: '35%',
        marginBottom: 20,
    },
    description: {
        fontFamily: 'PingFang SC',
        fontSize: 17,
        color: 'grey',
        textAlign: 'center',
        paddingHorizontal: 30,
        marginBottom: 130,
    },
});

export default ShareFamilyScreen;
