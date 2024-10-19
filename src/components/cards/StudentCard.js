import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserCard from './UserCard';

const StudentCard = ({ student, cardWidth }) => (
  <View style={[styles.card, { width: cardWidth }]}>
    {/* User Information (from UserCard) */}
    <View style={styles.userInfoContainer}>
      <UserCard user={student} cardWidth={cardWidth} />
    </View>

    {/* Additional Student-Specific Information */}
    <View style={styles.additionalInfoContainer}>
      <Text style={styles.details}>
        <Text style={styles.label}>Graduation Year:</Text> {student.studentDetails?.gradYear || 'N/A'}
      </Text>
      <Text style={styles.details}>
        <Text style={styles.label}>Section Code:</Text> {student.sectionCode || 'Unrostered'}
      </Text>
      <Text style={styles.details}>
        <Text style={styles.label}>Gender Identity:</Text> {student.genderIdentity || 'Not specified'}
      </Text>
      <Text style={styles.details}>
        <Text style={styles.label}>Pronouns:</Text> {student.pronouns || 'N/A'}
      </Text>
      <Text style={styles.details}>
        <Text style={styles.label}>Weight:</Text> 70kg (dummy)
      </Text>
      <Text style={styles.details}>
        <Text style={styles.label}>Height:</Text> 180cm (dummy)
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
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
    borderColor: 'transparent',
  },
  userInfoContainer: {
    marginBottom: 10, // Create spacing between user info and additional info
  },
  additionalInfoContainer: {
    paddingHorizontal: 10,
  },
  details: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default StudentCard;
