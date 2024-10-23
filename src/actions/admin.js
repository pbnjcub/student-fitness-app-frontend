import { API_BASE_URL } from '@env';

export const getAllStudents = async ({ page = 1, limit = 24, searchText = '', graduationYear = '', sectionCode = '', showArchived = false }) => {
  try {
    // Construct URLSearchParams for query parameters
    const params = new URLSearchParams({
      page,
      limit,
    });

    // Add optional parameters if they are provided
    if (searchText) params.append('searchText', searchText);
    if (graduationYear) params.append('graduationYear', graduationYear);
    if (sectionCode) params.append('sectionCode', sectionCode);
    if (showArchived) params.append('showArchived', showArchived);

    // Make the request to the API endpoint with the constructed query string
    const response = await fetch(`${API_BASE_URL}/users/student?${params.toString()}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      // Attempt to parse JSON if response is not OK
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw errorData;
      } else {
        // Response is not JSON, likely an HTML error page
        throw new Error(`Unexpected response from server: ${response.status} - ${response.statusText}`);
      }
    }

    // Parse the response as JSON
    const data = await response.json();
    return data; // Expected to return { students, totalPages, currentPage }
  } catch (error) {
    console.error('Error fetching students:', error);
    return { errors: error.message || 'An error occurred' };
  }
};

export const getAllSectionCodes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sections/active`, {
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
      throw new Error(`Failed to fetch section codes: ${errorData.message}`);
    }
  
    const data = await response.json();
    const sectionCodes = data.map(({ sectionCode }) => sectionCode);

    const sortedSectionCodes = sectionCodes.sort((a, b) => {
      const firstFourA = parseInt(a.split('-')[0], 10);
      const firstFourB = parseInt(b.split('-')[0], 10);

      if (firstFourA !== firstFourB) {
        return firstFourA - firstFourB;
      }

      const secondTwoA = parseInt(a.split('-')[1], 10);
      const secondTwoB = parseInt(b.split('-')[1], 10);

      return secondTwoA - secondTwoB;
    });

    return sortedSectionCodes;
  } catch (error) {
    console.error('Error fetching section codes:', error);
    return { errors: error.message || 'An error occurred' };
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
