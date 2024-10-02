// import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

const Home = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to EduFit</Text>
      <Text>What is EduFit?</Text>
      <Text>EduFit is an application that allows Health & Wellness teachers to dynamically track their students' progress.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default Home;
