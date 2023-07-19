import axios from "axios";

const API_BASE_URL = "http://192.168.1.6:3000";

const signIn = async ({ userUsername, userPassword }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      userUsername,
      userPassword,
    });

    const token = response.data.token;
    const newUser = response.data.user;

    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(newUser));
    return { token, newUser };
  } catch (err) {
    throw new Error(err?.response?.data?.error || err.message);
  }
};

const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
};

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export default { signIn, signOut, isAuthenticated };
