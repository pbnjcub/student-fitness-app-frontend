import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import StudentCard from '../cards/StudentCard';

const ListStudents = ({ students, columnCount, cardWidth = 300, handleCardClick }) => {
  const renderStudentCard = ({ item }) => (
    <StudentCard
      student={item}
      cardWidth={cardWidth}
      onCardPress={() => handleCardClick(item)} // Pass the student object to handleCardClick
    />
  );

  return (
    <FlatList
      data={students}
      renderItem={renderStudentCard}
      keyExtractor={(item) => item.id.toString()}
      numColumns={columnCount}
      key={columnCount} // Ensure FlatList re-renders when column count changes
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingBottom: 20,
  },
});

export default ListStudents;
