import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native'; // import View and StyleSheet

import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import AdminAddStudents from './components/AdminAddStudents';
import AdminEditStudents from './components/AdminEditStudents';

import { AdminProvider } from './contexts/AdminContext'; // import the AdminProvider component

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AdminProvider>
        <View style={styles.container}>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            <Drawer.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: 'Admin Dashboard' }} />
            <Drawer.Screen name="AdminAddStudents" component={AdminAddStudents} options={{ title: 'Add Students' }} />
            <Drawer.Screen name="AdminEditStudents" component={AdminEditStudents} options={{ title: 'Edit Students' }} />
          </Drawer.Navigator>
        </View>
      </AdminProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1, 
    backgroundColor: 'white', // set background color to white
  },
});
