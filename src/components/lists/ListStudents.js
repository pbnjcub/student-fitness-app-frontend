import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ListStudents = ({ students }) => {
  return (
    <View style={styles.container}>
      {students.length > 0 ? (
        students.map((student) => (
          <View key={student.id} style={styles.card}>
            {/* Student photo */}
            <View style={styles.photoContainer}>
              {student.photoUrl ? (
                <Image source={{ uri: student.photoUrl }} style={styles.photo} />
              ) : (
                <View style={styles.placeholderContainer}>
                  <Text style={styles.placeholderText}>Student Photo</Text>
                </View>
              )}
            </View>

            {/* Student info */}
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{`${student.firstName} ${student.lastName}`}</Text>

              {/* Safe access for gradYear */}
              <Text style={styles.details}>
                Graduation Year: {student.studentDetails?.gradYear || 'N/A'}
              </Text>

              <Text style={styles.details}>Email: {student.email}</Text>
              <Text style={styles.details}>
                Gender Identity: {student.genderIdentity || 'Not specified'}
              </Text>
              <Text style={styles.details}>Pronouns: {student.pronouns || 'N/A'}</Text>

              {/* Dummy anthropometric data */}
              <Text style={styles.details}>Weight: 70kg (dummy)</Text>
              <Text style={styles.details}>Height: 180cm (dummy)</Text>
            </View>
          </View>
        ))
      ) : (
        <Text>No students to display.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  photoContainer: {
    marginRight: 10,
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
    fontSize: 12,
    color: '#888',
  },
  infoContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
});

export default ListStudents;
