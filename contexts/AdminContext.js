import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllStudents } from '../actions/admin'; // Correct the path

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setIsLoading(true);
        const data = await getAllStudents();
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setStudents(data);
        }
      } catch (err) {
        setErrors('An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    loadStudents();
  }, []);

  const addStudent = (newStudent) => {
    setStudents(prevStudents => [...prevStudents, newStudent]);
  }

  const addMultipleStudents = (newStudents) => {
    setStudents(prevStudents => [...prevStudents, ...newStudents]);
  };

  return (
    <AdminContext.Provider value={{ students, setStudents, addStudent, addMultipleStudents, errors, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};
