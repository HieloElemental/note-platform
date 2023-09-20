import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const signIn = async ({ username, password }) => {
  try {
    console.log("arrived here");
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });

    const { accessToken, refreshToken, user: newUser } = response.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userData", JSON.stringify(newUser));
    return { accessToken, newUser };
  } catch (err) {
    throw new Error(err?.response?.data?.error || err.message);
  }
};

const signOut = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userData");
};

const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return !!token;
};

export default { signIn, signOut, isAuthenticated };
