import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { uploadCSV } from '../actions/admin';
import { showAlert } from '../utilities/alertUtil';

const BulkStudentUploadBtn = ({ onUploadSuccess, onUploadError }) => {
    const [selectedFile, setSelectedFile] = useState(null);
  
    const pickDocument = async () => {
      try {
        const { assets } = await DocumentPicker.getDocumentAsync({ type: 'text/csv' });
  
        if (!assets || assets.length === 0) {
          showAlert('No File Selected', 'Please select a file to upload.');
          return;
        }
        
        setSelectedFile(assets[0]);
      } catch (err) {
        showAlert('Error', 'An error occurred while picking the document.');
      }
    };
  
    const uploadDocument = async () => {
      try {
        const { uri, name, mimeType } = selectedFile;
        
        const fileUri = await FileSystem.getContentUriAsync(uri);
        const blob = await fetch(fileUri).then(response => response.blob());
        
        const formData = new FormData();
        formData.append('file', blob, name);
        
        const serverResponse = await uploadCSV({ uri: fileUri, name, type: mimeType, blob });
        
        onUploadSuccess(serverResponse);
        setSelectedFile(null); // Reset selected file after upload
      } catch (err) {
        console.error('File upload error: ', err);
        showAlert('Upload Error', err.message || 'An unexpected error occurred during upload.');
        onUploadError(err);
      }
    };
  
    return (
      <View>
        {selectedFile ? (
          <View>
            <Text>{selectedFile.name}</Text>
            <Button title="Confirm and Upload" onPress={uploadDocument} />
            <Button title="Cancel" onPress={() => setSelectedFile(null)} />
          </View>
        ) : (
          <Button title="Bulk Upload Students" onPress={pickDocument} />
        )}
      </View>
    );
  };
  
  export default BulkStudentUploadBtn;