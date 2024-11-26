const express = require('express');
const router = express.Router();
const DemandeConge = require('../models/DemandeConge');
const User = require('../models/User'); // Pour les références des utilisateurs
const authenticate = require('../midlware/authenticate'); // Middleware d'authentification


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

router.get('/all', authenticate, async (req, res) => {  
    try {
        // Vérifiez si l'utilisateur a un rôle admin ou manager
        if (req.user.Roles !== 'Admin') {
            return res.status(403).json({ message: 'Accès interdit' });
        }

        const demandes = await DemandeConge.find().populate('user', 'username'); // populate pour avoir les détails de l'utilisateur
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.put('/:id/status', authenticate, async (req, res) => {
    try {
        const { status } = req.body; // 'Approved' ou 'Rejected'
        const demande = await DemandeConge.findById(req.params.id);

        if (!demande) {
            return res.status(404).json({ message: 'Demande non trouvée.' });
        }

        // Vérifiez si l'utilisateur est un admin ou manager
        if (req.user.Roles !== 'Admin' ) {
            return res.status(403).json({ message: 'Accès interdit' });
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

router.delete('/delete/:id', authenticate, async (req, res) => {
    try {
        const demandeId = req.params.id;
        const demande = await DemandeConge.findByIdAndDelete(demandeId);

        if (!demande) {
            return res.status(404).json({ message: 'Demande non trouvée.' });
        }

        res.status(200).json({ message: 'Demande supprimée avec succès.', demande });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

/**
 * @swagger
 * /demandes/{id}:
 *   get:
 *     summary: Récupérer les détails d'une demande de congé par ID
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de la demande de congé
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails de la demande de congé
 *       404:
 *         description: Demande non trouvée
 *       500:
 *         description: Erreur du serveur
 */
router.get('/:id', authenticate, async (req, res) => {
    try {
        const demandeId = req.params.id;

        const demande = await DemandeConge.findById(demandeId).populate('user', 'username email'); // Inclut les détails de l'utilisateur
        if (!demande) {
            return res.status(404).json({ message: 'Demande non trouvée.' });
        }

        res.status(200).json(demande);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = router;
