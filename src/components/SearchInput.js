import React from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import GlobalStyles from '../styles/globalStyles';

const SearchInput = ({ searchBy, setSearchBy, searchQuery, handleSearch, searchOptions }) => {
    return (
        <View style={{ width: '80%' }}>
            <Text style={GlobalStyles.subHeaderText}>Search by:</Text>
            <Picker
                selectedValue={searchBy}
                onValueChange={(itemValue) => setSearchBy(itemValue)}
                style={{ height: 50, width: 150 }} // Adjust the style as necessary
            >
                {searchOptions.map(option => <Picker.Item key={option.value} label={option.label} value={option.value} />)}
            </Picker>
            <Text style={GlobalStyles.subHeaderText}>Enter Query:</Text>
            <TextInput
                value={searchQuery}
                onChangeText={handleSearch}
                style={GlobalStyles.input}
            />
        </View>
    );
};

export default SearchInput;
