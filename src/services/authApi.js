export const login = async (data) => {
  try {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/user',
      },
    });
    const result = await response.json();
    if (response.ok) {
      console.log(response);
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
};
