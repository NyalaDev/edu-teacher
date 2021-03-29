import { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Config, LocaleStorage } from '../../common/constants';
import { setLocalStorage } from '../../services/storage.service';
import { ActivityIndicator } from '../UI';
import { getProfile } from '../../services/api.service';
import { AuthContext } from '../../contexts/AuthContext';

const Auth: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const { updateUser } = useContext(AuthContext);

  useEffect(() => {
    const process = async () => {
      const { search } = location;
      const parsedQuery = queryString.parse(search);
      const authToken = (parsedQuery.authToken as string) || '';
      if (!authToken) {
        window.location.assign(Config.FRONT_END_URL);
        return;
      }
      try {
        const data = await getProfile(authToken);
        // FIXME: Add check for teacher role
        updateUser(data);
        setLocalStorage(LocaleStorage.AUTH_TOKEN, authToken);
        history.push('/');
      } catch (e) {
        window.location.assign(Config.FRONT_END_URL);
      }
    };

    process();
  }, [location, history, updateUser]);

  return <ActivityIndicator active />;
};

export default Auth;
