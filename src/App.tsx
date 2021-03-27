import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Sidebar, Clickable } from './components/UI';
import { Home, NewCourse } from './pages';

const App: React.FunctionComponent = () => {
  const [sideBarOpen, setSidebarOpen] = useState(true);

  const toggleSideBar = () => {
    setSidebarOpen(!sideBarOpen);
  };

  return (
    <Router>
      <div>
        <div className="flex bg-gray-300">
          <Sidebar isOpen={sideBarOpen} />
          <div className="flex-1 h-full min-h-screen">
            <div className="bg-white p-3 py-5">
              <Clickable onClick={toggleSideBar}>
                <GiHamburgerMenu />
              </Clickable>
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
