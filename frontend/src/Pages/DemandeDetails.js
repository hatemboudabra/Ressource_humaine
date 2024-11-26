import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DemandeCongeService from '../Services/DemandeCongeService';
import '../assets/styles/DemandeDetails.css';

const DemandeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await DemandeCongeService.getDemandeById(id, token);
        setDemande(data);
      } catch (err) {
        setError("Erreur lors de la récupération des détails de la demande.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <div className="demande-details-container">
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="demande-details-card">
          <h1 className="demande-title">Détails de la demande</h1>
          <div className="demande-content">
            <p>
              <strong><i className="fa fa-calendar-alt"></i> Date de début :</strong> {demande.startDate}
            </p>
            <p>
              <strong><i className="fa fa-calendar-alt"></i> Date de fin :</strong> {demande.endDate}
            </p>
            <p>
              <strong><i className="fa fa-file-alt"></i> Motif :</strong> {demande.reason}
            </p>
            <p>
              <strong><i className="fa fa-info-circle"></i> Statut :</strong> 
              <span className={`status-badge ${demande.status.toLowerCase()}`}>
                {demande.status}
              </span>
            </p>
          </div>
          <button onClick={() => navigate(-1)} className="back-btn">Retour</button>
        </div>
      )}
    </div>
  );
};

export default DemandeDetails;
