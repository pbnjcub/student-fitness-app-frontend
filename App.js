import React from 'react';
import 'react-native-gesture-handler'; 
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator'; // Import AppNavigator
import { AdminProvider } from './src/contexts/AdminContext'; // Import AdminProvider

export default function App() {
  return (
    <PaperProvider>
      <AdminProvider>
        <AppNavigator /> {/* Use AppNavigator here */}
      </AdminProvider>
    </PaperProvider>
  );
}
