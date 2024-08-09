// components/PlusMinusButton.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface PlusMinusButtonProps {
  color: string;
  name: string;
  size?: number;
}

const PlusMinusButton: React.FC<PlusMinusButtonProps> = ({ color, name, size = 32 }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={'plus-minus-variant'} size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00B578',
    borderRadius: 60,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 17,
  },
});

export default PlusMinusButton;
