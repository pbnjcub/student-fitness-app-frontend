export const createAccount = async (details) => {
  try {
    const resp = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      mode: 'cors', // If you don't use cookies, you might not need this line
      credentials: 'include', // If you don't use cookies, you might not need this line
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(details)
    });

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(data.errors);
    }

    return data;
  } catch (error) {
    console.error('Error creating account:', error);
    return { errors: error.message };
  }
};

export const login = async (details, handleCurrentUser) => {
  try {
    const resp = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      mode: 'cors', // If you don't use cookies, you might not need this line
      credentials: 'include', // If you don't use cookies, you might not need this line
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(details)
    });

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(data.errors);
    }

    handleCurrentUser(data);
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    return { errors: error.message };
  }
};

export const logout = async (logoutCurrentUser) => {
  try {
    const resp = await fetch('http://localhost:3000/api/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!resp.ok) {
      const data = await resp.json();
      throw new Error(data.errors);
    }

    logoutCurrentUser();
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export const getCurrentUser = async () => {
  try {
    const resp = await fetch('http://YOUR_SERVER_ADDRESS/current-user', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(data.errors);
    }

    return data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};
