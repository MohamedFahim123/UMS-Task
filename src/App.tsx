
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import NotFound from './pages/NotFound/NotFound';
import View from './pages/View/View';
import Login from './pages/Login/Login';
import AuthView from './pages/AuthView/AuthView';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import UserLIst from './pages/UsersList/UserLIst';
import AddUser from './pages/AddUser/AddUser';
import UpdateUser from './pages/UpdateUser/UpdateUser';


function App() {
  const Routes = createBrowserRouter([
    {
      path: '/',
      element: <AuthView />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Login />
        },
        {
          path: 'login',
          element: <Login />
        },
      ]
    },
    {
      path: '/dashboard',
      element: <View />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'profile',
          element: <Profile />,
        },
        {
          path: 'users-list',
          element: <UserLIst />,
        },
        {
          path: 'add-user',
          element: <AddUser />,
        },
        {
          path: 'update-user/:id',
          element: <UpdateUser />,
        },
      ],
    },
  ]);



  return (
    <>
      <ToastContainer />
      <RouterProvider router={Routes}>
      </RouterProvider>
    </>
  );
};

export default App
