import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, StyleSheet, Text } from 'react-native';

const DropDownMenu = ({ options, selectedValue, onValueChange, placeholder }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onValueChange(itemValue)}
      >
        {/* Initial default display text */}
        <Picker.Item label={placeholder} value="" />
        
        {/* Map through options */}
        {options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 5,
    width: 200,
  },
});

export default DropDownMenu;
