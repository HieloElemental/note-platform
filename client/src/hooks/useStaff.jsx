import { useEffect, useState } from "react";
import useError from "./useError";
import staffProvider from "./../utils/providers/staffProvider";
import useAuth from "./useAuth";

const useStaff = () => {
  const auth = useAuth();
  const token = auth.authUser.accessToken;
  const usedError = useError();
  const [staffs, setStaffs] = useState([]);

  const getStaffs = async () => {
    try {
      const staffsProvided = await staffProvider.getStaffs({ token });
      setStaffs(staffsProvided);
    } catch (error) {
      usedError.showError(error);
    }
  };

  useEffect(() => {
    if (usedError.error == null) {
      getStaffs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usedError]);

  return {
    getStaffs,
    staffs,
  };
};

export default useStaff;
