// MainBtn.js
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const MainBtn = ({ label, onPress, style, textColor, isActive = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine if button should be styled as active
  const buttonBackgroundColor = isActive ? '#FFFFFF' : isHovered ? '#FFFFFF' : '#404040';
  const buttonBorderColor = isActive ? '#000000' : isHovered ? '#404040' : '#FFFFFF';
  const buttonTextColor = textColor || (isActive ? '#000000' : isHovered ? '#404040' : '#FFFFFF');

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={[
        styles.button,
        { backgroundColor: buttonBackgroundColor, borderColor: buttonBorderColor },
        style,
      ]}
    >
      <Text style={[styles.buttonText, { color: buttonTextColor }]}>{label}</Text>
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
    fontFamily: 'Arial',
    fontSize: 12,
  },
});

export default MainBtn;
