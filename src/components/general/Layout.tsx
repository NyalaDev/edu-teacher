import { ToastContainer } from 'react-toastify';
import useLanguage from '../../hooks/useLanguage';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout: React.FC = ({ children }) => {
  const { isRtl } = useLanguage();

  const direction = isRtl ? 'rtl' : 'ltr';

  return (
    <div style={{ direction }} className="flex h-screen bg-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Layout;
