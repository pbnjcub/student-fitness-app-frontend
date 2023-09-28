import React, { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { getAllStudents } from '../actions/admin'; // Adjust the import path accordingly.
import { showAlert } from '../utilities/alertUtil';

import BulkStudentUploadBtn from './BulkStudentUploadBtn';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      const data = await getAllStudents();
      if (data.errors) {
        setErrors(data.errors);
      } else {
        setStudents(data);
      }
    } catch (err) {
      setErrors('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleUploadSuccess = async (data) => {
    showAlert('Success', 'File uploaded and processed successfully.'); // Using showAlert utility here
    await loadStudents();
};

const handleUploadError = (error) => {
    showAlert('Error', 'File upload failed. Please try again.'); // Using showAlert utility here
};


  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Name: {item.firstName} {item.lastName} </Text>
      <Text>Birth Date: {new Date(item.birthDate).toLocaleDateString()}</Text>
      <Text>Graduation Year: {item.gradYear}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading && <Text>Loading...</Text>}
      {errors && <Text>Error: {errors}</Text>}
      {!isLoading && !errors && (
        <FlatList
          data={students}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()} // Adjust according to the actual structure of your data
        />
      )}
      <BulkStudentUploadBtn onUploadSuccess={handleUploadSuccess} onUploadError={handleUploadError} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AdminDashboard;
