const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification'); 
const User = require('../models/User'); 

// create notif
router.post('/add', async (req, res) => {
    try {
        const body = req.body;
        const rhExists = await User.findById(body.RH);
        if (!rhExists) {
            return res.status(404).json({ success: false, message: 'RH non trouvé' });
        }
        const savedNotification = await Notification.create(body);

        res.status(201).json({ success: true, data: savedNotification });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/getall', async (req, res) => {
    try {
        const notifications = await Notification.find().populate('RH');
        res.status(200).json(notifications);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id).populate('RH');
        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification non trouvée' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedNotification) {
            return res.status(404).json({ success: false, message: 'Notification non trouvée' });
        }

        res.status(200).json({ success: true, data: updatedNotification });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedNotification = await Notification.findByIdAndDelete(req.params.id);

        if (!deletedNotification) {
            return res.status(404).json({ success: false, message: 'Notification non trouvée' });
        }

        res.status(200).json({ success: true, message: 'Notification supprimée' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
