import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { uploadStudent } from '../actions/admin'; // Adjust import to your project structure
import { showAlert } from '../utilities/alertUtil';
import BulkStudentUploadBtn from './AdminBulkStudentUploadBtn'; // Adjust the path accordingly

import { useAdminContext } from '../contexts/AdminContext'; // Adjust the import to your file structure

const AddStudents = ({ onUploadSuccess, onUploadError }) => {
    const {students, setStudents, addStudent, addMultipleStudents } = useAdminContext();

    const [newStudent, setNewStudent] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        gradYear: '',
        // other fields...
    })

    const navigation = useNavigation(); // Navigation hook from react-navigation

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
            navigation.goBack(); // Navigate back after successful upload
        } catch (err) {
            console.error('Student upload error: ', err);
            showAlert('Upload Error', err.message || 'An unexpected error occurred during upload.');
        }
    };

    const handleCancel = () => {
        navigation.goBack(); // Navigate back when cancel is pressed
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

        <View style={styles.container}>
            <Text style={styles.headerText}>Add a New Student Here:</Text>
            <TextInput
                placeholder="Email"
                value={newStudent.email}
                onChangeText={(text) => handleChange('email', text)}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                // Add Basic Email Validation
                onBlur={() => {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(newStudent.email)) {
                        // Handle Invalid Email
                        showAlert('Invalid Email', 'Please enter a valid email address');
                    }
                }}
            />
            <TextInput
                placeholder="First Name"
                value={newStudent.firstName}
                onChangeText={(text) => handleChange('firstName', text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Last Name"
                value={newStudent.lastName}
                onChangeText={(text) => handleChange('lastName', text)}
                style={styles.input}
            />
            <TextInput
                placeholder="YYYY-MM-DD"
                value={newStudent.birthDate}
                onChangeText={(text) => handleChange('birthDate', text)}
                style={styles.input}
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
                style={styles.input}
                keyboardType="numeric"
                onBlur={() => {
                    if (isNaN(newStudent.gradYear) || newStudent.gradYear.length !== 4) {
                        // Handle Invalid Graduating Year
                    }
                }}
            />
            <View style={styles.buttonContainer}>
                <View style={styles.submitBtn}>
                    <Button title="Submit" onPress={handleAddStudent} />
                </View>
                <View style={styles.cancelBtn}> {/* Added cancelBtn for symmetry, even if it doesn't have additional styles */}
                    <Button title="Cancel" onPress={handleCancel} />
                </View>
            </View>
            <View style={styles.horizontalLine} />
            <Text style={styles.headerText}>Bulk Upload Students by CSV File Here:</Text>
            <View style={styles.bulkUploadContainer}>
                <BulkStudentUploadBtn
                    onUploadSuccess={handleUploadSuccess}
                    onUploadError={handleUploadError}
                    style={styles.bulkUploadBtn}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 24, // or another size that suits your design
        fontWeight: 'bold', // makes the text bold
        color: 'black', // or another color that suits your design
        marginVertical: 10, // optional: to give vertical spacing
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10, // Adjust as necessary
    },
    bulkUploadBtn: {
        marginTop: 10, // Adjust as necessary
    },
    bulkUploadContainer: {
        width: 200,
        justifyContent: 'flex-start',
        marginTop: 10, // Adjust as necessary
    },
    submitBtn: {
        marginRight: 30, // Adjust as necessary
    },
    horizontalLine: {
        height: 1, // or 2, depending on how thick you want it
        backgroundColor: 'gray', // or any color you prefer
        marginVertical: 10, // Adjust as necessary for spacing
    }

});

export default AddStudents;
