import { API_BASE_URL } from '@env';

export const getAllStudents = async (page = 1, limit = 24) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/student?page=${page}&limit=${limit}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    return data; // Expected to return { students, totalPages, currentPage }
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
//...rest of the code

export const uploadCSV = async ({ uri, name, type, blob }) => {
  try {

    const formData = new FormData();
    formData.append('file', blob, name); // Appending Blob file


    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: formData,
    });


    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Upload failed with status ${response.status}: ${errorData.message}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const uploadStudent = async (studentData) => {
  try {
    console.log(studentData)
    const response = await fetch('http://localhost:3000/api/students', { // Adjust the URL to your API endpoint for creating a student
      method: 'POST',
      mode: 'cors',
      credentials: 'include', // If you don't use cookies, you might not need this line
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Upload failed with status ${response.status}: ${errorData.message}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const editStudent = async (studentId, studentData) => {
  try {
    const response = await fetch(`http://localhost:3000/api/students/${studentId}`, {
      method: 'PATCH', // or 'PUT' if your API uses PUT for updates
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Edit failed with status ${response.status}: ${errorData.message}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
  }
};
