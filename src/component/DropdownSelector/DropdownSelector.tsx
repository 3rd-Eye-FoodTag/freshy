import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
// import AntDesign from '@expo/vector-icons/AntDesign';

interface DropdownProps {
  options: any[];
  onSelectOption?: (option: string | number) => void;
  showValue?: string | number;
}
const DropdownComponent: React.FC<DropdownProps> = ({
  options,
  onSelectOption,
  showValue,
}) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (showValue) {
      setValue(showValue);
    }
  }, []);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={options}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      value={value}
      onChange={item => {
        setValue(item.value);
        onSelectOption(item.value);
      }}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    width: 150,
    // margin: 16,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 12,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
