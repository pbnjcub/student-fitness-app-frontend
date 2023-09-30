import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native'; // import View and StyleSheet

import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import AdminAddStudents from './components/AdminAddStudents';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}> {/* Apply the style here */}
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} options={{ title: 'Home' }} />
          <Drawer.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: 'Admin Dashboard' }} />
          <Drawer.Screen name="AdminAddStudents" component={AdminAddStudents} options={{ title: 'Add Students' }} />
        </Drawer.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1, 
    backgroundColor: 'white', // set background color to white
  },
});
