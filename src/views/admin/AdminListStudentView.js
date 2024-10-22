import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, CheckBox, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import MainBtn from '../../components/btns/MainBtn';
import TextField from '../../components/forms/TextField'; // Import your TextField component
import { getAllStudents } from '../../actions/admin';
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

  const calculateColumnCount = () => {
    const availableWidth = screenWidth - 20; 
    return Math.max(1, Math.floor(availableWidth / CARD_WIDTH));
  };

  const columnCount = calculateColumnCount();

  useEffect(() => {
    const handleResize = ({ window }) => {
      setScreenWidth(window.width);
    };

    Dimensions.addEventListener('change', handleResize);

    return () => {
      Dimensions.removeEventListener('change', handleResize);
    };
  }, []);

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const fetchStudents = async (page = 1) => {
    try {
      setLoading(true);
      const fetchedStudents = await getAllStudents({
        page,
        limit: STUDENTS_PER_PAGE,
        searchText,
        graduationYear: selectedGradYear,
        sectionCode,
        showArchived,
      });

      if (fetchedStudents.errors) {
        console.error('Error fetching students:', fetchedStudents.errors);
        setStudents([]);
        setFilteredStudents([]);
        setTotalPages(1);
      } else {
        setStudents(fetchedStudents.students);
        setFilteredStudents(fetchedStudents.students);
        setTotalPages(fetchedStudents.totalPages);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchStudents(1);
  };

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
      <View style={styles.searchRow}>
        <TextField
          value={searchText}          // Pass the searchText state
          placeholder="Search by first, last or full name"
          onChange={setSearchText}    // Update searchText when the input changes
        />
        <MainBtn
          label="Search"
          onPress={handleSearch}
          style={styles.searchButton}
        />
      </View>
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

      <View style={styles.pagination}>
        <MainBtn
          label="Previous"
          onPress={() => handlePageChange(currentPage - 1)}
          style={[styles.pageButton, currentPage <= 1 && styles.disabledButton]}
          textColor={currentPage <= 1 ? '#000000' : undefined}
          disabled={currentPage <= 1}
        />

        {[...Array(totalPages).keys()].map((_, index) => (
          <MainBtn
            key={index}
            label={(index + 1).toString()}
            onPress={() => handlePageChange(index + 1)}
            style={
              currentPage === index + 1
                ? [styles.activePageButton, styles.activePageText]
                : styles.pageButton
            }
            textColor={currentPage === index + 1 ? '#000000' : undefined}
          />
        ))}

        <MainBtn
          label="Next"
          onPress={() => handlePageChange(currentPage + 1)}
          style={[styles.pageButton, currentPage >= totalPages && styles.disabledButton]}
          textColor={currentPage >= totalPages ? '#000000' : undefined}
          disabled={currentPage >= totalPages}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchButton: {
    // You can style your search button here
  },
  input: {
    borderWidth: 1,
    padding: 8,
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
    backgroundColor: '#FFFFFF',
  },
  activePageButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
  },
  activePageText: {
    color: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AdminListStudentView;
