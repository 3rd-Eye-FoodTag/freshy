import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

interface DateDropDownProps {
  placeholder: string;
  options: string[];
  style?: any;
  containerStyle?: any;
  optionContainerStyle?: any;
  dropdownOptionsStyle?: any;
  onSelected?: (e: any) => void;
  defaultOption?: string;
}

const DateDropDown: React.FC<DateDropDownProps> = ({
  placeholder,
  options,
  style,
  containerStyle,
  optionContainerStyle,
  dropdownOptionsStyle,
  onSelected = () => {},
  defaultOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    defaultOption || options[0],
  );

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    onSelected(selectedOption);
  }, []);

  const handleOptionSelect = (option: string) => {
    console.log({option});
    setSelectedOption(option);
    setIsOpen(false);
    onSelected(option);
  };

  return (
    <View
      className={`h-12 bg-gray-200 w-[40%] mx-5 flex-1 z-20 ${style || ''} ${
        containerStyle || ''
      }`}>
      <TouchableOpacity
        className="flex-1 flex-row items-center justify-between px-5"
        onPress={toggleDropdown}>
        <Text className="flex-1 text-lg text-gray-500">
          {selectedOption || placeholder}
        </Text>
        <Text className="text-xl text-gray-400">{'>'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View
          className={`absolute top-12 bg-white w-full shadow-lg z-10 ${
            dropdownOptionsStyle || ''
          }`}>
          <View className="flex-row justify-between items-center bg-white px-5 py-2">
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Text className="text-green-600 text-base">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Text className="text-green-600 text-base">Done</Text>
            </TouchableOpacity>
          </View>
          <View className="h-px bg-gray-300" />
          <ScrollView className={`h-48 ${optionContainerStyle || ''}`}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                className={`py-5 ${
                  selectedOption === option ? 'bg-gray-100' : ''
                }`}
                onPress={() => handleOptionSelect(option)}>
                <Text className="text-lg text-center">{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default DateDropDown;
