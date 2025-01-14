import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import UnstyleButton from '../../../components/UnstyleButton';

import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../router/constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ReferLogAndEarnScreenNavigationProp = NativeStackNavigationProp<RootStackParams>;

const ReferLogAndEarnScreen: React.FC = () => {

    const navigation = useNavigation<ReferLogAndEarnScreenNavigationProp>();

    const invitedFriends = 4;
    const freeMonthsEarned = 7;

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.spacer} />
            <Text style={styles.description}>
                Refer a new user {"\n"} you and your friend: both 1 month free
            </Text>
            <Text style={styles.description}>
                Friend log in 50 food{"\n"} you: another 1 month free {"\n"} your friend: another 3 month free
            </Text>
            <Image
                style={styles.referImage}
                source={require('../../../assets/refer-rules.jpeg')}
            />
            <View style={styles.shareDetails}>
                <Text style={styles.shareText}>
                    friend{"\n"} invited {"\n"} {invitedFriends}
                </Text>
                <Text style={styles.shareText}>
                    Free month{"\n"} earned {"\n"} {freeMonthsEarned}
                </Text>

                <TouchableOpacity style={styles.detailsButton}
                    onPress={() => navigation.navigate('ReferDetailsScreen')} >
                    <Text style={styles.detailsButtonText}>Details{">"}</Text>
                </TouchableOpacity>

            </View>
            <UnstyleButton
                text="Share"
                backgroundColor="#00B578"
                onPress={() => navigation.navigate('ShareFamilyScreen')}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    spacer: {
        height: '5%',
    },
    description: {
        fontFamily: 'PingFang SC',
        fontSize: 17,
        color: '#6C6C6C',
        textAlign: 'center',
        marginBottom: 50,
    },
    referImage: {
        width: '100%',
        height: '30%',
        resizeMode: 'contain',
        marginTop: -60,

    },
    shareDetails: {
        width: '85%',
        height: '25%',
        backgroundColor: "#F6F6F6",
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareText: {
        textAlign: 'center',
        fontFamily: 'PingFang SC',
        fontSize: 17,
        marginHorizontal: 40,
        lineHeight: 30,
    },
    detailsButton: {
        position: 'absolute',
        bottom: 15,
        right: 20,
        width: 70,
        height: 30,
    },
    detailsButtonText: {
        fontFamily: 'PingFang SC',
        fontSize: 17,
        color: 'black',
        textAlign: 'center',
    },
});

export default ReferLogAndEarnScreen;
