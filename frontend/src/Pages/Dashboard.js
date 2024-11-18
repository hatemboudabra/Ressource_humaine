import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DemandeCongeService from '../Services/DemandeCongeService';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import '../assets/styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [demandeToDelete, setDemandeToDelete] = useState(null);
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    const fetchDemandes = async () => {
      try {
        const data = await DemandeCongeService.getAll(token);
        setDemandes(data);
      } catch (err) {
        setError('Impossible de récupérer les demandes');
        toast.error('Erreur lors de la récupération des demandes de congé');
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  const handleRedirectToDemandeConge = () => {
    navigate("/demande-conge");
  };

  const openModal = (id) => {
    setDemandeToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDemandeToDelete(null);
  };

  const handleDeleteDemande = async () => {
    try {
      if (!demandeToDelete) return;
      await DemandeCongeService.deleteDemandeConge(demandeToDelete, token);
      setDemandes(demandes.filter(demande => demande._id !== demandeToDelete));
      toast.success("Demande de congé supprimée avec succès");
      closeModal();
    } catch (err) {
      toast.error("Erreur lors de la suppression de la demande");
      console.error("Erreur lors de la suppression de la demande:", err);
      closeModal();
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Tableau de bord des demandes de congé</h1>
        <button className="logout-btn" onClick={handleLogout}>Se déconnecter</button>
      </header>

      <button className="demande-conge-btn" onClick={handleRedirectToDemandeConge}>
        <i className="fa fa-plus-circle" aria-hidden="true"></i> Faire une demande de congé
      </button>

      {loading ? (
        <div className="loading">Chargement...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="demandes-list">
          <h2>Mes demandes de congé</h2>
          <div className="demande-cards">
            {demandes.length > 0 ? (
              demandes.map((demande) => (
                <div className="demande-card" key={demande._id}>
                  <div className="demande-card-header">
                    <span className="demande-date">
                      Du {demande.startDate} au {demande.endDate}
                    </span>
                    <span className={`status ${demande.status.toLowerCase()}`}>
                      {demande.status}
                    </span>
                  </div>
                  <p><strong>Motif:</strong> {demande.reason}</p>
                  <div className="demande-actions">
                    <button className="demande-btn">Détails</button>
                    <button className="delete-btn" onClick={() => openModal(demande._id)}>
                      Supprimer
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucune demande de congé pour le moment.</p>
            )}
          </div>
        </div>
      )}

      {/* Modal de confirmation */}
      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={closeModal} 
        contentLabel="Confirmation de suppression"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Êtes-vous sûr de vouloir supprimer cette demande de congé ?</h2>
        <div className="modal-actions">
          <button onClick={handleDeleteDemande} className="confirm-btn">Oui</button>
          <button onClick={closeModal} className="cancel-btn">Non</button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
