import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';
import Avatar from '../../../component/Avater';
import { FontAwesome5 } from 'react-native-vector-icons/FontAwesome5';
// import GreenButton from '@/components/globalComponent/GreenButton';

const initialMembers = [
  { key: 'ABC DDD 1', role: 'Host' },
  { key: 'ABC DDD 2', role: 'Member' },
  { key: 'ABC DDD 3', role: 'Member' },
];

const HouseholdProfileScreen: React.FC = () => {

    const [userRole, setUserRole] = useState('member');  // 判断页面是host or member

    // Remove Member
    const [members, setMembers] = useState(initialMembers);
    const removeMember = (key: string) => {
        setMembers(prevMembers => prevMembers.filter(member => member.key !== key));
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 头像和家庭名 */}
            <View style={styles.header}>
                {/* FIXME: image path invalid */}
                {/* <Avatar source={require('@/assets/images/avater2.png')} /> */}
                <TouchableOpacity style={styles.editButton} >
                {/*  FIXME: Render Error */}
                {/* <FontAwesome5 name="pencil-alt" size={17} color="white" /> */}
                </TouchableOpacity>
                <Text style={styles.familyName}>The Smith Family</Text>
            </View>
            {/* 家庭成员信息 */}
            <View style={styles.separator}></View>
            <Text style={styles.memberInfo}>Members (5 maximum)</Text>
            <FlatList
                data={members}
                renderItem={({ item, index }) => (
                    <View>
                        <View style={styles.memberContainer}>
                            <Text style={styles.memberText}>{item.key} {item.role === 'Host' ? '(Host)' : ''}</Text>
                            {item.role !== 'Host' && (
                                <TouchableOpacity onPress={() => removeMember(item.key)}>
                                    <Text style={styles.removeText}>Remove</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        {item.role === 'Host' && index < members.length - 1 && <View style={styles.separator}></View>}
                    </View>
                )}
                keyExtractor={(item) => item.key}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => { /* Handle button press here */ }}>
                {/* <GreenButton text='Add Member' backgroundColor='#00B578' style={{ alignSelf: 'center' }}/> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.leaveText}>{userRole === 'host' ? 'Transfer Host' : 'Leave this household'}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 40,
    },
    editButton: {
        position: 'absolute',
        right: 160,
        bottom: 50,
        backgroundColor: '#00B578',
        padding: 10,
        borderRadius: 20,
    },
    familyName: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'PingFang SC',
    },
    memberInfo: {
        fontSize: 14,
        color: 'grey',
        fontFamily: 'PingFang SC',
        marginLeft: 10,
        marginBottom: 10,
    },
    memberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    memberText: {
        fontSize: 16,
        fontFamily: 'PingFang SC',
        color: 'black',
    },
    removeText: {
        fontSize: 16,
        fontFamily: 'PingFang SC',
        color: '#00B578',
    },
    addButton: {
        marginBottom: 20,
        width: '88%',
        alignSelf: 'center',
    },
    button: {
        marginBottom: 20,
        width: '88%',
        height: '7%',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
    },
    leaveText: {
        fontFamily: 'PingFang SC',
        color: '#00B578',
        fontSize: 19,
        textAlign: 'center',
        marginTop: 20,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(211, 211, 211, 0.5)',
        marginBottom: 10,
    },
});

export default HouseholdProfileScreen;
