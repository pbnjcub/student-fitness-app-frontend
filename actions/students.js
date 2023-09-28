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
  