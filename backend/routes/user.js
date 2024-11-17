const express = require('express');
const User = require('../models/User');
const authenticate = require('../midlware/authenticate'); // Middleware d'authentification

const router = express.Router();
// Route pour récupérer les informations de l'utilisateur
router.get('/profile', authenticate, async (req, res) => {
    try {
        const userId = req.user._id; // Récupérer l'ID de l'utilisateur authentifié
        const user = await User.findById(userId).select('-password'); // Exclure le mot de passe

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json(user); // Retourner les informations de l'utilisateur
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});


/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Mettre à jour les informations personnelles de l'utilisateur
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur mises à jour avec succès
 *       400:
 *         description: Erreur de validation des données
 *       401:
 *         description: Utilisateur non authentifié
 *       404:
 *         description: Utilisateur non trouvé
 */
router.put('/profile', authenticate, async (req, res) => {
    try {
        const { username, email } = req.body;
        const userId = req.user._id; // Récupérer l'ID de l'utilisateur connecté à partir du token

        // Vérification des données reçues
        if (!username && !email) {
            return res.status(400).json({ message: 'Aucune donnée à mettre à jour.' });
        }

        // Trouver l'utilisateur et mettre à jour ses informations
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Mettre à jour les informations
        if (username) {
            user.username = username;
        }       
        if (email) {
            // Validation de l'email
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'Email invalide' });
            }
            user.email = email;
        }

        // Sauvegarder les modifications
        await user.save();

        res.status(200).json({ message: 'Informations mises à jour avec succès', user });
    } catch (error) {
        console.error(error); // Afficher l'erreur pour le débogage
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

module.exports = router;
