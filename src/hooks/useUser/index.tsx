import useAxios from 'axios-hooks';
import { API_USER_ME, IGetUserResponse } from 'services/user';

const useUser = () => {
  const [{ data, loading, error }, getMe, cancelGetMe] = useAxios<IGetUserResponse, unknown>(
    {
      url: API_USER_ME,
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
    { autoCancel: true, manual: false },
  );

  return { userInfo: data };
};

export default useUser;
