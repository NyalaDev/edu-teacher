import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Sidebar, Clickable, LanguageSwitcher } from './components/UI';
import { ProtectedRoute, Auth } from './components/general';
import { Home, NewCourse } from './pages';
import useLanguage from './hooks/useLanguage';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  const [sideBarOpen, setSidebarOpen] = useState(false);
  const { isRtl } = useLanguage();
  const toggleSideBar = () => {
    setSidebarOpen(!sideBarOpen);
  };

  const direction = isRtl ? 'rtl' : 'ltr';

  return (
    <AuthProvider>
      <Router>
        <div style={{ direction }}>
          <div className="flex bg-gray-300">
            <Sidebar isOpen={sideBarOpen} />
            <div className="flex-1 h-full min-h-screen">
              <div className="bg-white p-3 py-5 flex justify-between">
                <Clickable onClick={toggleSideBar}>
                  <GiHamburgerMenu />
                </Clickable>
                <LanguageSwitcher />
              </div>
              <div className="m-3 p-3">
                <Switch>
                  <ProtectedRoute path="/" exact>
                    <Home />
                  </ProtectedRoute>
                  <ProtectedRoute path="/new-course" exact>
                    <NewCourse />
                  </ProtectedRoute>
                  <Route path="/auth" exact>
                    <Auth />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
