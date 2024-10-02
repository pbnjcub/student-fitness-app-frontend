import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { uploadStudent } from '../../actions/admin';
import { showAlert } from '../../utilities/alertUtil';
import BulkStudentUploadBtn from '../../components/AdminBulkStudentUploadBtn';
import { useAdminContext } from '../../contexts/AdminContext';
import GlobalStyles from '../../styles/globalStyles';

const AdminAddStudents = ({ onUploadSuccess, onUploadError }) => {
    const { addStudent, addMultipleStudents } = useAdminContext();
    const navigation = useNavigation();

    const [newStudent, setNewStudent] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        gradYear: '',
    });

    const handleChange = (name, value) => {
        let updatedStudent = { ...newStudent, [name]: value };
        if(name === 'firstName' || name === 'lastName') {
            const { firstName, lastName } = updatedStudent;
            updatedStudent.password = `${(firstName || '').toLowerCase()}${(lastName || '').toLowerCase()}`;
        }
        setNewStudent(updatedStudent);
    };

    const handleAddStudent = async () => {
        try {
            const serverResponse = await uploadStudent(newStudent);
            addStudent(serverResponse)
            showAlert('Success', 'Student is successfully added.');
            navigation.goBack();
        } catch (err) {
            console.error('Student upload error: ', err);
            showAlert('Upload Error', err.message || 'An unexpected error occurred during upload.');
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    const handleUploadSuccess = async (data) => {
        if (data.newStudents && data.newStudents.length > 0) {
            addMultipleStudents(data.newStudents);
        }
        showAlert('Success', 'File uploaded and processed successfully.');
    };

    const handleUploadError = (error) => {
        showAlert('Error', 'File upload failed. Please try again.');
    };

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.headerText}>Add a New Student Here:</Text>

            <TextInput
                placeholder="Email"
                value={newStudent.email}
                onChangeText={(text) => handleChange('email', text)}
                style={GlobalStyles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={() => {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(newStudent.email)) {
                        showAlert('Invalid Email', 'Please enter a valid email address');
                    }
                }}
            />
            <TextInput
                placeholder="First Name"
                value={newStudent.firstName}
                onChangeText={(text) => handleChange('firstName', text)}
                style={GlobalStyles.input}
            />
            <TextInput
                placeholder="Last Name"
                value={newStudent.lastName}
                onChangeText={(text) => handleChange('lastName', text)}
                style={GlobalStyles.input}
            />
            <TextInput
                placeholder="YYYY-MM-DD"
                value={newStudent.birthDate}
                onChangeText={(text) => handleChange('birthDate', text)}
                style={GlobalStyles.input}
                onBlur={() => {
                    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
                    if (!datePattern.test(newStudent.birthDate)) {
                        showAlert('Invalid Date Format', 'Please enter date in YYYY-MM-DD format');
                    }
                }}
            />
            <TextInput
                placeholder="Graduating Year"
                value={newStudent.gradYear}
                onChangeText={(text) => handleChange('gradYear', text)}
                style={GlobalStyles.input}
                keyboardType="numeric"
                onBlur={() => {
                    if (isNaN(newStudent.gradYear) || newStudent.gradYear.length !== 4) {
                        showAlert('Invalid Year', 'Please enter a valid Graduating Year');
                    }
                }}
            />
            <View style={GlobalStyles.buttonContainer}>
                <View style={GlobalStyles.submitBtn}>
                    <Button title="Submit" onPress={handleAddStudent} />
                </View>
                <View>
                    <Button title="Cancel" onPress={handleCancel} />
                </View>
            </View>

            <View style={GlobalStyles.horizontalLine} />
            <Text style={GlobalStyles.headerText}>Bulk Upload Students by CSV File Here:</Text>
            <View style={GlobalStyles.bulkUploadContainer}>
                <BulkStudentUploadBtn
                    onUploadSuccess={handleUploadSuccess}
                    onUploadError={handleUploadError}
                    style={GlobalStyles.bulkUploadBtn}
                />
            </View>
        </View>
    );
};

export default AdminAddStudents;
