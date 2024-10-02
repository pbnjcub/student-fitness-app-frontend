import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import GlobalStyles from '../styles/globalStyles';

const TableHeader = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10, width: '50%' }}>
      <Text style={{ width: '60%', ...GlobalStyles.tableHeaderText }}>Name</Text>
      <Text style={{ width: '40%', ...GlobalStyles.tableHeaderText, ...GlobalStyles.tableHeaderActionText }}>Actions</Text>
    </View>
  );

const FilteredUsersList = ({ data, onEditClick }) => {
    const renderUserItem = ({ item: user }) => (
        <View>
            <View style={GlobalStyles.tableRow}>
                <Text style={GlobalStyles.tableRowText}>{`${user.firstName} ${user.lastName}`}</Text>
                <View style={GlobalStyles.tableRowAction}>
                    <TouchableOpacity style={GlobalStyles.actionButton} onPress={() => onEditClick(user)}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={GlobalStyles.tableHorizontalLine} />
        </View>
    );
    

    return (
        <View style={{ width: '80%' }}>
            <TableHeader />
            <FlatList
                data={data}
                renderItem={renderUserItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default FilteredUsersList;
