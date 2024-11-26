import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DemandeCongeService from '../Services/DemandeCongeService';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import '../assets/styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [demandes, setDemandes] = useState([]);
  const [filteredDemandes, setFilteredDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [demandeToDelete, setDemandeToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    const fetchDemandes = async () => {
      try {
        const data = await DemandeCongeService.getAll(token);
        setDemandes(data);
        setFilteredDemandes(data);
      } catch (err) {
        setError('Impossible de récupérer les demandes');
        toast.error('Erreur lors de la récupération des demandes de congé');
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, [token, navigate]);

  useEffect(() => {
    let results = demandes;
    if (search) {
      results = results.filter((demande) =>
        demande.reason.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter) {
      results = results.filter((demande) => 
        demande.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    setFilteredDemandes(results);
  }, [search, statusFilter, demandes]);

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
      setDemandes(demandes.filter((demande) => demande._id !== demandeToDelete));
      toast.success("Demande de congé supprimée avec succès");
      closeModal();
    } catch (err) {
      toast.error("Erreur lors de la suppression de la demande");
      console.error("Erreur lors de la suppression de la demande:", err);
      closeModal();
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Menu</h2>
        <nav>
          <ul>
            <li onClick={() => navigate('/dashboard')}>Tableau de bord</li>
            <li onClick={handleRedirectToDemandeConge}>Faire une demande</li>
            <li onClick={handleLogout}>Se déconnecter</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard">
        <header className="dashboard-header">
          <h1>Tableau de bord des demandes de congé</h1>
        </header>

        {/* Filtres */}
        <div className="filter-bar">
          <input
            type="text"
            placeholder="Rechercher par motif..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="approved">Approuvé</option>
            <option value="rejected">Rejeté</option>
          </select>
        </div>

        {loading ? (
          <div className="loading">Chargement...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="demandes-list">
            <h2>Mes demandes de congé</h2>
            <div className="demande-cards">
              {filteredDemandes.length > 0 ? (
                filteredDemandes.map((demande) => (
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
                      <button className="demande-btn" onClick={() => navigate(`/demande/${demande._id}`)}>Détails</button>
                      <button className="delete-btn" onClick={() => openModal(demande._id)}>Supprimer</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Aucune demande de congé correspondante.</p>
              )}
            </div>
          </div>
        )}

        {/* Modal */}
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
      </main>
    </div>
  );
};

export default Dashboard;
