import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface ProfileInfoRowProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
  secureTextEntry?: boolean;
}

const ProfileInfoRow: React.FC<ProfileInfoRowProps> = ({ label, value, onChange, secureTextEntry = false }) => {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        defaultValue={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(211, 211, 211, 0.5)',
  },
  label: {
    fontSize: 15,
    color: 'grey',
    paddingHorizontal: 15,
  },
  input: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'left',
  },
});

export default ProfileInfoRow;
