import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

interface AvaterEditIconProps {
  name: string;
  size?: number;
  color?: string;
}

const AvaterEditIcon: React.FC<AvaterEditIconProps> = ({ name, size = 17, color = 'white' }) => {
  return <FontAwesome5 name={name} size={size} color={color} />;
};

export default AvaterEditIcon;