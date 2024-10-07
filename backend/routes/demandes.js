const express = require('express');
const router = express.Router();
const DemandeConge = require('../models/DemandeConge');
const User = require('../models/User'); // Pour les références des utilisateurs
const authenticate = require('../midlware/authenticate'); // Middleware d'authentification

// Créer une nouvelle demande de congé
router.post('/create', authenticate, async (req, res) => {
    try {
        const { startDate, endDate, reason } = req.body;
        const demande = new DemandeConge({
            user: req.user._id, // ID de l'utilisateur connecté
            startDate,
            endDate,
            reason,
        });
        await demande.save();
        res.status(201).json({ message: 'Demande de congé créée avec succès.', demande });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Récupérer toutes les demandes de congé (pour l'administrateur/manager)
router.get('/all', authenticate, async (req, res) => {
    try {
        const demandes = await DemandeConge.find().populate('user', 'username'); // Populate pour avoir les détails de l'utilisateur
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Approver ou rejeter une demande de congé
router.put('/:id/status', authenticate, async (req, res) => {
    try {
        const { status } = req.body; // 'Approved' ou 'Rejected'
        const demande = await DemandeConge.findById(req.params.id);

        if (!demande) {
            return res.status(404).json({ message: 'Demande non trouvée.' });
        }

        demande.status = status;
        demande.approvedBy = req.user._id; // L'ID du manager/admin qui approuve ou rejette
        await demande.save();

        res.status(200).json({ message: `Demande ${status}.`, demande });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.patch('/update/:id/:status', async (req, res) => {
    try {
      const demandeId = req.params.id;
      const status = req.params.status;
  
      // Valider le statut
      if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Statut invalide' });
      }
  
      // Mettre à jour la demande de congé
      const updatedDemandeConge = await DemandeConge.findByIdAndUpdate(
        demandeId,
        { status },
        { new: true }
      );
  
      if (!updatedDemandeConge) {
        return res.status(404).json({ success: false, message: 'Demande non trouvée' });
      }
  
      res.status(200).json({ success: true, data: updatedDemandeConge });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });
// Obtenir les demandes de congé de l'utilisateur connecté
router.get('/my', authenticate, async (req, res) => {
    try {
        const demandes = await DemandeConge.find({ user: req.user._id });
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
