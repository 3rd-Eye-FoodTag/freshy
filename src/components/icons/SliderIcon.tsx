import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';

interface SliderIconProps {
  name: string;
  size?: number;
  color?: string;
}

const SliderIcon: React.FC<SliderIconProps> = ({ name, size = 20, color = 'black' }) => {
  return <FontAwesome6 name={name} size={size} color={color} />;
};

export default SliderIcon;
