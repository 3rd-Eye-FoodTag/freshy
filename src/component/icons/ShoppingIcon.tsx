// components/icons/ShoppingIcon.tsx
import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';

const ShoppingIcon = ({ color }: { color: string }) => {
  return <FontAwesome6 name="basket-shopping" size={20} color={color} />;
};

export default ShoppingIcon;
