const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../db');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/signup.html'));
});

router.post('/', async (req, res) => {
    const { fornavn, epost, passord } = req.body;
    if (!fornavn || !epost || !passord) {
        return res.status(400).json({ message: 'Alle felt må fylles ut' });
    }

    // sjekk om epost allerede finnes
    const eksisterende = db.prepare('SELECT * FROM person WHERE epost = ?').get(epost);
    if (eksisterende) {
        return res.status(409).json({ message: 'Epost er allerede i bruk' });
    }

    try {
        const saltRounds = 10;
        const hashed = await bcrypt.hash(passord, saltRounds);

        const stmt = db.prepare('INSERT INTO person (fornavn, epost, passord) VALUES (?, ?, ?)');
        const info = stmt.run(fornavn, epost, hashed);

        res.status(201).json({ message: 'Bruker opprettet', id: info.lastInsertRowid });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Serverfeil' });
    }
});

module.exports = router;
