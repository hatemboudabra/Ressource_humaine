import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Vérifier si un token est présent

  if (!token) {
    // Si le token n'est pas présent, rediriger vers la page de login
    return <Navigate to="/login" replace />;
  }

  return element; // Si l'utilisateur est authentifié, afficher l'élément demandé
};

export default PrivateRoute;
