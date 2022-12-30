import useAuth from "hooks/useAuth";
import { useCallback, useState } from "react";
import getUser, { IGetUserResponse } from "services/user";

const useUser = () => {
  const { token } = useAuth();
  const [userInfo, setUserInfo] = useState<IGetUserResponse>();

  const getUserInfo = useCallback(async () => {
    const user = await getUser(token);

    setUserInfo(user.data);
  }, [token]);

  return { userInfo, getUserInfo };
};

export default useUser;
