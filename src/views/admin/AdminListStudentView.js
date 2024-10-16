import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, CheckBox, ActivityIndicator } from 'react-native';
import ListStudents from '../../components/lists/ListStudents';
import MainBtn from '../../components/btns/MainBtn'; // Assuming this is your button component
import { getAllStudents } from '../../actions/admin'; // Import your getAllStudents function

const AdminListStudentView = () => {
  const [students, setStudents] = useState([]); // All students
  const [filteredStudents, setFilteredStudents] = useState([]); // Filtered students
  const [searchText, setSearchText] = useState('');
  const [selectedGradYear, setSelectedGradYear] = useState(null); // Filter by graduation year
  const [showArchived, setShowArchived] = useState(false);
  const [sectionCode, setSectionCode] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch students when component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const fetchedStudents = await getAllStudents(); // Call API to get students
        console.log('Fetched students:', fetchedStudents);
        setStudents(fetchedStudents); // Set all students
        setFilteredStudents(fetchedStudents); // Set filtered students initially to all students
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false); // Hide loading spinner
      }
    };

    fetchStudents();
  }, []);

  // Function to filter students based on search, graduation year, section code, and archived status
  useEffect(() => {
    let filtered = students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`;
      return (
        fullName.toLowerCase().includes(searchText.toLowerCase()) &&
        (!selectedGradYear || (student.studentDetails && student.studentDetails.gradYear === parseInt(selectedGradYear))) &&
        (!sectionCode || student.sectionCode === sectionCode) &&
        (showArchived || !student.isArchived)
      );
    });
    setFilteredStudents(filtered);
  }, [searchText, selectedGradYear, showArchived, sectionCode, students]);

  // Render loading spinner if data is being fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <TextInput
        style={styles.input}
        placeholder="Search by name"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      {/* Filter by graduation year */}
      <Text>Filter by Graduation Year:</Text>
      <TextInput
        style={styles.input}
        placeholder="Graduation Year"
        value={selectedGradYear}
        onChangeText={(text) => setSelectedGradYear(text)}
      />

      {/* Filter by section code */}
      <Text>Filter by Section Code:</Text>
      <TextInput
        style={styles.input}
        placeholder="Section Code"
        value={sectionCode}
        onChangeText={(text) => setSectionCode(text)}
      />

      {/* Show archived students */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={showArchived}
          onValueChange={setShowArchived}
        />
        <Text>Show Archived Students</Text>
      </View>

      {/* ListStudents component */}
      <ListStudents students={filteredStudents} />

      {/* Pagination buttons (example, could be made more dynamic) */}
      <View style={styles.pagination}>
        <MainBtn label="Previous" onPress={() => {}} />
        <MainBtn label="1" onPress={() => {}} />
        <MainBtn label="2" onPress={() => {}} />
        <MainBtn label="Next" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdminListStudentView;
