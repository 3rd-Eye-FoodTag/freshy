import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header: React.FC = () => (
  <View style={styles.topBar}>
    <Text style={styles.topBarText}>Shopping List</Text>
    <TouchableOpacity style={styles.addButton}>
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    width: '100%',
    height: 100,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  topBarText: {
    fontSize: 21,
    fontFamily: 'PingFang SC',
    fontWeight: '600',
    paddingHorizontal: 50,
    paddingTop: 8,
  },
  addButton: {
    position: 'absolute',
    right: 20,
  },
  addButtonText: {
    fontSize: 40,
    fontFamily: 'PingFang SC',
    fontWeight: '200',
  },
});

export default Header;
