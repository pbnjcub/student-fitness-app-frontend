import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList } from 'react-native';

import { useAdminContext } from '../contexts/AdminContext';
import { editStudent } from '../actions/admin';
import { showAlert } from '../utilities/alertUtil';
import GlobalStyles from '../styles/globalStyles';

const AdminEditDeleteStudents = () => {
    console.log("you've reached the AdminEditDeleteStudents.js file")
    const { students } = useAdminContext();

    const [searchStudent, setSearchStudent] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [updatedStudent, setUpdatedStudent] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        gradYear: '',
    });
    const [showEditForm, setShowEditForm] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const handleSearch = (query) => {
        setSearchStudent(query);
        const filtered = students.filter((student) =>
            student.firstName.toLowerCase().includes(query.toLowerCase()) ||
            student.lastName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredStudents(filtered);
    };

    const handleEditClick = (student) => {
        setUpdatedStudent(student);
        setShowEditForm(true);
    };

    const handleChange = (field, value) => {
        setUpdatedStudent({ ...updatedStudent, [field]: value });
    };

    const handleEditSubmit = async () => {
        try {
            const serverResponse = await editStudent(updatedStudent.id, updatedStudent);
            if (serverResponse) {
                showAlert('Success', 'Student is successfully edited.');
                setShowEditForm(false);
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

    const TableHeader = () => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text style={{ width: '80%', textAlign: 'left', ...GlobalStyles.tableHeaderText }}>Name</Text>
            <Text style={{ width: '20%', textAlign: 'left', ...GlobalStyles.tableHeaderText }}>Actions</Text>
        </View>
    );
    
    const renderStudentItem = ({ item: student }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text style={{ width: '80%', textAlign: 'left' }}>{`${student.firstName} ${student.lastName}`}</Text>
            <TouchableOpacity style={{ width: '20%', textAlign: 'right' }} onPress={() => handleEditClick(student)}>
                <Text>Edit</Text>
            </TouchableOpacity>
        </View>
    );
    

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
                <View style={{ width: '80%' }}> {/* Adjust the width according to your design */}
                    <Text style={GlobalStyles.subHeaderText}>Search by Name:</Text>
                    <TextInput
                        value={searchStudent}
                        onChangeText={handleSearch}
                        style={GlobalStyles.input}
                    />
                </View>
                <Text style={GlobalStyles.subHeaderText}>Search Results:</Text>
                <TableHeader />
                <FlatList
                    data={filteredStudents}
                    renderItem={renderStudentItem}
                    keyExtractor={(item) => item.id.toString()}
                    style={{ width: '80%' }} // Adjust the width according to your design
                />
    
                {showEditForm && (
                    <View style={{ marginTop: 20, width: '80%' }}> {/* Adjust the width according to your design */}
                        <TextInput
                            placeholder="Email"
                            value={updatedStudent.email}
                            onChangeText={(text) => handleChange('email', text)}
                            style={GlobalStyles.input}
                        />
                        <TextInput
                            placeholder="Password"
                            value={updatedStudent.password}
                            onChangeText={(text) => handleChange('password', text)}
                            style={GlobalStyles.input}
                            secureTextEntry
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>First Name:</Text>
                            <TextInput
                                placeholder="First Name"
                                value={updatedStudent.firstName}
                                onChangeText={(text) => handleChange('firstName', text)}
                                style={GlobalStyles.input}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text>Last Name:</Text>
                            <TextInput
                                placeholder="Last Name"
                                value={updatedStudent.lastName}
                                onChangeText={(text) => handleChange('lastName', text)}
                                style={GlobalStyles.input}
                            />
                        </View>
                        <TextInput
                            placeholder="Birthday (YYYY-MM-DD)"
                            value={updatedStudent.birthDate}
                            onChangeText={(text) => handleChange('birthDate', text)}
                            style={GlobalStyles.input}
                        />
                        <TextInput
                            placeholder="Graduation Year"
                            value={updatedStudent.gradYear}
                            onChangeText={(text) => handleChange('gradYear', text)}
                            style={GlobalStyles.input}
                        />
                        <View style={GlobalStyles.buttonContainer}>
                            <Button title="Submit Changes" onPress={handleEditSubmit} />
                            <Button title="Cancel" onPress={handleCancel} />
                        </View>
                    </View>
                )}
            </View>
        );
    }
    
    export default AdminEditDeleteStudents;
