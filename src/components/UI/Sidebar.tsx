import { MdDesktopMac } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlinePlusSquare, AiOutlineLogout } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Clickable from './Clickable';
import { Config } from '../../common/constants';

const sideBarItems = [
  {
    id: 1,
    title: 'courses',
    Icon: MdDesktopMac,
    path: '/',
  },
  {
    id: 2,
    title: 'addCourse',
    Icon: AiOutlinePlusSquare,
    path: '/new-course',
  },
];

type ComponentProps = {
  isOpen: boolean;
};

const Sidebar: React.FunctionComponent<ComponentProps> = ({ isOpen }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.assign(Config.FRONT_END_URL);
  };

  return (
    <div
      className={`bg-gray-800 flex flex-col justify-between ${
        isOpen ? 'w-48' : 'w-16'
      }`}
    >
      <div>
        <div className="h-16 bg-purple-500 text-white flex items-center justify-center">
          <a
            className="px-5 text-white text-lg h-8 flex items-center justify-center"
            href="/"
          >
            <span className="px-2">B{isOpen ? 'armaga' : ''}</span>
          </a>
        </div>
        <div className="flex items-center justify-center p-2 mb-2">
          <h4 className="text-white capitalize font-poppins">
            {isOpen ? user.name : user.name.charAt(0)}
          </h4>
        </div>
        <ul className="space-y-2 text-sm ">
          {sideBarItems.map(Item => {
            const isActive = Item.path === location.pathname;
            return (
              <li key={Item.id}>
                <Link
                  to={Item.path}
                  className={`flex items-center ${
                    !isOpen && 'justify-center'
                  } space-x-3 p-2 font-medium hover:bg-gray-200 hover:text-gray-700 ${
                    isActive ? 'bg-gray-200 text-gray-700' : 'text-gray-100'
                  } focus:shadow-outline`}
                >
                  <Item.Icon />
                  {isOpen && <span>{t(Item.title)}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Clickable
        className="block p-4 text-center bg-gray-900"
        onClick={handleLogout}
      >
        <div className="flex items-center justify-around">
          <span className="text-red-500 text-xl">
            <AiOutlineLogout />
          </span>
          {isOpen && (
            <span className="text-red-500 text-xl">{t('signOut')}</span>
          )}
        </div>
      </Clickable>
    </div>
  );
};

export default Sidebar;
