import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface DateDropDownProps {
  placeholder: string;
  options: string[];
  style?: any;
  containerStyle?: any;
  optionContainerStyle?: any;
  dropdownOptionsStyle?: any;
}

const DateDropDown: React.FC<DateDropDownProps> = ({
  placeholder,
  options,
  style,
  containerStyle,
  optionContainerStyle,
  dropdownOptionsStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <View style={[styles.inputContainer, containerStyle, style]}>
      {!selectedOption && <Text style={styles.placeholder}>{placeholder}</Text>}
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text style={styles.dropdownText}>{selectedOption || placeholder}</Text>
        <Text style={styles.dropdownArrow}>{'>'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.dropdownOptions, dropdownOptionsStyle]}>
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsOpen(false)}>
              <Text style={[styles.buttonText]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setIsOpen(false)}>
              <Text style={[styles.buttonText]}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <ScrollView style={[styles.optionList, optionContainerStyle]}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  selectedOption === option && styles.selectedOption,
                ]}
                onPress={() => handleOptionSelect(option)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    backgroundColor: '#f0f0f0',
    width: '40%',
    marginLeft: 20,
    marginRight: 20,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    position: 'absolute',
    left: 20,
    top: '50%',
    transform: [{translateY: -10}],
    color: 'white',
    fontSize: 17,
  },
  dropdownButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  dropdownText: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'PingFang SC',
    color: 'gray',
  },
  dropdownArrow: {
    fontSize: 28,
    color: 'lightgray',
    marginLeft: 10,
  },
  dropdownOptions: {
    position: 'absolute',
    top: 300,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cancelButton: {
    paddingVertical: 5,
  },
  doneButton: {
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'rgb(81, 179, 125)',
  },
  divider: {
    height: 0.5,
    backgroundColor: 'rgba(211, 211, 211, 0.3)',
  },
  optionList: {
    height: 200,
  },
  option: {
    paddingVertical: 20,
  },
  selectedOption: {},
  optionText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default DateDropDown;
