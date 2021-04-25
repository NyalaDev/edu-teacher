import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute, Auth, Layout } from './components/general';
import { Home, NewCourse, ManageCourse } from './pages';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Switch>
              <ProtectedRoute path="/" exact>
                <Home />
              </ProtectedRoute>
              <ProtectedRoute path="/new-course" exact>
                <NewCourse />
              </ProtectedRoute>
              <ProtectedRoute path="/manage/:slug" exact>
                <ManageCourse />
              </ProtectedRoute>
              <Route path="/auth" exact>
                <Auth />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
};

export default App;
