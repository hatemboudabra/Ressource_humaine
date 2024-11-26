import React, { useState, useEffect } from 'react';
import FeuilleTempsService from '../Services/FeuilleTempsService';
import '../assets/styles/AdminTimes.css';

const AdminTimes = () => {
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const data = await FeuilleTempsService.getAll();
        console.log("Données récupérées :", data); // Inspecter la structure des données
        setTimes(data);
      } catch (err) {
        setError('Erreur lors de la récupération des temps');
      } finally {
        setLoading(false);
      }
    };

    fetchTimes();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await FeuilleTempsService.updateStatus(id, newStatus);
      setTimes((prevTimes) =>
        prevTimes.map((time) =>
          time._id === id ? { ...time, statut: newStatus } : time
        )
      );
    } catch (err) {
      console.error("Erreur lors de la mise à jour du statut :", err);
    }
  };

  return (
    <div className="admin-times-container">
      <h1>Temps effectués par les utilisateurs</h1>
      {loading ? (
        <div className="loading">Chargement...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <table className="times-table">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Date</th>
              <th>Heures</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time._id}>
                <td>{time.employe ? time.employe.username : 'Utilisateur inconnu'}</td>
                <td>{new Date(time.date).toLocaleDateString()}</td>
                <td>{time.heuresTravaillees}</td>
                <td>{time.statut}</td>
                <td>
                  <select
                    value={time.statut}
                    onChange={(e) => handleStatusUpdate(time._id, e.target.value)}
                  >
                    <option value="En attente">En attente</option>
                    <option value="Validé">Validé</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminTimes;
