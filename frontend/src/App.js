import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Register from './Pages/register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Profile from './Pages/Profile';
import Dashboard from './Pages/Dashboard';
import DemandeConge from './Pages/DemandeCongeForm';
import SaisieHeures from './Pages/FeuilleTemps/SaisieHeures';
import Consultation from './Pages/FeuilleTemps/Consultation';
import Modifier from './Pages/FeuilleTemps/Modifier';
import DemandeDetails from './Pages/DemandeDetails';
import AdminDashboard from './Pages/AdminDashboard';
import Navbar from './components/Navbar'; 
import AdminTimes from './Pages/AdminTimes'; 
import AdminHome from './Pages/AdminHome';
import AdminUsers from './Pages/AdminUsers'; 
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" />,
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
      element: <PrivateRoute element={<Home />} requiredRole="employe" />,
    },
    {
      path: '/profile',
      element: <PrivateRoute element={<Profile />} requiredRole="employe" />,
    },
    {
      path: '/dashboard',
      element: <PrivateRoute element={<Dashboard />} requiredRole="employe" />,
    },
    {
      path: '/demande-conge',
      element: <PrivateRoute element={<DemandeConge />} requiredRole="employe" />,
    },
    {
      path: '/feuille/saisie',
      element: <PrivateRoute element={<SaisieHeures />} requiredRole="employe" />,
    },
    {
      path: '/feuille/consultation',
      element: <PrivateRoute element={<Consultation />} requiredRole="employe" />,
    },
    {
      path: '/feuille/modifier/:id',
      element: <PrivateRoute element={<Modifier />} requiredRole="employe" />,
    },
    {
      path: '/demande/:id',
      element: <PrivateRoute element={<DemandeDetails />} requiredRole="employe" />,
    },
    {
      path: '/admin-dashboard',
      element: <PrivateRoute element={<AdminDashboard />} requiredRole="admin" />,
    },
    {
      path: '/admin/times',
      element: <PrivateRoute element={<AdminTimes />} requiredRole="admin" />, // Route pour AdminTimes
    },
    {
      path: '/admin-home',
      element: <PrivateRoute element={<AdminHome />} requiredRole="admin" />, // Route vers la page d'accueil admin
    },
    {
      path: '/admin/users',
      element: <PrivateRoute element={<AdminUsers />} requiredRole="admin" />, // Route protégée pour l'admin
    },
  ]);

  return (
    <>
      <Navbar /> {/* Ajoutez le composant Navbar ici */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;