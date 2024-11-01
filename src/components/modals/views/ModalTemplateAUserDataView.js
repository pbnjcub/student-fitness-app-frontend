// UserDataView.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ModalTemplateAUserDataView = ({ labels, values }) => {
  return (
    <View>
      {labels.map((label, index) => (
        <View key={index} style={styles.labelValueRow}>
          <Text style={styles.label}>{label}:</Text>
          <Text style={styles.value}>{values[index] || 'N/A'}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  labelValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    color: '#555',
  },
});

export default ModalTemplateAUserDataView;
