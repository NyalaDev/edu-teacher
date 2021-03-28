import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Sidebar, Clickable, LanguageSwitcher } from './components/UI';
import { Home, NewCourse } from './pages';
import useLanguage from './hooks/useLanguage';

const App: React.FunctionComponent = () => {
  const [sideBarOpen, setSidebarOpen] = useState(true);
  const { isRtl } = useLanguage();
  const toggleSideBar = () => {
    setSidebarOpen(!sideBarOpen);
  };

  const direction = isRtl ? 'rtl' : 'ltr';

  return (
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
            <div className="bg-white m-3 p-3">
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/new-course" exact>
                  <NewCourse />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
