import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserCard = ({ user }) => (
  <View style={styles.infoContainer}>
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
    paddingVertical: 10, // Match the StudentCard padding for consistency
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
    color: '#888',
    textAlign: 'center',
  },
  info: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
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

export default UserCard;
