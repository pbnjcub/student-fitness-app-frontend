import React from 'react';
import { StatusBar, View, Text, StyleSheet, Dimensions } from 'react-native';

import StudentManagementLinks from '../../components/AdminStudentManagementLinks';
import { useAdminContext } from '../../contexts/AdminContext';

const AdminDashboard = () => {
  const { students, errors, isLoading } = useAdminContext();
  
  const actions = ['Student Management:', 'Course Management:', 'Teacher Management:'];

  console.log(students)
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  actionsContainer: {
    width: windowWidth * 0.5,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
  },
  actionContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    margin: 5,
  },
  actionText: {
    fontSize: 16,
  },
});

export default AdminDashboard;
