// components/icons/AccountIcon.tsx
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AccountIcon = ({ color }: { color: string }) => {
  return <MaterialCommunityIcons name="account-circle-outline" size={24} color={color} />;
};

export default AccountIcon;
