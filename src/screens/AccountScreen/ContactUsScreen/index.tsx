import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, Clipboard } from 'react-native';

import UnstyleButton from '../../../components/UnstyleButton';
import { Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';



const ContactUsScreen: React.FC = () => {
    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
        Alert.alert('Copied to Clipboard', `${text} has been copied to your clipboard.`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.subHeader}>
                Contact with through Wechat or email {'\n'} and we will help make your experience {'\n'} better!
            </Text>

            <UnstyleButton text={'Leave Feedback in Community'} backgroundColor='#00B578' style={{ marginBottom: 60 }} />

            <View style={styles.contactContainer1}>
                <Icon as={MaterialCommunityIcons} name={'email-outline'} size="md" color={'black'} />
                <Text style={styles.contactText}>3rdeyetech@gmail.com</Text>
                <TouchableOpacity onPress={() => copyToClipboard('3rdeyetech@gmail.com')}>
                    <Icon as={Octicons} name={'copy'} size="sm" color={'black'} />
                </TouchableOpacity>
            </View>

            <UnstyleButton text={'Send Us An Email'} backgroundColor='#00B578' style={{ marginBottom: 60, marginTop: 30 }} />

            <View style={styles.contactContainer2}>

                <Icon as={AntDesign} name={'wechat'} size="md" color={'#18DA14'} />
                <Text style={styles.contactWechatText}>3rdeyetech</Text>
                <TouchableOpacity onPress={() => copyToClipboard('3rdeyetech')}>
                    <Icon as={Octicons} name={'copy'} size="sm" color={'black'} />
                </TouchableOpacity>
            </View>

            <UnstyleButton text={'Talk through Wechat'} backgroundColor='#00B578' style={{ marginBottom: 60, marginTop: 30 }} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    subHeader: {
        marginTop: 40,
        color: '#6C6C6C',
        fontFamily: 'PingFang SC',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#00B578',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    contactContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        padding: 15,
        borderRadius: 5,
        width: '70%',
        height: 60,
        justifyContent: 'space-between',
    },
    contactContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        padding: 15,
        borderRadius: 5,
        width: '50%',
        height: 60,
        justifyContent: 'space-between',
    },
    contactText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#6C6C6C',
        textAlign: 'center',
    },
    contactWechatText: {
        fontSize: 16,
        color: '#6C6C6C',
        textAlign: 'center',
    },
});

export default ContactUsScreen;
