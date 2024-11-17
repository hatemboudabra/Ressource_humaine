const express = require('express');
const router = express.Router();
const DemandeConge = require('../models/DemandeConge');
const User = require('../models/User'); // Pour les références des utilisateurs
const authenticate = require('../midlware/authenticate'); // Middleware d'authentification

/**
 * @swagger
 * /demandes/create:
 *   post:
 *     summary: Créer une nouvelle demande de congé
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Demande de congé créée
 *       400:
 *         description: Erreur de validation
 */
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

/**
 * @swagger
 * /demandes/all:
 *   get:
 *     summary: Récupérer toutes les demandes de congé (pour l'administrateur/manager)
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Liste des demandes de congé
 *       500:
 *         description: Erreur du serveur
 */
router.get('/all', authenticate, async (req, res) => {
    try {
        const demandes = await DemandeConge.find().populate('user', 'username'); // Populate pour avoir les détails de l'utilisateur
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /demandes/{id}/status:
 *   put:
 *     summary: Approver ou rejeter une demande de congé
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la demande de congé
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Approved, Rejected]
 *     responses:
 *       200:
 *         description: Demande mise à jour avec succès
 *       404:
 *         description: Demande non trouvée
 *       500:
 *         description: Erreur du serveur
 */
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

/**
 * @swagger
 * /demandes/update/{id}/{status}:
 *   patch:
 *     summary: Mettre à jour le statut d'une demande de congé
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la demande de congé
 *         required: true
 *         schema:
 *           type: string
 *       - name: status
 *         in: path
 *         description: Statut à définir ('Pending', 'Approved', 'Rejected')
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Pending, Approved, Rejected]
 *     responses:
 *       200:
 *         description: Demande mise à jour
 *       400:
 *         description: Statut invalide
 *       404:
 *         description: Demande non trouvée
 *       500:
 *         description: Erreur du serveur
 */
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

/**
 * @swagger
 * /demandes/my:
 *   get:
 *     summary: Obtenir les demandes de congé de l'utilisateur connecté
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Liste des demandes de congé de l'utilisateur
 *       500:
 *         description: Erreur du serveur
 */
router.get('/my', authenticate, async (req, res) => {
    try {
        const demandes = await DemandeConge.find({ user: req.user._id });
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
