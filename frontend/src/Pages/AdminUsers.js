import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getAllUsers, deleteUser } from '../Services/profileService';
import '../assets/styles/AdminUsers.css';

// Configuration pour react-modal
Modal.setAppElement('#root'); 

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Fonction pour récupérer les utilisateurs
  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour vérifier avant suppression
  const canDeleteUser = (user) => {
    if (user.Roles === 'Admin') {
      alert(`Vous ne pouvez pas supprimer l'utilisateur Admin : ${user.username}`);
      return false;
    }
    return true;
  };

  // Ouvrir la modale avec l'utilisateur à supprimer
  const openModal = (user) => {
    if (canDeleteUser(user)) {
      setUserToDelete(user);
      setIsModalOpen(true);
    }
  };

  // Fermer la modale
  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  // Confirmer et supprimer l'utilisateur
  const confirmDelete = async () => {
    try {
      await deleteUser(userToDelete._id); // Supprimer l'utilisateur
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userToDelete._id)); // Mettre à jour la liste
      alert('Utilisateur supprimé avec succès');
    } catch (err) {
      alert(`Erreur lors de la suppression : ${err.message}`);
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">Erreur : {error}</div>;
  }

  return (
    <div className="admin-users">
      <h1>Liste des utilisateurs</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.Roles}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => openModal(user)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modale pour confirmer la suppression */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation de suppression"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
          },
        }}
      >
        <h2>Confirmation de suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer {userToDelete?.username} ?</p>
        <div>
          <button onClick={confirmDelete} className="confirm-button">
            Oui, supprimer
          </button>
          <button onClick={closeModal} className="cancel-button">
            Annuler
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminUsers;
