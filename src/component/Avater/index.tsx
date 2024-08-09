import React from 'react';
import { StyleSheet, ImageBackground, View, ImageSourcePropType } from 'react-native';

interface AvatarProps {
  source: ImageSourcePropType;
}

const Avatar: React.FC<AvatarProps> = ({ source }) => {
  return (
    <View style={styles.avatarContainer}>
      <ImageBackground style={styles.avatar} source={source} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 75,
  },
});

export default Avatar;
