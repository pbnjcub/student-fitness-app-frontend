import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const TextField = ({
    value,
    placeholder,
    onChange,
    required = false, // You can handle this in validation logic, not in the input itself
    disabled = false,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <TextInput
            value={value}
            placeholder={placeholder}
            onChangeText={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[styles.input, isFocused && styles.inputFocused]}
            editable={!disabled} // React Native uses 'editable' for disabling inputs
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,  // Default border width
        borderColor: '#000000',  // Default border color
        padding: 8,
        borderRadius: 5,
        width: 300,
        // flex: 1,
        marginRight: 10,
    },
    inputFocused: {
        borderWidth: 2,  // Change border width when focused
    },
});

export default TextField;
