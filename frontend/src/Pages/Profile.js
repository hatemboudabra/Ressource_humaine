// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../Services/profileService'; // Importation des fonctions du ProfileService

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Récupérer les informations de l'utilisateur au chargement du composant
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getProfile(); // Utilisation de la fonction du ProfileService
        setUserInfo(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des informations');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(userInfo); // Utilisation de la fonction du ProfileService
      alert('Informations mises à jour avec succès');
    } catch (error) {
      setError('Erreur lors de la mise à jour');
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Mettre à jour vos informations personnelles</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur:</label>
          <input
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default Profile;
