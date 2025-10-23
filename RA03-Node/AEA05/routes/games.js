import express from 'express';
import fs from 'fs';

const router = express.Router();

// Funciones para leer y escribir el JSON
const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data, null, 2));

router.get('/', (req, res) => {
    const user = { name: "Alex" };
    const htmlMessage = `<p>Llistat de jocs disponibles</p><a href="/">Home</a>`;
    const data = readData();
    res.render("games", { user, data, htmlMessage });
});

router.get('/create', (req, res) => {
    const user = { name: "Alex" };
    res.render('create_game', { user });
});

router.post('/create', (req, res) => {
    const data = readData();
    const { name, category, price, photo } = req.body;

    if (!name || !category || price === undefined || !photo) {
        return res.status(400).send('All fields are required');
    }

    const newGame = {
        id: data.games.length ? data.games[data.games.length - 1].id + 1 : 1,
        name,
        category,
        price: parseFloat(price),
        photo
    };

    data.games.push(newGame);
    writeData(data);

    res.redirect('/games');
});

router.get('/editGame/:id', (req, res) => {
    const data = readData();
    const game = data.games.find(j => j.id === parseInt(req.params.id));
    if (!game) return res.status(404).send('game not found');

    const user = { name: "Alex" };
    const htmlMessage = `<p>Llistat de jocs disponibles</p><a href="/games">Llistat de jocs</a>`;
    res.render("edit_game", { user, game, htmlMessage });
});

router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const gameIndex = data.games.findIndex(p => p.id === id);
    if (gameIndex === -1) return res.status(404).send('Game not found');

    data.games[gameIndex] = { ...data.games[gameIndex], ...req.body };
    writeData(data);
    res.redirect('/games');
});

router.get('/:id', (req, res) => {
    const data = readData();
    const game = data.games.find(j => j.id === parseInt(req.params.id));
    if (!game) return res.status(404).send('game not found');

    const user = { name: "Alex" };
    const htmlMessage = `<p>Llistat de jocs disponibles</p><a href="/games">Llistat de jocs</a>`;
    res.render("game", { user, game, htmlMessage });
});

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const gameIndex = data.games.findIndex(p => p.id === id);
    if (gameIndex === -1) return res.redirect('/games');

    data.games.splice(gameIndex, 1);
    writeData(data);

    res.redirect('/games');
});

export default router;
