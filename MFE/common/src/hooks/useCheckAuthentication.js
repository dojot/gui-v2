import { useCallback, useState } from 'react';
import { User } from 'Services';
import { setUserInformation } from 'Utils';

export const useCheckAuthentication = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  const handleCheckAuth = useCallback(async () => {
    try {
      setIsCheckingAuth(true);
      const { data } = await User.getUserData();
      const { tenant, userName, profile } = data;
      setUserInformation({ tenant, userName, profile });
    } finally {
      setIsCheckingAuth(false);
    }
  }, []);

  return {
    isCheckingAuth,
    handleCheckAuth,
  };
};
