import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const MainBtn = ({ label, onPress, style, textColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isHovered ? '#FFFFFF' : '#404040',
          borderColor: isHovered ? '#404040' : '#FFFFF',
        },
        style,
      ]}
    >
      <Text style={[styles.buttonText, { color: textColor || (isHovered ? '#404040' : '#FFFFFF') }]}>
        {label}
      </Text>
    </Pressable>
  );
};



const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Arial', // You can change this to Futura if loaded
    fontSize: 12,
  },
});

export default MainBtn;
