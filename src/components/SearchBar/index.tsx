import React, {useEffect, useRef} from 'react';
import {
  VStack,
  Input,
  ActionsheetFlatList,
  Text,
  Pressable,
  InputField,
} from '@/components/ui';
import {
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

interface SearchBarProps {
  placeholder: string;
  data: Array<any>;
  onSelect?: (item: {id: string; name: string}) => void;
  onTextChange?: (onTextChange: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  data,
  onSelect,
  onTextChange,
  className,
}) => {
  const [query, setQuery] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(data);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false); // Track if dropdown is open
  const inputRef = useRef<any>(null); // To manage input reference

  useEffect(() => {
    if (query) {
      const filtered = data.filter(item =>
        item.foodName.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredData(filtered);
      setIsDropdownOpen(true); // Open dropdown when query is non-empty
    } else {
      setFilteredData(data);
      setIsDropdownOpen(false); // Close dropdown when query is empty
    }
  }, [query, data]);

  const handleSelect = (item: {id: string; name: string}) => {
    setQuery(item.foodName);
    setIsDropdownOpen(false); // Close dropdown when an item is selected
    onSelect?.(item);
  };

  const handleSearchChange = (searchText: string) => {
    setQuery(searchText);
    onTextChange?.(searchText);
  };

  const handleBlur = () => {
    console.log('Input blurred');
    setIsDropdownOpen(false); // Close dropdown when input loses focus
  };

  const handleOutsidePress = () => {
    Keyboard.dismiss(); // Dismiss keyboard on outside press
    setIsDropdownOpen(false); // Close dropdown
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <VStack space="md" className="w-full ml-4 flex-1 relative">
        <Input>
          <InputField
            ref={inputRef}
            placeholder={placeholder}
            value={query}
            onChangeText={handleSearchChange}
            onFocus={() => {
              console.log('Input focuse');
            }}
            onBlur={handleBlur} // Triggered when input loses focus
          />
        </Input>
        {/* Dropdown list */}
        {isDropdownOpen && query.length > 0 && (
          <ActionsheetFlatList
            data={filteredData}
            keyExtractor={(item, index) => `${item.foodID}-${index}`}
            className="absolute top-full left-0 right-0 bg-gray-200 rounded-md shadow-lg z-50 mt-1.5"
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <Text className="p-2 border-b border-gray-300">
                  {item.foodName}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </VStack>
    </TouchableWithoutFeedback>
  );
};

export default SearchBar;
