// components/icons/StorageIcon.tsx
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StorageIcon = ({ color }: { color: string }) => {
  return <MaterialCommunityIcons name="fridge-outline" size={24} color={color} />;
};

export default StorageIcon;
