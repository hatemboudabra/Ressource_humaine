import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';  // Pour décoder le token JWT

const PrivateRoute = ({ element, requiredRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // L'état d'authentification

  useEffect(() => {
    const token = localStorage.getItem('token'); // Récupérer le token
    const role = localStorage.getItem('role'); // Récupérer le rôle de l'utilisateur

    console.log("Token récupéré:", token);
    console.log("Rôle récupéré:", role);

    if (!token) {
      console.log("Aucun token trouvé, redirection vers login.");
      setIsAuthenticated(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token); // Décoder le token
      const isExpired = decodedToken.exp * 1000 < Date.now(); // Vérifier l'expiration du token

      console.log("Date d'expiration du token:", new Date(decodedToken.exp * 1000));

      if (isExpired) {
        console.log("Token expiré, redirection vers login.");
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsAuthenticated(false);
        return;
      }
    } catch (error) {
      console.error("Erreur de décodage du token:", error);
      setIsAuthenticated(false);
      return;
    }

    // Vérifier le rôle de l'utilisateur
    if (requiredRole && role.toLowerCase() !== requiredRole.toLowerCase()) {
      console.log(`Rôle requis: ${requiredRole}, rôle actuel: ${role}. Redirection vers login.`);
      setIsAuthenticated(false);
      return;
    }

    console.log("Authentification réussie et rôle correct.");
  }, [requiredRole]);

  // Si l'utilisateur n'est pas authentifié ou n'a pas le rôle requis
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element; // Afficher l'élément demandé si tout est bon
};

export default PrivateRoute;