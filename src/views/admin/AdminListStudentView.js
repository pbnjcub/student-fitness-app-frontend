import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, CheckBox, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import MainBtn from '../../components/btns/MainBtn';
import { getAllStudents } from '../../actions/admin'; // Update your backend to accept page and limit parameters
import ListStudents from '../../components/lists/ListStudents';

const AdminListStudentView = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedGradYear, setSelectedGradYear] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [sectionCode, setSectionCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const CARD_WIDTH = 300;
  const STUDENTS_PER_PAGE = 24;
  
  // Calculate number of columns based on screen width
  const calculateColumnCount = () => {
    const availableWidth = screenWidth - 20; // Account for spacing/margins
    return Math.max(1, Math.floor(availableWidth / CARD_WIDTH));
  };
  const columnCount = calculateColumnCount();

  // Set up a listener to handle screen resizing
  useEffect(() => {
    const handleResize = ({ window }) => {
      setScreenWidth(window.width);
    };

    Dimensions.addEventListener('change', handleResize);

    return () => {
      Dimensions.removeEventListener('change', handleResize);
    };
  }, []);

  // Fetch students when component mounts
  useEffect(() => {
    const fetchStudents = async (page = 1) => {
      try {
        setLoading(true);
        const fetchedStudents = await getAllStudents(page, STUDENTS_PER_PAGE); // Assume your API supports page and limit parameters
        setStudents(fetchedStudents.students); // Update the list of students
        setTotalPages(fetchedStudents.totalPages); // Set the total number of pages based on server response
        setFilteredStudents(fetchedStudents.students);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents(currentPage);
  }, [currentPage]);

  // Function to filter students based on criteria
  useEffect(() => {
    const filtered = students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`;
      return (
        fullName.toLowerCase().includes(searchText.toLowerCase()) &&
        (!selectedGradYear || student.studentDetails?.gradYear === parseInt(selectedGradYear)) &&
        (!sectionCode || (student.sectionCode && student.sectionCode.includes(sectionCode))) &&
        (showArchived || !student.isArchived)
      );
    });
    setFilteredStudents(filtered);
  }, [searchText, selectedGradYear, showArchived, sectionCode, students]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name"
        value={searchText}
        onChangeText={setSearchText}
      />
      <Text>Filter by Graduation Year:</Text>
      <TextInput
        style={styles.input}
        placeholder="Graduation Year"
        value={selectedGradYear}
        onChangeText={(value) => setSelectedGradYear(value.trim())}
        keyboardType="numeric"
      />
      <Text>Filter by Section Code:</Text>
      <TextInput
        style={styles.input}
        placeholder="Section Code"
        value={sectionCode}
        onChangeText={(value) => setSectionCode(value.trim())}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox value={showArchived} onValueChange={setShowArchived} />
        <Text>Show Archived Students</Text>
      </View>

      <ListStudents students={filteredStudents} columnCount={columnCount} cardWidth={CARD_WIDTH} />

      {/* Pagination Controls */}
      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={currentPage <= 1}
          onPress={() => handlePageChange(currentPage - 1)}
        >
          <Text style={[styles.pageButton, currentPage <= 1 && styles.disabledButton]}>Previous</Text>
        </TouchableOpacity>

        {[...Array(totalPages).keys()].map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePageChange(index + 1)}
          >
            <Text style={[
              styles.pageButton,
              currentPage === index + 1 && styles.activePageButton
            ]}>
              {index + 1}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          disabled={currentPage >= totalPages}
          onPress={() => handlePageChange(currentPage + 1)}
        >
          <Text style={[styles.pageButton, currentPage >= totalPages && styles.disabledButton]}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  pageButton: {
    marginHorizontal: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  disabledButton: {
    opacity: 0.3,
  },
  activePageButton: {
    backgroundColor: '#cce7ff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdminListStudentView;
