const express = require('express');
const router = express.Router();
const FeuilleTemps = require('../models/FeuilleTemps');
const User = require('../models/User');
const authenticate = require('../midlware/authenticate'); // Importation du middleware authenticate

// Créer une nouvelle feuille de temps (authentifiée)
router.post('/add', authenticate, async (req, res) => {
    try {
        const body = req.body;

        const employeExists = await User.findById(body.employe);
        if (!employeExists) {
            return res.status(404).json({ success: false, message: 'Employé non trouvé' });
        }

        const savedFeuilleTemps = await FeuilleTemps.create(body);

        res.status(201).json({ success: true, data: savedFeuilleTemps });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Lister toutes les feuilles de temps (authentifiée)
router.get('/getall', authenticate, async (req, res) => {
    try {
        const feuillesTemps = await FeuilleTemps.find().populate('employe').populate('valideParRh');
        res.status(200).json(feuillesTemps);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Lister une feuille de temps par ID (authentifiée)
router.get('/:id', authenticate, async (req, res) => {
    try {
        const feuilleTemps = await FeuilleTemps.findById(req.params.id).populate('employe').populate('valideParRh');
        if (!feuilleTemps) {
            return res.status(404).json({ success: false, message: 'Feuille de temps non trouvée' });
        }
        res.status(200).json(feuilleTemps);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Mettre à jour une feuille de temps (authentifiée)
router.put('/:id', authenticate, async (req, res) => {
    try {
        const updatedFeuilleTemps = await FeuilleTemps.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedFeuilleTemps) {
            return res.status(404).json({ success: false, message: 'Feuille de temps non trouvée' });
        }

        res.status(200).json({ success: true, data: updatedFeuilleTemps });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Supprimer une feuille de temps (authentifiée)
router.delete('/:id', authenticate, async (req, res) => {
    try {
        const deletedFeuilleTemps = await FeuilleTemps.findByIdAndDelete(req.params.id);

        if (!deletedFeuilleTemps) {
            return res.status(404).json({ success: false, message: 'Feuille de temps non trouvée' });
        }

        res.status(200).json({ success: true, message: 'Feuille de temps supprimée' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Obtenir les feuilles de temps par ID d'utilisateur (authentifiée)
router.get('/byuser/:userId', authenticate, async (req, res) => {
    try {
        const { userId } = req.params;

        // Vérifier si l'utilisateur existe
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        // Récupérer les feuilles de temps pour cet utilisateur
        const feuillesTemps = await FeuilleTemps.find({ employe: userId }).populate('employe').populate('valideParRh');
        
        if (feuillesTemps.length === 0) {
            return res.status(404).json({ success: false, message: "Aucune feuille de temps trouvée pour cet utilisateur" });
        }

        res.status(200).json({ success: true, data: feuillesTemps });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});


router.put('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { statut } = req.body;

    // Vérifiez si le statut est valide
    if (!['En attente', 'Validé'].includes(statut)) {
        return res.status(400).json({ message: 'Statut invalide' });
    }

    try {
        // Mise à jour de la feuille de temps
        const feuilleTemps = await FeuilleTemps.findByIdAndUpdate(
            id,
            { statut },
            { new: true } // Retourne le document mis à jour
        );

        if (!feuilleTemps) {
            return res.status(404).json({ message: 'Feuille de temps non trouvée' });
        }

        res.status(200).json(feuilleTemps);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;
