const express = require('express');
const router = express.Router();
const Rapport = require('../models/Rapport'); 
const User = require('../models/User'); 

router.post('/add', async (req, res) => {
    try {
        const body = req.body;

        const employeExists = await User.findById(body.employe);
        if (!employeExists) {
            return res.status(404).json({ success: false, message: 'Employé non trouvé' });
        }

        const savedRapport = await Rapport.create(body);

        res.status(201).json({ success: true, data: savedRapport });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/getall', async (req, res) => {
    try {
        const rapports = await Rapport.find().populate('employe');
        res.status(200).json(rapports);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const rapport = await Rapport.findById(req.params.id).populate('employe');
        if (!rapport) {
            return res.status(404).json({ success: false, message: 'Rapport non trouvé' });
        }
        res.status(200).json(rapport);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedRapport = await Rapport.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedRapport) {
            return res.status(404).json({ success: false, message: 'Rapport non trouvé' });
        }

        res.status(200).json({ success: true, data: updatedRapport });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedRapport = await Rapport.findByIdAndDelete(req.params.id);

        if (!deletedRapport) {
            return res.status(404).json({ success: false, message: 'Rapport non trouvé' });
        }

        res.status(200).json({ success: true, message: 'Rapport supprimé' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
