import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // import useNavigation hook

const StudentManagementLinks = () => {
    const navigation = useNavigation();
  
    return (
      <View style={styles.linksContainer}>
        <TouchableOpacity 
            onPress={() => navigation.navigate('AdminAddStudents')} 
            style={styles.button}
        >
          <Text style={styles.buttonText}>Add Student or Bulk Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={() => alert('Delete/Edit Student')} 
            style={styles.button}
        >
          <Text style={styles.buttonText}>Delete/Edit Student</Text>
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
  linksContainer: {
    paddingTop: 10,
    alignItems: 'center', // to align buttons in the center
    backgroundColor: 'white', 
  },
  button: {
    backgroundColor: '#007BFF', // Bootstrap primary button color, you can change as needed
    paddingHorizontal: 20, // horizontal padding
    paddingVertical: 10, // vertical padding
    borderRadius: 5, // rounded corners
    marginBottom: 10, // space between the buttons
  },
  buttonText: {
    color: 'white',
    fontSize: 16, // you can change the size as needed
  },
});

export default StudentManagementLinks;
