import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import MainBtn from '../btns/MainBtn'; // Import MainBtn component

const ModalTemplateA = ({
  isVisible,
  title,
  column1 = { labels: [], values: [] },  // Props for the first column
  column2 = { labels: [], values: [] },  // Props for the second column
  footer,
  photo,
  toolbarActions,
  onClose,
  animationType = "slide",
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={animationType}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header Section */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>

            <View style={styles.headerActions}>
              {toolbarActions && toolbarActions.length > 0 && (
                <View style={styles.toolbar}>
                  {toolbarActions.map((action, index) => (
                    <MainBtn
                      key={index}
                      label={action.label}
                      onPress={action.onPress}
                      style={styles.actionButton}
                    />
                  ))}
                </View>
              )}
              <MainBtn
                label="Close"
                onPress={onClose}
                style={styles.closeButton}
              />
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
            <View style={styles.columnsContainer}>
              {/* First Column: Passed as props */}
              <View style={styles.column}>
                {column1.labels.map((label, index) => (
                  <View key={index} style={styles.labelValueRow}>
                    <Text style={styles.label}>{label}:</Text>
                    <Text style={styles.value}>{column1.values[index] || 'N/A'}</Text>
                  </View>
                ))}
              </View>

              {/* Second Column: Passed as props */}
              <View style={styles.column}>
                {column2.labels.map((label, index) => (
                  <View key={index} style={styles.labelValueRow}>
                    <Text style={styles.label}>{label}:</Text>
                    <Text style={styles.value}>{column2.values[index] || 'N/A'}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Footer Section */}
          {footer && <View style={styles.modalFooter}>{footer}</View>}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    marginRight: 10,
  },
  actionButton: {
    marginHorizontal: 5,
  },
  closeButton: {
    fontSize: 16,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  modalBody: {
    paddingVertical: 10,
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  labelValueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    color: '#555',
  },
  modalFooter: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
});

export default ModalTemplateA;
