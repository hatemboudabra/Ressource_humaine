const express = require('express');
const router = express.Router();
const Evaluation = require('../models/Evaluation');
const User = require('../models/User');

// Créer une nouvelle évaluation
router.post('/add', async (req, res) => {
    try {
        // Stocker req.body dans une constante
        const body = req.body;

        // Vérifier si les employés et l'évaluateur existent
        const employeExists = await User.findById(body.employe);
        const evaluateurExists = await User.findById(body.evaluateur);
        if (!employeExists || !evaluateurExists) {
            return res.status(404).json({ success: false, message: 'Employé ou évaluateur non trouvé' });
        }

        // Utiliser la constante body pour créer l'évaluation
        const savedEvaluation = await Evaluation.create(body);

        res.status(201).json({ success: true, data: savedEvaluation });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});


// Lire toutes les évaluations
router.get('/getall', async (req, res) => {
    try {
        const evaluations = await Evaluation.find().populate('employe').populate('evaluateur');
        res.status(200).json(evaluations );
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Lire une évaluation par ID
router.get('/:id', async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id).populate('employe').populate('evaluateur');
        if (!evaluation) {
            return res.status(404).json({ success: false, message: 'Évaluation non trouvée' });
        }
        res.status(200).json(evaluation);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Mettre à jour une évaluation
router.put('/evaluations/:id', async (req, res) => {
    try {
        const { note, commentaires } = req.body;
        const updatedEvaluation = await Evaluation.findByIdAndUpdate(
            req.params.id,
            { note, commentaires },
            { new: true }
        );

        if (!updatedEvaluation) {
            return res.status(404).json({ success: false, message: 'Évaluation non trouvée' });
        }

        res.status(200).json({ success: true, data: updatedEvaluation });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Supprimer une évaluation
router.delete('/:id', async (req, res) => {
    try {
        const deletedEvaluation = await Evaluation.findByIdAndDelete(req.params.id);

        if (!deletedEvaluation) {
            return res.status(404).json({ success: false, message: 'Évaluation non trouvée' });
        }

        res.status(200).json({ success: true, message: 'Évaluation supprimée' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
