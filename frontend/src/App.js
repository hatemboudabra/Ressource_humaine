import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Pages/register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import PrivateRoute from './components/PrivateRoute'; // Importer depuis le dossier components
import Profile from './Pages/Profile';

function App() {
  const router = createBrowserRouter([
    {
      path : '/',
      element : <div> home page </div>

    },
    {
      path : '/login',
      element : <Login></Login>

    },
    {
      path : '/register',
      element : <Register></Register>

    },
    {
      path: '/home',
      element: <PrivateRoute element={<Home />} />, // Protéger cette route
    },
    {
      path: '/profile',
      element: <PrivateRoute element={<Profile />} />, // Route protégée pour Profile
    },
  ])
  return (
   <>
   <RouterProvider router={router}></RouterProvider>
   </>
  );
}

export default App;
