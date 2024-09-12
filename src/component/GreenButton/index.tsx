import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface GreenButtonProps {
  text: string;
  backgroundColor?: string;
  style?: ViewStyle;
  onPress?: () => void; 
}

const GreenButton: React.FC<GreenButtonProps> = ({ text, backgroundColor = 'rgb(169, 203, 202)', style, onPress }) => (
  <TouchableOpacity style={[styles.greenButton, { backgroundColor }, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  greenButton: {
    marginBottom: 20,
    width: '88%',
    height: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
  },
});

export default GreenButton;
