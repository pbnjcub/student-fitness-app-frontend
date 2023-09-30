import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useNavigation } from '@react-navigation/native';
import { uploadStudent } from '../actions/admin'; // Adjust import to your project structure
import { showAlert } from '../utilities/alertUtil';
import BulkStudentUploadBtn from './AdminBulkStudentUploadBtn'; // Adjust the path accordingly


const AddStudents = ({ onUploadSuccess, onUploadError }) => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    email: '',
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    gradYear: '',
    // other fields...
  })
  const [isPickerVisible, setPickerVisible] = useState(false);

    
  const navigation = useNavigation(); // Navigation hook from react-navigation

  const handleChange = (name, value) => {
    setNewStudent({ ...newStudent, [name]: value });
  };
  
  const handleAddStudent = async () => {
    try {
      const serverResponse = await uploadStudent(newStudent);
      
      onUploadSuccess(serverResponse); 
      navigation.goBack(); // Navigate back after successful upload
    } catch (err) {
      console.error('Student upload error: ', err);
      showAlert('Upload Error', err.message || 'An unexpected error occurred during upload.');
      onUploadError(err);
    }
  };

  const handleCancel = () => {
    navigation.goBack(); // Navigate back when cancel is pressed
  };

  const handleUploadSuccess = async (data) => {
    if (data.newStudents && data.newStudents.length > 0) {
      setStudents([...students, ...data.newStudents]);
    }
    showAlert('Success', 'File uploaded and processed successfully.');
  };

  const handleUploadError = (error) => {
    showAlert('Error', 'File upload failed. Please try again.');
  };

  return (
    <View style={styles.container}>
       <TextInput
        placeholder="Email"
        value={newStudent.email}
        onChangeText={(text) => handleChange('email', text)}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        // Add Basic Email Validation
        onBlur={() => {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(newStudent.email)) {
            // Handle Invalid Email
          }
        }}
      />
      <TextInput 
        placeholder="First Name" 
        value={newStudent.firstName} 
        onChangeText={(text) => handleChange('firstName', text)} 
        style={styles.input}
      />
      <TextInput 
        placeholder="Last Name" 
        value={newStudent.lastName} 
        onChangeText={(text) => handleChange('lastName', text)} 
        style={styles.input}
      />
        <Button title="Select Birth Date" onPress={() => setPickerVisible(true)} />

        {isPickerVisible && (
        <DateTimePicker
          value={newStudent.birthDate}
          mode='date'
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              handleChange('birthDate', selectedDate.toISOString().split('T')[0]);
            }
            setPickerVisible(false);
          }}
        />
      )}
      <TextInput
        placeholder="Graduating Year"
        value={newStudent.gradYear}
        onChangeText={(text) => handleChange('gradYear', text)}
        style={styles.input}
        keyboardType="numeric"
        onBlur={() => {
          if (isNaN(newStudent.gradYear) || newStudent.gradYear.length !== 4) {
            // Handle Invalid Graduating Year
          }
        }}
      />
      {/* Add other TextInputs for additional fields as needed */}
      <Button title="Submit" onPress={handleAddStudent} />
      <Button title="Cancel" onPress={handleCancel} />

      <BulkStudentUploadBtn onUploadSuccess={onUploadSuccess} onUploadError={onUploadError} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default AddStudents;
