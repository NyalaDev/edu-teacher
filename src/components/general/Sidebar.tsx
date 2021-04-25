import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MdDesktopMac } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

const sideBarItems = [
  {
    id: 1,
    title: 'courses',
    Icon: MdDesktopMac,
    path: '/',
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { state } = useContext(AppContext);

  const extraClass = state.isSidebarOpen
    ? 'translate-x-0 ease-out'
    : '-translate-x-full ease-in';
  return (
    <div
      className={`${extraClass} fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-center mt-8">
        <div className="flex items-center">
          <span className="text-white text-2xl mx-2 font-semibold">
            Teacher Dashboard
          </span>
        </div>
      </div>

      <nav className="mt-10">
        {sideBarItems.map(Item => {
          const isActive = Item.path === location.pathname;
          return (
            <Link
              key={Item.id}
              to={Item.path}
              className={`flex items-center mt-4 py-2 px-6 text-gray-100 ${
                isActive ? 'bg-gray-700 bg-opacity-25 ' : ''
              }`}
            >
              <Item.Icon />
              <span className="mx-3">{t(Item.title)}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
