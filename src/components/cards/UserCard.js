import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserCard = ({ user, cardWidth = 300 }) => (
  <View style={[styles.infoContainer, { width: cardWidth }]}>
    <View style={styles.photoContainer}>
      {user.photoUrl ? (
        <Image source={{ uri: user.photoUrl }} style={styles.photo} />
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>User Photo</Text>
        </View>
      )}
    </View>
    <View style={styles.info}>
      <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
      <Text style={styles.details}>
        <Text style={styles.label}>Email:</Text> {user.email}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  infoContainer: {
    paddingVertical: 10, // Adjust padding to match the StudentCard
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
    justifyContent: 'center', // Ensures vertical alignment
    display: 'flex',
  },
  placeholderText: {
    color: '#888',
    textAlign: 'center', // Ensure the text is centered horizontally
  },
  info: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', // Match styling with StudentCard component
  },
  details: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5, // Consistent spacing
  },
  label: {
    fontWeight: 'bold', // Consistent styling for labels
    color: '#333',
  },
});

export default UserCard;
