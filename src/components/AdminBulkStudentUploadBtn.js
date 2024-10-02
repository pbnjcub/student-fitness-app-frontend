import React, { useState } from 'react';
import { View, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { uploadCSV } from '../actions/admin';
import { showAlert } from '../utilities/alertUtil';
import MainBtn from './btns/MainBtn';

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
    // Upload document logic here
  };

  return (
    <View>
      {selectedFile ? (
        <View>
          <Text>{selectedFile.name}</Text>
          <MainBtn label="Confirm and Upload" onPress={uploadDocument} />
          <MainBtn label="Cancel" onPress={() => setSelectedFile(null)} />
        </View>
      ) : (
        <MainBtn label="Bulk Upload Students" onPress={pickDocument} />
      )}
    </View>
  );
};

export default BulkStudentUploadBtn;
