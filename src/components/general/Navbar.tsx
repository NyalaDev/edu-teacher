import { useContext } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { AppAactions } from '../../contexts/app.reducer';

import { AppContext } from '../../contexts/AppContext';
import useLanguage from '../../hooks/useLanguage';
import LanguageSwitcher from './LanguageSwitcher';
import UserMenu from './UserMenu';

const Navbar: React.FC = () => {
  const { isRtl } = useLanguage();
  const { dispatch } = useContext(AppContext);
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
      <div className="flex items-center">
        <button
          type="button"
          className="text-gray-500 focus:outline-none lg:hidden"
          onClick={() => dispatch({ type: AppAactions.toggleSideBar })}
        >
          <BiMenuAltLeft size={25} />
        </button>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <LanguageSwitcher />
        </div>
        <div className={`relative ${isRtl ? 'mr-5' : 'ml-5'}`}>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
