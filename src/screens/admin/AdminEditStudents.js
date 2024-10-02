import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Picker } from 'react-native';

import { useAdminContext } from '../../contexts/AdminContext';
import { editStudent } from '../../actions/admin';
import { showAlert } from '../../utilities/alertUtil';

import FilteredUsersList from '../../components/FilteredUsersList';
import SearchInput from '../../components/SearchInput';

import GlobalStyles from '../../styles/globalStyles';

const AdminEditStudents = () => {
    const { students, addEditedStudent } = useAdminContext();

    const [searchStudent, setSearchStudent] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchBy, setSearchBy] = useState('name');
    const searchOptions = [
        { label: 'Name', value: 'name' },
        { label: 'Email', value: 'email' },
        { label: 'Graduation Year', value: 'gradYear' },
    ]

    const initialUpdatedStudentState = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        gradYear: '',
    };

    const [updatedStudent, setUpdatedStudent] = useState(initialUpdatedStudentState);
    const [showEditForm, setShowEditForm] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const handleSearch = (query) => {
        setSearchStudent(query);
        let filtered = [];
        switch (searchBy) {
            case 'name':
                filtered = students.filter(student => 
                    student.firstName.toLowerCase().includes(query.toLowerCase()) || 
                    student.lastName.toLowerCase().includes(query.toLowerCase())
                );
                break;
            case 'gradYear':
                filtered = students.filter(student => 
                    student.gradYear.toString() === query
                );
                break;
            case 'email':
                filtered = students.filter(student => 
                    student.email.toLowerCase().includes(query.toLowerCase())
                );
                break;
            default:
                break;
        }
        setFilteredStudents(filtered);
    };
    
    const handleEditClick = (student) => {
        setUpdatedStudent(student);
        setShowEditForm(true);
        setFilteredStudents([]);
        setSearchStudent('');
    };

    const handleChange = (field, value) => {
        setUpdatedStudent({ ...updatedStudent, [field]: value });
    };

    const handleEditSubmit = async () => {
        try {
            const serverResponse = await editStudent(updatedStudent.id, updatedStudent);
            if (serverResponse) {
                addEditedStudent(serverResponse);
                showAlert('Success', 'Student is successfully edited.');
                setShowEditForm(false);
                setUpdatedStudent(initialUpdatedStudentState);
            }
        } catch (err) {
            console.error('Student edit error: ', err);
            showAlert('Edit Error', err.message || 'An unexpected error occurred during edit.');
        }
    };

    const handleCancel = () => {
        setShowEditForm(false);
        setUpdatedStudent({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            gradYear: '',
        });
    };
  
    const renderErrors = () => 
        errorMessages.map((message, index) => (
            <View key={index}>
                <Text style={{ color: 'red' }}>{message}</Text>
            </View>
        ));

        return (
            <View style={GlobalStyles.container}>
              <Text style={GlobalStyles.headerText}>Student Edit Form</Text>
              {renderErrors()}
              <SearchInput
                searchBy={searchBy}
                setSearchBy={setSearchBy}
                searchQuery={searchStudent}
                handleSearch={handleSearch}
                searchOptions={searchOptions}
              />
              {filteredStudents.length > 0 && (
                <FilteredUsersList
                  data={filteredStudents}
                  onEditClick={handleEditClick}
                />
              )}
              {showEditForm && (
                <View style={{ marginTop: 20, width: '80%' }}>
                    <Text style={GlobalStyles.headerText}>
                        Editing Student: {updatedStudent.firstName} {updatedStudent.lastName}
                    </Text>
                  {[
                    { label: 'Email:', value: 'email', placeholder: 'Email' },
                    {
                      label: 'Password:',
                      value: 'password',
                      placeholder: 'Password',
                      secureTextEntry: true,
                    },
                    {
                      label: 'First Name:',
                      value: 'firstName',
                      placeholder: 'First Name',
                    },
                    {
                      label: 'Last Name:',
                      value: 'lastName',
                      placeholder: 'Last Name',
                    },
                    {
                      label: 'Birthday:',
                      value: 'birthDate',
                      placeholder: 'Birthday (YYYY-MM-DD)',
                    },
                    {
                      label: 'Graduation Year:',
                      value: 'gradYear',
                      placeholder: 'Graduation Year',
                    },
                  ].map((field) => (
                    <View key={field.value} style={{ marginBottom: 10 }}>
                      <Text>{field.label}</Text>
                      <TextInput
                        placeholder={field.placeholder}
                        value={updatedStudent[field.value]}
                        onChangeText={(text) => handleChange(field.value, text)}
                        style={GlobalStyles.input}
                        secureTextEntry={field.secureTextEntry || false}
                      />
                    </View>
                  ))}
                  <View style={GlobalStyles.buttonContainer}>
                    <View style={GlobalStyles.submitBtn}>
                        <Button title="Submit Changes" onPress={handleEditSubmit} />
                    </View>
                    <View>
                        <Button title="Cancel" onPress={handleCancel} />
                    </View>
                  </View>
                </View>
              )}
            </View>
          );
        };
        
        export default AdminEditStudents;