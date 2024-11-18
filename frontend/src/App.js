import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Pages/register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import PrivateRoute from './components/PrivateRoute'; // Importer depuis le dossier components
import Profile from './Pages/Profile';
import Dashboard from './Pages/Dashboard'; // Importer Dashboard
import DemandeConge from './Pages/DemandeCongeForm'; // Importer DemandeConge
import SaisieHeures from './Pages/FeuilleTemps/SaisieHeures'; // Ajouter la route pour saisir les heures
import Consultation from './Pages/FeuilleTemps/Consultation'; // Ajouter la route pour consulter les feuilles de temps
import Modifier from './Pages/FeuilleTemps/Modifier'; // Ajouter la route pour modifier les heures  
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
    {
      path: '/feuille/saisie',
      element: <PrivateRoute element={<SaisieHeures />} />, // Route protégée pour saisir les heures
    },
    {
      path: '/feuille/consultation',
      element: <PrivateRoute element={<Consultation />} />, // Route protégée pour consulter les feuilles de temps
    },
    {
      path: '/feuille/modifier/:id',
      element: <PrivateRoute element={<Modifier />} />, // Route protégée pour modifier une feuille de temps
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
