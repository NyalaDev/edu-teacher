import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Config } from '../../common/constants';
import { AuthContext } from '../../contexts/AuthContext';
import { Clickable } from '../UI';

const UserMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.assign(Config.FRONT_END_URL);
  };

  return (
    <>
      <Clickable onClick={() => setOpen(!open)}>{user.name}</Clickable>

      <div
        x-show="dropdownOpen"
        className={`absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10 ${
          open ? '' : 'hidden'
        }`}
      >
        <a
          href={Config.FRONT_END_URL}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
        >
          Back to Barmaga.io
        </a>

        <hr />
        <Clickable
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white w-full"
          onClick={handleLogout}
        >
          {t('signOut')}
        </Clickable>
      </div>
    </>
  );
};

export default UserMenu;
