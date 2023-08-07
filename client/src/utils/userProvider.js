import axios from "axios";

const API_BASE_URL = "http://192.168.1.6:3000";

const getUserData = async ({ token }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/userData`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = { ...response.data.userData, pfp: response.data.pfp };
    return userData;
  } catch (err) {
    throw new Error(err?.response?.data?.error || err.message);
  }
};

export default { getUserData };
