const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     description: Cette route permet de créer un nouvel utilisateur dans la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur lors de l'enregistrement de l'utilisateur
 */
router.post('/register', async (req, res) => {
    try {
        const userq = req.body;
        const user = new User(userq);
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        
        if (!user) {
            return res.status(404).send('User not found');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if (!isPasswordMatch) {
            return res.status(401).send('Password is invalid');
        }

        // Crée le token avec l'ID de l'utilisateur et son rôle
        const token = jwt.sign({ _id: user._id, role: user.Roles }, process.env.JWT_SECRET);

        // Renvoie le token et les détails de l'utilisateur
        res.send({
            token: token,
            user: {
                id: user._id,
                role: user.Roles  // Utilise 'Roles' ici aussi
            }
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;
