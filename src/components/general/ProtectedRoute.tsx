import { useEffect, useState } from 'react';
import { Route, useLocation } from 'react-router-dom';
import { Config } from '../../common/constants';
import { getTokenFromCookie } from '../../services/cookie.service';
import { ActivityIndicator } from '../UI';

type ComponentProps = {
  path: string;
  exact?: boolean;
};

const PrivateRoute: React.FC<ComponentProps> = ({ children, path, exact }) => {
  const [checking, setChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = getTokenFromCookie();
    if (!token) {
      window.location.assign(Config.FRONT_END_URL);
      return;
    }
    setChecking(false);
  }, [location]);

  return (
    <ActivityIndicator size={20} active={checking}>
      <Route path={path} exact={exact}>
        {children}
      </Route>
    </ActivityIndicator>
  );
};

export default PrivateRoute;
