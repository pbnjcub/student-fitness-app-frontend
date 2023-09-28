import React from 'react';
import { Button, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { uploadCSV } from '../actions/admin'; // Importing the action

const BulkStudentUploadBtn = ({ onUploadSuccess, onUploadError }) => {
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'text/csv' });

      if (result.type === 'cancel') {
        console.log('User cancelled the document picker');
        return;
      }

      const serverResponse = await uploadCSV(result); // Using the uploadCSV action
      console.log('Server Response:', serverResponse);
      
      onUploadSuccess(serverResponse); // Notify parent component of the successful upload

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the document picker');
      } else {
        console.error('File pick or upload error: ', err);
        onUploadError(err); // Notify parent component of the error
      }
    }
  };

  return <Button title="Bulk Upload Students" onPress={pickDocument} />;
};

export default BulkStudentUploadBtn;
