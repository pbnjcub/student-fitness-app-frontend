import React from 'react';
import { View, Text } from 'react-native';

const Home = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to FitCademia</Text>
      <Text>What is FitCademia</Text>
      <Text>FitCademia is an application that allows Health & Wellness teachers to dynamically track their students' progress.</Text>
    </View>
  );
}

export default Home;
