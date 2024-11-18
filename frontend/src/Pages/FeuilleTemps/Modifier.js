// src/Pages/FeuilleTemps/Modifier.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Modifier() {
  const [heures, setHeures] = useState('');
  const [date, setDate] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeuilleTemps = async () => {
      try {
        const response = await axios.get(`/feuille/${id}`);
        setHeures(response.data.heuresTravaillees);
        setDate(response.data.date);
      } catch (error) {
        console.error('Erreur de récupération de la feuille de temps', error);
      }
    };

    fetchFeuilleTemps();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/feuille/${id}`, { heuresTravaillees: heures, date: date });
      navigate('/feuille/consultation'); // Redirige vers la page de consultation
    } catch (error) {
      console.error('Erreur de mise à jour de la feuille de temps', error);
    }
  };

  return (
    <div>
      <h2>Modifier les heures de travail</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Heures travaillées:</label>
          <input
            type="number"
            value={heures}
            onChange={(e) => setHeures(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
}

export default Modifier;
