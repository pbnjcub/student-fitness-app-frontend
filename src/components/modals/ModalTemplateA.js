import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const ModalTemplateA = ({ isVisible, title, body, footer, photo, toolbarActions, onClose, animationType = "slide" }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={animationType}
      onRequestClose={onClose}  // Handle back button press on Android
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header Section */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>

            <View style={styles.headerActions}>
              {/* Toolbar actions */}
              {toolbarActions && (
                <View style={styles.toolbar}>
                  {toolbarActions.map((action, index) => (
                    <TouchableOpacity key={index} onPress={action.onPress} style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>{action.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              {/* Close Button */}
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Optional Photo */}
          {photo && (
            <View style={styles.photoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
            </View>
          )}

          {/* Body Section */}
          <ScrollView contentContainerStyle={styles.modalBody}>
            {body}
          </ScrollView>

          {/* Footer Section */}
          {footer && (
            <View style={styles.modalFooter}>
              {footer}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbar: {
    flexDirection: 'row',
    marginRight: 10,  // Spacing between toolbar and close button
  },
  actionButton: {
    marginHorizontal: 5, // Spacing between action buttons
  },
  actionButtonText: {
    color: 'blue',
    fontSize: 14,
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,  // Circular photo
  },
  modalBody: {
    paddingVertical: 10,
  },
  modalFooter: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
});

export default ModalTemplateA;
