import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/authApiSlice';
import { toast } from "react-toastify";

const useSyncLocalStorageWithRedux = () => {
  const dispatch = useDispatch();
  const [ logoutApiCall ] = useLogoutMutation();
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');

    if (!storedUser) {
      dispatch(logout());
      logoutApiCall().unwrap()
        .catch((error) => {
          toast.error("logged out.")
        });
    }
  }, [dispatch]);
};

export default useSyncLocalStorageWithRedux;
