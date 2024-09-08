// CustomTabBar.tsx
import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import CenterMenu from '../../../component/CenterMenu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const iconMapping: {[key: string]: string} = {
  Home: 'home',
  Storage: 'archive',
  Add: 'plus-circle',
  Shopping: 'shopping-cart',
  Account: 'user',
};

const CustomTabBar: React.FC<BottomTabBarProps> = props => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  return (
    <View style={styles.tabBarContainer}>
      {props.state.routes.map((route, index) => {
        const isFocused = props.state.index === index;

        const iconName = iconMapping[route.name] || 'circle';

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            onPress={() => props.navigation.navigate(route.name)}
            style={styles.tabButton}>
            <Icon
              name={iconName}
              size={24}
              color={isFocused ? '#673ab7' : '#222'}
            />
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={styles.customButton} onPress={toggleMenu}>
        <MaterialCommunityIcons
          name="plus-minus-variant"
          size={32}
          color="white"
        />
        <CenterMenu
          isMenuVisible={isMenuVisible}
          setMenuVisible={setMenuVisible}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  customButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 35,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center', // Center the button horizontally
    left: '50%',
    transform: [{translateX: -35}], // Move the button to the exact center
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default CustomTabBar;
