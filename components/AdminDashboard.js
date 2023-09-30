import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { showAlert } from '../utilities/alertUtil';

import { getAllStudents } from '../actions/admin';
import BulkStudentUploadBtn from './AdminBulkStudentUploadBtn';
import StudentManagementLinks from './AdminStudentManagementLinks'; // Import the component

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
    if (data.newStudents && data.newStudents.length > 0) {
      setStudents([...students, ...data.newStudents]);
    }
    showAlert('Success', 'File uploaded and processed successfully.');
  };

  const handleUploadError = (error) => {
    showAlert('Error', 'File upload failed. Please try again.');
  };

  const actions = [
    'Search By:',
    'Student Management:',
    'Course Management:',
    'Teacher Management:',
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading && <Text>Loading...</Text>}
      {errors && <Text>Error: {errors}</Text>}
      {!isLoading && !errors && (
        <View style={styles.actionsContainer}>
          {actions.map((action, index) => (
            <View key={index} style={styles.actionContainer}>
              <Text style={styles.actionText}>{action}</Text>
              {action === 'Student Management:' && <StudentManagementLinks />}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', // Aligning children horizontally at the center, can remove if not needed
    paddingTop: 20, // Optional: adding some padding at the top of the container
    backgroundColor: 'white', // Since you want the background to be white
  },
  actionsContainer: {
    width: windowWidth * 0.5, // 80% of window width
    // Removed height to allow the container to grow with its content.
    alignSelf: 'center', // Center the actions container horizontally
    backgroundColor: 'white', // Ensuring that the background color is white
  },
  actionContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Keeping this white as per your previous message
    margin: 5, // Optional: adding some margin between the action containers
  },
  actionText: {
    fontSize: 16,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});


export default AdminDashboard;
