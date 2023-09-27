// import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native'; // Added Button for navigation
// import { useNavigation } from '@react-navigation/native';

const StudentsDashboard = () => {
  // const navigation = useNavigation();


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Student Dashboard</Text>
      <Text>This is where you will see all of your students.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default StudentsDashboard;

