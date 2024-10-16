import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const StudentCard = ({ student }) => {
  const { name, gradeLevel, sectionCode, weight, height, photoUrl } = student;

  return (
    <View style={styles.cardContainer}>
      {/* Student Photo or Placeholder */}
      {photoUrl ? (
        <Image source={{ uri: photoUrl }} style={styles.photo} />
      ) : (
        <View style={styles.photoPlaceholder}>
          <Text style={styles.photoPlaceholderText}>Student Photo</Text>
        </View>
      )}

      {/* Student Info */}
      <View style={styles.infoContainer}>
        {/* Student Name and Section */}
        <Text style={styles.studentName}>{name}</Text>
        <Text style={styles.gradeLevel}>Grade: {gradeLevel}</Text>
        <Text style={styles.sectionCode}>Section: {sectionCode}</Text>

        {/* Anthro Data */}
        <View style={styles.anthroContainer}>
          <Text style={styles.anthroText}>Weight: {weight} kg</Text>
          <Text style={styles.anthroText}>Height: {height} cm</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  photoPlaceholderText: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gradeLevel: {
    fontSize: 16,
    marginTop: 4,
  },
  sectionCode: {
    fontSize: 16,
    marginTop: 4,
  },
  anthroContainer: {
    marginTop: 10,
  },
  anthroText: {
    fontSize: 14,
    color: '#555',
  },
});

export default StudentCard;
