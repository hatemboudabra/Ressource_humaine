import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Pages/register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import PrivateRoute from './components/PrivateRoute'; // Importer depuis le dossier components
import Profile from './Pages/Profile';
import Dashboard from './Pages/Dashboard'; // Importer Dashboard
import DemandeConge from './Pages/DemandeCongeForm'; // Importer DemandeConge

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>Home page</div>,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/home',
      element: <PrivateRoute element={<Home />} />, // Protéger cette route
    },
    {
      path: '/profile',
      element: <PrivateRoute element={<Profile />} />, // Route protégée pour Profile
    },
    {
      path: '/dashboard',
      element: <PrivateRoute element={<Dashboard />} />, // Route protégée pour Dashboard
    },
    {
      path: '/demande-conge',
      element: <PrivateRoute element={<DemandeConge />} />, // Route protégée pour Demande de Congé
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
