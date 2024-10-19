import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const ListStudents = ({ students, columnCount, cardWidth = 300 }) => {
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const renderStudentCard = ({ item }) => (
    <View
      style={[
        styles.card,
        { width: cardWidth },
        hoveredCardId === item.id ? styles.cardHovered : null,
      ]}
      onMouseEnter={() => setHoveredCardId(item.id)}
      onMouseLeave={() => setHoveredCardId(null)}
    >
      <View style={styles.photoContainer}>
        {item.photoUrl ? (
          <Image source={{ uri: item.photoUrl }} style={styles.photo} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Student Photo</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{`${item.firstName} ${item.lastName}`}</Text>
        <Text style={styles.details}>
          <Text style={styles.label}>Graduation Year:</Text> {item.studentDetails?.gradYear || 'N/A'}
        </Text>
        <Text style={styles.details}>
          <Text style={styles.label}>Email:</Text> {item.email}
        </Text>
        <Text style={styles.details}>
          <Text style={styles.label}>Gender Identity:</Text> {item.genderIdentity || 'Not specified'}
        </Text>
        <Text style={styles.details}>
          <Text style={styles.label}>Pronouns:</Text> {item.pronouns || 'N/A'}
        </Text>
        <Text style={styles.details}>
          <Text style={styles.label}>Weight:</Text> 70kg (dummy)
        </Text>
        <Text style={styles.details}>
          <Text style={styles.label}>Height:</Text> 180cm (dummy)
        </Text>
        <Text style={styles.details}>
          <Text style={styles.label}>Section:</Text> {item.sectionCode  || 'Unrostered'}
        </Text>
      </View>
    </View>
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
  card: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent', // Default border color
  },
  cardHovered: {
    borderColor: '#074986', // Border color on hover
  },
  photoContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  placeholderContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 14, // Increased font size for better visibility
    color: '#888',
    textAlign: 'center', // Center the text within the placeholder
  },
  infoContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 18, // Kept a larger font size for the name
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 12, // Smaller font size for details
    color: '#555',
    marginBottom: 2,
  },
  label: {
    fontStyle: 'italic', // Italicized label for headings
  },
});

export default ListStudents;
