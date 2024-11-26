import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../Services/profileService';
import { useNavigate } from 'react-router-dom';
import '../Profile.css'; // Assurez-vous que le chemin est correct

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getProfile();
        setUserInfo(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des informations');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      await updateProfile(userInfo);
      setSuccessMessage('Informations mises à jour avec succès');
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } catch (error) {
      setError('Erreur lors de la mise à jour');
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Mettre à jour vos informations personnelles</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur :</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default Profile;