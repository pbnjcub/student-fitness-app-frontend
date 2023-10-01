import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    headerText: {
        fontSize: 24, // or another size that suits your design
        fontWeight: 'bold', // makes the text bold
        color: 'black', // or another color that suits your design
        marginVertical: 10, // optional: to give vertical spacing
    },
    subHeaderText: {
        fontSize: 18, // or another size that suits your design
        fontWeight: 'bold', // makes the text bold
        color: 'black', // or another color that suits your design
        marginVertical: 10, // optional: to give vertical spacing
    },
    tableHeaderText: {
        fontSize: 14, // or another size that suits your design
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
    marginBottom: 10,
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
  //...other styles
});
