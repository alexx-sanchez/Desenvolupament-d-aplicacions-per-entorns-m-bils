import express from 'express';
import fs from 'fs';

const router = express.Router();

// Funciones para leer y escribir el JSON
const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data, null, 2));

router.get('/', (req, res) => {
    const data = readData();
    const user = { name: "Alex" };
    res.render("teams", { user, data });
});

router.get('/create', (req, res) => {
    const user = { name: "Alex" };
    res.render('create_team', { user });
});

router.post('/create', (req, res) => {
    const data = readData();
    const { name, country, worldChampionships, photo } = req.body;

    if (!name || !country || worldChampionships === undefined || !photo) {
        return res.status(400).send('All fields are required');
    }

    const newTeam = {
        id: data.teams.length ? data.teams[data.teams.length - 1].id + 1 : 1,
        name,
        country,
        worldChampionships: parseInt(worldChampionships),
        photo
    };

    data.teams.push(newTeam);
    writeData(data);

    res.redirect('/teams');
});

router.get('/editTeam/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const team = data.teams.find(team => team.id === id);
    if (!team) return res.status(404).send('team not found');

    const user = { name: "Alex" };
    res.render("edit_team", { user, team });
});

router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const teamIndex = data.teams.findIndex(team => team.id === id);
    if (teamIndex === -1) return res.status(404).send('team not found');

    data.teams[teamIndex] = { ...data.teams[teamIndex], ...req.body };
    writeData(data);
    res.redirect('/teams');
});

router.get('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const team = data.teams.find(team => team.id === id);
    if (!team) return res.status(404).send('team not found');

    const user = { name: "Alex" };
    res.render("team", { user, team });
});

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const teamIndex = data.teams.findIndex(team => team.id === id);
    if (teamIndex === -1) return res.redirect('/teams'); // Si no existe, redirige al listado

    data.teams.splice(teamIndex, 1);
    writeData(data);

    res.redirect('/teams');
});

export default router;
