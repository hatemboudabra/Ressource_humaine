import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import DemandeCongeService from '../Services/DemandeCongeService';
import toast from 'react-hot-toast';
import '../assets/styles/DemandeCongeForm.css'; // Fichier CSS pour le style

const DemandeCongeForm = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Hook pour redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) {
      setError('Tous les champs sont obligatoires');
      return;
    }
    try {
      // Appel à l'API pour créer la demande de congé
      await DemandeCongeService.create({ startDate, endDate, reason }, token);
      
      // Affichage du message de succès immédiatement
      toast.success('Demande de congé créée avec succès');

      // Nettoyage du formulaire
      setStartDate('');
      setEndDate('');
      setReason('');
      setError('');

      // Redirection vers le tableau de bord après un court délai pour laisser afficher le message toast
      setTimeout(() => {
        navigate('/dashboard'); // Redirige vers le tableau de bord
      }, 1500); // Délai de 1,5 seconde avant la redirection
    } catch (err) {
      toast.error('Erreur lors de la création de la demande');
    }
  };

  return (
    <div className="demande-conge-form">
      <h3>Nouvelle demande de congé</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date de début</label>
          <input
            type="date"
            className="input-field"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date de fin</label>
          <input
            type="date"
            className="input-field"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Raison</label>
          <textarea
            className="input-field"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn">Soumettre</button>
      </form>
    </div>
  );
};

export default DemandeCongeForm;
