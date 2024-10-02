import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home'; // Import your Home component
import AdminDashboard from '../screens/admin/AdminDashboard'; // Import your AdminDashboard component
import AdminAddStudents from '../screens/admin/AdminAddStudents'; // Import your AdminAddStudents component
import AdminEditStudents from '../screens/admin/AdminEditStudents'; // Import your AdminEditStudents component
import CustomDrawerItem from './CustomDrawerItem'; // Import your custom drawer item

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'lightblue',
          margin: 5,
          borderRadius: 10,
        },
        drawerActiveTintColor: 'red', // Corrected from activeTineTolor to drawerActiveTintColor
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={Home} 
        options={{ 
          drawerItem: (props) => <CustomDrawerItem label="Home" {...props} /> // Update to use CustomDrawerItem
        }} 
      />
      <Drawer.Screen 
        name="AdminDashboard" 
        component={AdminDashboard} 
        options={{ 
          drawerItem: (props) => <CustomDrawerItem label="Admin Dashboard" {...props} />
        }} 
      />
      <Drawer.Screen 
        name="AdminAddStudents" 
        component={AdminAddStudents} 
        options={{ 
          drawerItem: (props) => <CustomDrawerItem label="Add Students" {...props} />
        }} 
      />
      <Drawer.Screen 
        name="AdminEditStudents" 
        component={AdminEditStudents} 
        options={{ 
          drawerItem: (props) => <CustomDrawerItem label="Edit Students" {...props} />
        }} 
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
