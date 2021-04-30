import { createContext, useEffect, useState } from 'react';
import { Config, LocaleStorage } from '../common/constants';
import { getProfile } from '../services/api.service';
import { getTokenFromCookie } from '../services/cookie.service';
import {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
} from '../services/storage.service';
import { Profile } from '../types/api.types';

type ContextType = {
  user: Profile;
  updateUser: (user: Profile) => void;
  logout: () => void;
};

const initialState: ContextType = {
  user: {} as Profile,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  updateUser: (user: Profile) => {},
  logout: () => {},
};

export const AuthContext = createContext<ContextType>(initialState);

const getUserFromLocaleStorageIfExist = () => {
  try {
    const user = JSON.parse(
      getLocalStorage(LocaleStorage.USER_INFO)
    ) as Profile;
    return user;
  } catch (e) {
    return initialState.user;
  }
};

export const AuthProvider: React.FC = ({ children }) => {
  const [user, updateUser] = useState<Profile>(
    getUserFromLocaleStorageIfExist()
  );

  const logout = () => {
    updateUser(initialState.user);
    clearLocalStorage(LocaleStorage.USER_INFO);
  };

  useEffect(() => {
    const loadUser = async () => {
      const authToken = getTokenFromCookie();
      if (!authToken) {
        window.location.assign(Config.FRONT_END_URL);
        return;
      }

      try {
        const data = await getProfile(authToken);
        const {
          user: { role },
        } = data;

        if (role.type !== 'teacher') {
          window.location.assign(Config.FRONT_END_URL);
          return;
        }

        updateUser(data);
      } catch (e) {
        window.location.assign(Config.FRONT_END_URL);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    setLocalStorage(LocaleStorage.USER_INFO, JSON.stringify(user));
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
