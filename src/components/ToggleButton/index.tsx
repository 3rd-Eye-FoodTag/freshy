import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

interface ToggleButtonProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
  size?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  options,
  onSelect,
  size,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  const handlePress = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <React.Fragment>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          className={`px-5 py-2 w-${
            size ? size : 'auto'
          } rounded-full bg-[#00A86B]`}
          onPress={() => handlePress(option)}>
          <Text className={'text-base font-medium text-white'}>{option}</Text>
        </TouchableOpacity>
      ))}
    </React.Fragment>
  );
};

export default ToggleButton;
