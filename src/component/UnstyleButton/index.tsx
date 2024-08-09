import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface UnstyleButtonProps {
  text: string;
  backgroundColor?: string;
  style?: ViewStyle;
  onPress?: () => void; 
}

const UnstyleButton: React.FC<UnstyleButtonProps> = ({ text, backgroundColor = 'rgb(169, 203, 202)', style, onPress }) => (
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

export default UnstyleButton;
