// ModalTemplateA.js
import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import MainBtn from '../btns/MainBtn';
import ModalTemplateAUserDataView from './views/ModalTemplateAUserDataView';
import ModalTemplateAUserDataForm from './forms/ModalTemplateAUserDataForm';

const ModalTemplateA = ({
    isVisible,
    title,
    column1 = { labels: [], values: [] },
    column2 = { labels: [], values: [] },
    onSave,
    photo,
    toolbarActions,
    onClose,
    animationType = "slide",
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeToolbarButton, setActiveToolbarButton] = useState(null);
  
    const handleEdit = () => {
      setIsEditing(true);
      setActiveToolbarButton('Edit User Data');
    };
  
    const handleSave = (updatedData) => {
      onSave(updatedData);
      setIsEditing(false);
      setActiveToolbarButton(null);
    };
  
    const handleCancel = () => {
      setIsEditing(false);
      setActiveToolbarButton(null);
    };
  
    const handleClose = () => {
      setIsEditing(false); // Reset to default view
      setActiveToolbarButton(null);
      onClose();
    };
  
    const initialValues = column1.labels.reduce((acc, label, index) => {
      acc[label] = column1.values[index] || '';
      return acc;
    }, {});
  
    return (
      <Modal
        visible={isVisible}
        transparent={true}
        animationType={animationType}
        onRequestClose={handleClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
              <View style={styles.headerActions}>
                {toolbarActions && toolbarActions.length > 0 && (
                  <View style={styles.toolbar}>
                    {toolbarActions.map((action, index) => (
                      <MainBtn
                        key={index}
                        label={action.label}
                        onPress={() => {
                          action.onPress();
                          if (action.label === 'Edit User Data') handleEdit();
                        }}
                        isActive={activeToolbarButton === action.label}
                        style={styles.actionButton}
                      />
                    ))}
                  </View>
                )}
                <MainBtn label="Close" onPress={handleClose} style={styles.closeButton} />
              </View>
            </View>
  
            {photo && (
              <View style={styles.photoContainer}>
                <Image source={{ uri: photo }} style={styles.photo} />
              </View>
            )}
  
            <ScrollView contentContainerStyle={styles.modalBody}>
              <View style={styles.columnsContainer}>
                <View style={styles.column}>
                  {isEditing ? (
                    <ModalTemplateAUserDataForm
                      initialValues={initialValues}
                      onSave={handleSave}
                      onCancel={handleCancel}
                    />
                  ) : (
                    <ModalTemplateAUserDataView labels={column1.labels} values={column1.values} />
                  )}
                </View>
                <View style={styles.column}>
                  <ModalTemplateAUserDataView labels={column2.labels} values={column2.values} />
                </View>
              </View>
            </ScrollView>
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
});

export default ModalTemplateA;
