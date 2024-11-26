import React, { useEffect, useState } from 'react';
import DemandeCongeService from '../Services/DemandeCongeService'; // Assurez-vous d'importer le service
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ token }) => {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimer le token
    navigate('/login'); // Rediriger vers la page de connexion
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDemandes = async () => {
      try {
        const result = await DemandeCongeService.getAllDemandes(token);
        setDemandes(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchDemandes();
  }, [navigate]);

  const handleUpdateStatus = async (id, status) => {
    try {
      const formattedStatus = status === 'Approved' ? 'Approved' : 'Rejected';
      setDemandes(demandes.map(demande =>
        demande._id === id ? { ...demande, status: formattedStatus } : demande
      ));
      await DemandeCongeService.updateStatus(id, formattedStatus, token);
    } catch (err) {
      setError(err.message);
      if (err.message === "Token invalide" || err.message === "Token expiré") {
        localStorage.removeItem('token');
        navigate("/login");
      }
      setDemandes(demandes.map(demande =>
        demande._id === id ? { ...demande, status: 'Pending' } : demande
      ));
    }
  };

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Tableau de Bord Admin</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </header>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', textAlign: 'left' }}>Utilisateur</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Dates</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Statut</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map(demande => (
              <tr key={demande._id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px' }}>{demande.user ? demande.user.username : 'Utilisateur non trouvé'}</td>
                <td style={{ padding: '8px' }}>
                  {new Date(demande.startDate).toLocaleDateString()} - {new Date(demande.endDate).toLocaleDateString()}
                </td>
                <td style={{ padding: '8px' }}>
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: demande.status === 'Approved' ? 'green' : demande.status === 'Rejected' ? 'red' : 'orange',
                      color: '#fff',
                    }}
                  >
                    {demande.status}
                  </span>
                </td>
                <td style={{ padding: '8px' }}>
                  <button
                    onClick={() => handleUpdateStatus(demande._id, 'Approved')}
                    style={{ padding: '6px 12px', marginRight: '5px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(demande._id, 'Rejected')}
                    style={{ padding: '6px 12px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    Rejected
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
