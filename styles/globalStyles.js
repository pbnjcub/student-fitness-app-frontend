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
    alignContent: 'flex-end',
  },
  tableHeaderActionText: {
    textAlign: 'right', // This will align the "Actions" text to the right.
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
    width: '30%'
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
  },
  tableHorizontalLine: {
    height: 1, // or 2, depending on how thick you want it
    backgroundColor: 'gray', // or any color you prefer
    width: '50%'
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    width: '50%',
    marginTop: 5,
    marginBottom: 5,
  },
  tableRowText: {
    width: '60%', 
  },
  tableRowAction: {
    width: '40%',
    alignItems: 'flex-end'
  },
  actionButton: {
    width: 50, // To make sure it takes the entire space available within the tableRowAction
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    borderColor: 'gray', 
    borderWidth: 1, 
    backgroundColor: 'white', 
  },
  linksContainer: {
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});