import React from 'react';
import { Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { uploadCSV } from '../actions/admin';
import { showAlert } from '../utilities/alertUtil';

const BulkStudentUploadBtn = ({ onUploadSuccess, onUploadError }) => {
  const pickDocument = async () => {
    try {
      const { assets } = await DocumentPicker.getDocumentAsync({ type: 'text/csv' });
      
      // Debugging log to check if the document is picked and assets are received properly
      console.log('DocumentPicker Assets:', assets); 

      if (!assets || assets.length === 0) {
        console.log('User cancelled the document picker or no file was selected');
        showAlert('No File Selected', 'Please select a file to upload.');
        return;
      }

      const { uri, name, mimeType } = assets[0];
      
      // Debugging log to check the values received from the picked document
      console.log('Document URI:', uri);
      console.log('Document Name:', name);
      console.log('Document Type:', mimeType);
      
      // Converting the file URI to Blob
      const fileUri = await FileSystem.getContentUriAsync(uri);
      const blob = await fetch(fileUri).then(response => response.blob());
      
      // Debugging log to check if blob is created properly
      console.log('Blob:', blob);

      const formData = new FormData();
      formData.append('file', blob, name);
      
      // Debugging log to check FormData entries
      console.log('FormData Entries:', [...formData.entries()]);
      
      const serverResponse = await uploadCSV({ uri: fileUri, name, type: mimeType, blob });
      
      console.log('Server Response:', serverResponse); // Debugging log to check the server response
      
      onUploadSuccess(serverResponse);
    } catch (err) {
      console.error('File pick or upload error: ', err); // Debugging log for any errors during the process
      showAlert('Upload Error', err.message || 'An unexpected error occurred during upload.');
      onUploadError(err);
    }
  };

  return <Button title="Bulk Upload Students" onPress={pickDocument} />;
};

export default BulkStudentUploadBtn;
