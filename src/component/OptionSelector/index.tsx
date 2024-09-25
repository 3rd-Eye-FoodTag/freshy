import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface OptionSelectorProps {
  label?: string;
  value?: string;
  options: Array<string | number>;
  onSelectOption: (option: string | number) => void;
  isEditMode: boolean;
  type?: 'date' | null;
  defaultOption?: boolean;
  reset?: boolean;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  label,
  value,
  options,
  onSelectOption,
  isEditMode,
  type,
  defaultOption,
  reset,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [formattedOption, setOptions] = useState(options);

  const handlePress = (option: string | number, index: number) => {
    setSelectedOption(() => option);
    if (type === 'date') {
      onSelectOption(options[index]);
    } else {
      onSelectOption(option);
    }
  };

  useEffect(() => {
    if (reset) {
      setSelectedOption(null);
    }
  }, [reset]);

  useEffect(() => {
    if (defaultOption) {
      handlePress(options[0]);
    }

    if (type === 'date') {
      setOptions(pre => [...pre.map(day => `in ${day} days`)]);
    }
  }, []);

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.header}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.content}>{value}</Text>
        </View>
      )}
      <View style={styles.optionsContainer}>
        {formattedOption.map((option, index) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              selectedOption === option && styles.selectedOption,
            ]}
            disabled={!isEditMode}
            onPress={() => handlePress(option, index)}>
            <Text
              style={[
                styles.optionText,
                selectedOption === option && styles.selectedOptionText,
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 10,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    color: '#999',
    fontFamily: 'PingFang SC',
    fontSize: 15,
    marginLeft: 10,
  },
  content: {
    color: '#00B578',
    fontFamily: 'PingFang SC',
    fontSize: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    flexBasis: '30%',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOption: {
    backgroundColor: '#E0F7F1',
    borderColor: '#00B578',
    borderWidth: 1,
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'PingFang SC',
    fontWeight: 'bold',
    color: 'black',
  },
  selectedOptionText: {
    color: '#00B578',
    fontWeight: 'bold',
  },
});

export default OptionSelector;
