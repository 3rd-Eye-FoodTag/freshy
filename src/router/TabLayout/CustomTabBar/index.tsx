// CustomTabBar.tsx
import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import CenterMenu from '../../../components/CenterMenu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const iconMapping: {[key: string]: string} = {
  Home: 'home',
  Eats: 'pac-man',
  Add: 'plus-circle',
  Shopping: 'shopping-cart',
  Account: 'user',
};

const CustomTabBar: React.FC<BottomTabBarProps> = props => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const iconFunc = (iconName, isFocused) => {
    if (iconName === 'pac-man') {
      return (
        <MaterialCommunityIcons
          name="pac-man"
          size={24}
          color={isFocused ? '#673ab7' : '#222'}
        />
      );
    }

    return (
      <Icon name={iconName} size={24} color={isFocused ? '#673ab7' : '#222'} />
    );
  };

  return (
    <View className="flex-row h-15 bg-white border-t border-gray-300 items-center justify-around relative">
      {props.state.routes.map((route, index) => {
        const isFocused = props.state.index === index;

        const iconName = iconMapping[route.name] || 'circle';

        if (route.name === 'Add') {
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              onPress={() => props.navigation.navigate(route.name)}
              className="flex-1 items-center py-2"
            />
          );
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            onPress={() => props.navigation.navigate(route.name)}
            className="flex-1 items-center py-2">
            {iconFunc(iconName, isFocused)}
            <Text className={isFocused ? 'text-purple-700' : 'text-gray-800'}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        className="absolute bottom-2 left-1/2 bg-[#00A86B] rounded-full w-28 h-28 justify-center items-center z-10 transform -translate-x-14"
        onPress={toggleMenu}>
        <MaterialCommunityIcons
          name="plus-minus-variant"
          size={40}
          color="white"
          className="flex-1 top-1/4"
        />
        <CenterMenu
          isMenuVisible={isMenuVisible}
          setMenuVisible={setMenuVisible}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomTabBar;
