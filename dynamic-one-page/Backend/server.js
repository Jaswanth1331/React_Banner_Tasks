// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Route to get banner settings
app.get('/api/banner', (req, res) => {
    db.query('SELECT * FROM banner_settings ORDER BY id LIMIT 1 OFFSET 1', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            // If there is no second row, fetch the first row (default values)
            db.query('SELECT * FROM banner_settings ORDER BY id LIMIT 1', (err, defaultResults) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.json(defaultResults[0]);
            });
        } else {
            res.json(results[0]);
        }
    });
});

// Route to update banner settings
app.post('/api/banner', (req, res) => {
    const { text, link, timer } = req.body;

    db.query('SELECT * FROM banner_settings ORDER BY id LIMIT 1 OFFSET 1', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (results.length === 0) {
            // If there is no second row, insert a new one
            db.query(
                'INSERT INTO banner_settings (text, link, timer) VALUES (?, ?, ?)',
                [text, link, timer],
                (err, insertResults) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.json({ message: 'Banner created and updated successfully' });
                }
            );
        } else {
            // If the second row exists, update it
            db.query(
                'UPDATE banner_settings SET text = ?, link = ?, timer = ? WHERE id = ?',
                [text, link, timer, results[0].id],
                (err, updateResults) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.json({ message: 'Banner updated successfully' });
                }
            );
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
