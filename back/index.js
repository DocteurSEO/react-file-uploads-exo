const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
const port = 5100;

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Aucun fichier téléchargé.');
    }
    res.send('Fichier téléchargé avec succès.');
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
