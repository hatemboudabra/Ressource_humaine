const express = require('express');
const router = express.Router();
const FeuilleTemps = require('../models/FeuilleTemps'); 
const User = require('../models/User');
//create feuilleTemps
router.post('/add', async (req, res) => {
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

// List all feuilleTemps
router.get('/getall', async (req, res) => {
    try {
        const feuillesTemps = await FeuilleTemps.find().populate('employe').populate('valideParRh');
        res.status(200).json(feuillesTemps);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// list feuuilleTemps par id
router.get('/:id', async (req, res) => {
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

// update feuilleTemps
router.put('/:id', async (req, res) => {
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

// delete feuille de temps
router.delete('/:id', async (req, res) => {
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

module.exports = router;
