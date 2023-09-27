// import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
// import React from 'react';
import Home from './components/Home';
import StudentsDashboard from './components/StudentsDashboard';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';


// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} options={{ title: 'Home' }} />
        <Drawer.Screen name="StudentsDashboard" component={StudentsDashboard} options={{ title: 'Student Dashboard' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
