import express from 'express';
import fs from 'fs';

const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data));

router.get('/', (req, res) => {
    const user = { name: "Alex" };
    const htmlMessage = `<p>Llistat de jocs disponibles</p>
                         <a href="/">Home</a>`;
    const data = readData();
    res.render("games", { user, data, htmlMessage });
});
router.get('/editGame/:id', (req, res) => {
    const user = { name: "Alex" };
    const htmlMessage = `<p>Llistat de jocs disponibles</p>
    <a href="/games">Llistat de jocs</a>`;

    const data = readData();
    const game = data.games.find(j => j.id === parseInt(req.params.id));

    if (!game) return res.status(404).send('game not found');

    res.render("edit_game", { user, game, htmlMessage });
});

router.get('/:id', (req, res) => {
    const user = { name: "Alex" };
    const htmlMessage = `<p>Llistat de jocs disponibles</p>
                         <a href="/games">Llistat de jocs</a>`;
    const data = readData();
    const game = data.games.find(j => j.id === parseInt(req.params.id));
    if (!game) return res.status(404).send('game not found');
    res.render("game", { user, game, htmlMessage });
});

router.post('/', (req, res) => {
    const data = readData();
    const { name, price, category } = req.body;
    if (!name || !price || !category) return res.status(400).send('All fields are required');
    const newGame = { id: data.games.length + 1, name, price, category };
    data.games.push(newGame);
    writeData(data);
    res.json(newGame);
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

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const gameIndex = data.games.findIndex(p => p.id === id);
    if (gameIndex === -1) return res.status(404).send('Game not found');
    data.games.splice(gameIndex, 1);
    writeData(data);

    // Redirigir a la página anterior
    const backURL = req.get('Referer') || '/games';
    res.redirect(backURL);
});


export default router;
