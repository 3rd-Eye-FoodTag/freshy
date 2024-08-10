import React from 'react';
import { VStack, Input, FlatList, Text, Pressable } from 'native-base';
import { TouchableOpacity } from 'react-native';

interface SearchBarProps {
  placeholder: string;
  data: Array<any>;
  onSelect: (item: { id: string; name: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, data, onSelect }) => {
  const [query, setQuery] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(data);

  React.useEffect(() => {
    if (query) {
      const filtered = data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [query, data]);

  const handleSelect = (item: { id: string; name: string }) => {
    setQuery(item.name);
    onSelect(item);
  };

  return (
    <VStack space={2} width="100%" px={4}>
      <Input
        placeholder={placeholder}
        variant="filled"
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        borderRadius="10"
        px={3}
      />
      {query.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          style={{ backgroundColor: '#E2E8F0', borderRadius: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text p={2} borderBottomWidth={1} borderBottomColor="gray.200">
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </VStack>
  );
};

export default SearchBar;
