import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const MainBtn = ({ label, onPress, style }) => {
  const [isHovered, setIsHovered] = useState(false); // State to manage hover

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)} // Set hover state to true when hovered
      onHoverOut={() => setIsHovered(false)} // Set hover state to false when not hovered
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isHovered ? '#FFFFFF' : '#404040', // Change background color on hover
          borderColor: isHovered ? '#404040' : '#FFFFF', // Optional: change border color on hover
        },
        style, // Allow custom styles to be passed in
      ]}
    >
      <Text style={[styles.buttonText, { color: isHovered ? '#404040' : '#FFFFFF' }]}>
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
