const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
})

router.post('/', async (req, res) => {
    const { epost, passord } = req.body;

    const bruker = db.prepare("SELECT * FROM person WHERE epost = ?").get(epost);
    if(!bruker) {
        return res.status(401).json({ message: "Feil epost eller passord" });        
    }

    // bruk bcrypt for å sammenligne med hashet passord
    const passordErGyldig = await bcrypt.compare(passord, bruker.passord);
    if (!passordErGyldig) {
        return res.status(401).json({message: "Feil epost eller passord" })
    }

    req.session.bruker = { id: bruker.id, fornavn: bruker.fornavn };
    res.json({ message: "Innlogging vellykket" });
})

module.exports = router;