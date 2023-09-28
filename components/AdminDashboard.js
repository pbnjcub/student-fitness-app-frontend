import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAllStudents } from '../actions/students'; // Adjust the import path accordingly.

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // to track the loading state

  useEffect(() => {
    getAllStudents()
      .then(data => {
        console.log(data)
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setStudents(data);
        }
        setIsLoading(false); // set loading to false once data is fetched
      })
      .catch(err => {
        setErrors('An error occurred');
        setIsLoading(false); // set loading to false once data is fetched
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name} - {item.gradeYear}</Text> {/* Adjust according to the actual structure of your data */}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoading && <Text>Loading...</Text>}
      {errors && <Text>Error: {errors}</Text>}
      {!isLoading && !errors && (
        <FlatList
          data={students}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()} // Adjust according to the actual structure of your data
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AdminDashboard;
