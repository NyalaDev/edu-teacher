import { createContext, useEffect, useState } from 'react';
import { LocaleStorage } from '../common/constants';
import {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
} from '../services/storage.service';
import { ApiProfile } from '../types/api.types';

type ContextType = {
  user: ApiProfile;
  updateUser: (user: ApiProfile) => void;
  logout: () => void;
};

const initialState: ContextType = {
  user: {} as ApiProfile,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  updateUser: (user: ApiProfile) => {},
  logout: () => {},
};

export const AuthContext = createContext<ContextType>(initialState);

const getUserFromLocaleStorageIfExist = () => {
  try {
    const user = JSON.parse(
      getLocalStorage(LocaleStorage.USER_INFO)
    ) as ApiProfile;
    return user;
  } catch (e) {
    return initialState.user;
  }
};

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [user, updateUser] = useState<ApiProfile>(
    getUserFromLocaleStorageIfExist()
  );

  const logout = () => {
    updateUser(initialState.user);
    clearLocalStorage(LocaleStorage.USER_INFO);
    clearLocalStorage(LocaleStorage.AUTH_TOKEN);
  };

  useEffect(() => {
    if (user.id) setLocalStorage(LocaleStorage.USER_INFO, JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
