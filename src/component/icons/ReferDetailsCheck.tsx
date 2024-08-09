import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';

interface ReferDetailsCheckProps {
  color: string;
  style?: StyleProp<ViewStyle>;
}

const ReferDetailsCheck: React.FC<ReferDetailsCheckProps> = ({ color, style }) => {
  return <AntDesign name="check" size={14} color={color} style={style} />;
};

export default ReferDetailsCheck;
