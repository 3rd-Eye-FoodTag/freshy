import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ToggleButtonProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  const handlePress = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <View style={styles.tabs}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[styles.tab, selectedOption === option && styles.activeTab]}
          onPress={() => handlePress(option)}
        >
          <Text style={[styles.tabText, selectedOption === option && styles.tabTextActive]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  activeTab: {
    backgroundColor: '#00A86B',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  tabTextActive: {
    color: '#fff',
  },
});

export default ToggleButton;
