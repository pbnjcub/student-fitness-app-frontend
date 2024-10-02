// src/components/CustomDrawerItem.js
import React from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import { Text, StyleSheet } from 'react-native';

const CustomDrawerItem = ({ label, onPress }) => {
  return (
    <DrawerItem
      label={() => <Text style={styles.label}>{label}</Text>}
      onPress={onPress}
      style={styles.item} // Optional: Apply styles to the drawer item container
    />
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Arial', // Use 'Futura Light' if imported correctly
    fontSize: 16,       // Font size
    color: '#000',      // Font color
  },
  item: {
    // You can add styles for the item container if needed
  },
});

export default CustomDrawerItem;
