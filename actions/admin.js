export const getAllStudents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/students', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return { errors: error.messages || 'An error occurred' };
    }
  };
  
  // Define the API URL where you want to send the .csv file
const API_URL = 'http://localhost:3000/api/upload'; // Replace with your actual API endpoint

/**
 * Handles the upload of a .csv file to the backend
 * @param {Object} file - File object representing the .csv file, usually obtained from a document picker
 * @returns {Promise} - A promise that resolves with the server response or rejects with an error
 */
export const uploadCSV = async (file) => {
  try {
    const { uri, name, type } = file; // Destructuring properties from file object
    
    const formData = new FormData();
    formData.append('file', { uri, name, type, filename: name }); // some server implementations might need filename
    
    // Making a POST request to the server with the file included in the request body
    const response = await fetch(API_URL, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Upload failed with status ${response.status}: ${errorData.message}`);
    }
    
    // If successful, return the server response
    return await response.json();
  } catch (error) {
    console.error('Upload error:', error.message || error);
    throw error;
  }
};
