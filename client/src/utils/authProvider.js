import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const signIn = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });

    const token = response.data.token;

    localStorage.setItem("token", token);
    return token;
  } catch (err) {
    throw new Error("Login failed: " + err.message);
  }
};

const signOut = () => {
  localStorage.removeItem("token");
};

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export default { signIn, signOut, isAuthenticated };
