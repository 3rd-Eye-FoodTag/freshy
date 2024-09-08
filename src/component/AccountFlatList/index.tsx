import React from 'react';
import { FlatList, FlatListProps } from 'react-native';

interface Props {
  data: { key: string, icon?: string }[];
  renderItem: FlatListProps<{ key: string, icon?: string }>['renderItem'];
  keyExtractor: (item: { key: string }) => string;
}

const AccountFlatList: React.FC<Props> = ({ data, renderItem, keyExtractor }) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default AccountFlatList;
