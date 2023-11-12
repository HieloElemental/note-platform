import { useState, useEffect } from "react";
import useError from "./useError";
import positionProvider from "./../utils/providers/positionProvider";
import useAuth from "./useAuth";

const usePosition = () => {
  const auth = useAuth();
  const token = auth.authUser.accessToken;
  const usedError = useError();
  const [positions, setPositions] = useState([]);

  const getPositions = async () => {
    try {
      const positionsProvided = await positionProvider.getPositions({ token });
      setPositions(positionsProvided);
    } catch (err) {
      usedError.showError(err);
    }
  };

  useEffect(() => {
    if (usedError.error == null) {
      getPositions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usedError]);

  return {
    getPositions,
    positions,
  };
};

export default usePosition;
