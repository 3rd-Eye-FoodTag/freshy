import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {convertToDays, transformDays} from '../../utils/utils';
import {Box, HStack, Input, VStack} from 'native-base';
import DropdownSelector from '../DropdownSelector/DropdownSelector';

interface OptionSelectorProps {
  label?: string;
  value?: string;
  options?: Array<any>;
  onSelectOption?: (option: string | number) => void;
  isEditMode?: boolean;
  type?: 'date' | 'dropdown' | 'comment' | null;
  defaultOption?: string | number;
  reset?: boolean;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  label,
  value,
  options = [],
  onSelectOption,
  isEditMode = false,
  type,
  defaultOption,
  reset,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | number | null>(
    null,
  );
  const [customDate, setCustomDate] = useState(false);
  const [comment, setComment] = useState(defaultOption || '');
  const [duration, setDuration] = useState<string>(''); // Duration input state
  const [timeUnit, setTimeUnit] = useState<any>('day'); // Time unit state

  useEffect(() => {
    if (customDate && duration && timeUnit) {
      onSelectOption(convertToDays(Number(duration), timeUnit));
    }
  }, [customDate, duration, timeUnit]);

  const handlePress = (option?: string | number, index?: number) => {
    console.log(duration, timeUnit);
    if (option === 'Custom') {
      setCustomDate(true);
      setSelectedOption(option);
    } else {
      setCustomDate(false);
      setSelectedOption(option);
      if (onSelectOption) {
        if (type === 'date') {
          onSelectOption(options[index as number]); // Ensure index is a valid number
        } else {
          onSelectOption(option);
        }
      }
    }
  };

  useEffect(() => {
    if (reset) {
      setSelectedOption(null);
    }
  }, [reset]);

  useEffect(() => {
    if (defaultOption) {
      handlePress(defaultOption);
    }
  }, [defaultOption]);

  const commentComponet = (
    <>
      <Text style={styles.commentLabel}>{label}</Text>
      <Input
        value={comment}
        onChangeText={value => {
          setComment(value);
          onSelectOption(value);
        }}
        multiline
        numberOfLines={4}
        style={styles.commentField}
      />
    </>
  );

  const customDateComponent = customDate ? (
    <Box w="100%" mt={4}>
      <VStack space={4}>
        <Text fontSize="md" fontWeight="bold">
          Custom Duration
        </Text>
        <HStack space={3} alignItems="center">
          <Input
            w="45%"
            keyboardType="numeric"
            placeholder="Enter number"
            value={duration}
            onChangeText={value => {
              setDuration(value);
            }}
          />
          <DropdownSelector
            options={[
              {label: 'day', value: 'day'},
              {label: 'week', value: 'week'},
              {label: 'month', value: 'month'},
            ]}
            onSelectOption={unit => setTimeUnit(unit)}
            showValue={'day'}
          />
        </HStack>
      </VStack>
    </Box>
  ) : null;

  const regularCard = (
    <>
      {label && (
        <View style={styles.header}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.content}>{value}</Text>
        </View>
      )}
      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          return (
            <TouchableOpacity
              key={`option-${index}`}
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
                {type === 'date' && typeof option === 'number'
                  ? transformDays(option as number)
                  : option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {customDateComponent}
    </>
  );

  const dropdownContent = (
    <View style={styles.header}>
      <Text style={styles.label}>{label}</Text>
      <DropdownSelector
        options={options}
        onSelectOption={onSelectOption}
        showValue={defaultOption}
      />
    </View>
  );

  let content;
  switch (type) {
    case 'comment':
      content = commentComponet;
      break;
    case 'dropdown':
      content = dropdownContent;
      break;

    default:
      content = regularCard;
      break;
  }

  return <View style={styles.container}>{content}</View>;
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
    alignItems: 'center',
  },
  label: {
    color: '#999',
    fontFamily: 'PingFang SC',
    fontSize: 15,
    marginLeft: 10,
  },
  commentLabel: {
    color: '#999',
    fontFamily: 'PingFang SC',
    fontSize: 15,
    marginBottom: 10,
  },
  commentField: {
    height: 200,
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
