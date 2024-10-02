import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';

// import { UserContext } from '../context/UserContext';
import { getAllStudents } from '../actions/admin';

const StudentSearch = () => {
//   const { loading } = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  
  // Load all students (or you might want to load as user types, depending on your use case and data size)
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const allStudents = await getAllStudents();
        setStudents(allStudents);
      } catch (error) {
        console.error('Failed to load students', error);
      }
    };

    loadStudents();
  }, []);

  // Filter students when the search term changes
  useEffect(() => {
    const filtered = students.filter((student) =>
      student.firstName.toLowerCase().includes(search.toLowerCase()) || 
      student.lastName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [search, students]);

  // Render Student Item
  const renderStudentItem = ({ item }) => (
    <View>
      <Text>{item.firstName} {item.lastName}</Text>
      <Button title="Add" onPress={() => handleAddClick(item)} />
    </View>
  );

  // Handle Add Click
  const handleAddClick = (student) => {
    setSelectedStudents([...selectedStudents, student]);
  };

  return (
    <View>
      <TextInput
        placeholder="Search by Name"
        value={search}
        onChangeText={setSearch}
      />
      {loading && <ActivityIndicator />}
      {!loading && (
        <FlatList
          data={filteredStudents}
          renderItem={renderStudentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default StudentSearch;
