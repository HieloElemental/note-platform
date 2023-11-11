import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const getPositions = async ({ token }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/positions/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const staffs = response.data;
    return staffs;
  } catch (err) {
    throw new Error(err?.response?.data?.error || err.message);
  }
};

export default { getPositions };
