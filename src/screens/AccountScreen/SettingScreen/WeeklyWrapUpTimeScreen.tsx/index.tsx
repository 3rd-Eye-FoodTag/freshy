import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
// import Screen from '@/components/globalComponent/Screen';

import UnstyleButton from '../../../../components/UnstyleButton';
import DateDropDown from '../../../../components/DateDropDown';

const WeeklyWrapUpTimeScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.spacer} />
      <Text style={styles.descriptionText}>
        We will let you see what’s expiring, plan meals and generate grocery
        list.
      </Text>
      <Text style={styles.descriptionText}>
        When is a good time for your wrap up?
      </Text>
      <View style={styles.selectionContainer}>
        <DateDropDown
          options={['Firday', 'Saturaday', 'Sunday']}
          placeholder="Firday"
          containerStyle={{width: '45%'}}
          dropdownOptionsStyle={{left: -35, right: -225}}
        />
        <DateDropDown
          options={['8:00 PM', '9:00 PM', '10:00 PM']}
          placeholder="8:00 PM"
          containerStyle={{width: '45%'}}
          dropdownOptionsStyle={{left: -235, right: -30}}
        />
      </View>

      <UnstyleButton
        text="Continue"
        backgroundColor="rgb(81, 179, 125)"
        style={{alignSelf: 'center'}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  spacer: {
    height: '10%',
  },
  descriptionText: {
    fontSize: 18,
    fontFamily: 'PingFang SC',
    color: 'grey',
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: '20%',
  },
  selectionBox: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionText: {
    fontSize: 18,
    color: 'black',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  continueButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default WeeklyWrapUpTimeScreen;
