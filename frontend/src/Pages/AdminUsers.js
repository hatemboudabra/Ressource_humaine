// src/Pages/AdminUsers.js
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../Services/profileService'; // Importer la fonction pour récupérer les utilisateurs
import '../assets/styles/AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Définir fetchUsers en dehors de useEffect
  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers); // Stocker les utilisateurs récupérés dans le state
    } catch (err) {
      setError(err.message); // Gérer les erreurs de récupération
    } finally {
      setLoading(false); // Fin de chargement
    }
  };

  useEffect(() => {
    fetchUsers(); // Appel à la fonction pour récupérer les utilisateurs lors du premier rendu
  }, []); // Le tableau vide [] signifie qu'on l'appelle seulement une fois

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">Erreur : {error}</div>;
  }

  return (
    <div className="admin-users">
      <h1>Liste des utilisateurs</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
