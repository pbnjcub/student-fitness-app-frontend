// ModalTemplateAUserDataForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import MainBtn from '../../btns/MainBtn';
import TextField from '../../forms/TextField';
import DropDownMenu from '../../forms/DropDownMenu';

const ModalTemplateAUserDataForm = ({ initialValues, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <View style={styles.formContainer}>
    {Object.keys(initialValues).map((field, index) => (
        <View key={index} style={styles.fieldContainer}>
        <Text style={styles.label}>{field}:</Text>

        {field === 'Gender Identity' ? (
            <DropDownMenu
            options={[
                'Cisgender Male', 
                'Cisgender Female', 
                'Transgender Male',
                'Transgender Female', 
                'Non-Binary', 
                'Genderqueer', 
                'Genderfluid', 
                'Agender', 
                'Bigender', 
                'Two-Spirit', 
                'Other'
            ]}
            selectedValue={formData[field]}
            onValueChange={(text) => handleChange(field, text)}
            placeholder="Select One"
            />
        ) : field === 'Pronouns' ? (
            <DropDownMenu
            options={[
                'He/Him/His', 
                'She/Her/Hers', 
                'They/Them/Theirs', 
                'Ze/Zir/Zirs', 
                'Xe/Xem/Xyr', 
                'Prefer to self-describe',
                'Other'
            ]}
            selectedValue={formData[field]}
            onValueChange={(text) => handleChange(field, text)}
            placeholder="Select Pronouns"
            />
        ) : (
            <TextField
            value={formData[field]}
            onChange={(text) => handleChange(field, text)}
            />
        )}
        </View>
    ))}

      <View style={styles.buttonContainer}>
        <MainBtn label="Save" onPress={handleSave} />
        <MainBtn label="Cancel" onPress={onCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ModalTemplateAUserDataForm;
