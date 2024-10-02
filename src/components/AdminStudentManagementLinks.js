import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // import useNavigation hook
import globalStyles from '../styles/globalStyles';

const StudentManagementLinks = () => {
    const navigation = useNavigation();
  
    return (
        <View style={globalStyles.linksContainer}>
          <TouchableOpacity 
              onPress={() => navigation.navigate('AdminAddStudents')} 
              style={globalStyles.button}
          >
            <Text style={globalStyles.buttonText}>Add Student or Bulk Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity 
              onPress={() => navigation.navigate('AdminEditStudents')} 
              style={globalStyles.button}
          >
            <Text style={globalStyles.buttonText}>Edit Student</Text>
          </TouchableOpacity>
        </View>
      );
    };
    
    export default StudentManagementLinks;