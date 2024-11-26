import React, { useState, useEffect } from 'react';
import feuilleTempsService from '../../Services/FeuilleTempsService'; // Utiliser le service
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/styles/Modifier.css'; // Importer le fichier CSS

function Modifier() {
  const [heures, setHeures] = useState('');
  const [date, setDate] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeuilleTemps = async () => {
      try {
        const response = await feuilleTempsService.getById(id); // Utiliser le service
        setHeures(response.heuresTravaillees);
        setDate(response.date);
      } catch (error) {
        console.error('Erreur de récupération de la feuille de temps', error);
      }
    };

    fetchFeuilleTemps();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await feuilleTempsService.update(id, { heuresTravaillees: heures, date: date }); // Utiliser le service
      navigate('/feuille/consultation'); // Redirige vers la page de consultation
    } catch (error) {
      console.error('Erreur de mise à jour de la feuille de temps', error);
    }
  };

  return (
    <div className="modifier-container">
      <h2 className="form-title">Modifier les heures de travail</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">Heures travaillées:</label>
          <input
            type="number"
            value={heures}
            onChange={(e) => setHeures(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="input-group">
          <label className="input-label">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="submit-button">Modifier</button>
      </form>
    </div>
  );
}

export default Modifier;