import express from 'express';
import fs from 'fs';

const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data));

// Listado de equipos
router.get('/', (req, res) => {
    const data = readData();
    const user = { name: "Alex" };
    const htmlMessage = `<a href="/">Home</a>`;
    res.render("teams", { user, data, htmlMessage });
});

// Detalle de equipo
router.get('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const team = data.teams.find(team => team.id === id);
    if (!team) return res.status(404).send('team not found');

    const user = { name: "Alex" };
    const htmlMessage = `<a href="/teams">Llistat d'equips</a>`;
    res.render("team", { user, team, htmlMessage });
});

// Editar equipo (formulario)
router.get('/editTeam/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const team = data.teams.find(team => team.id === id);
    if (!team) return res.status(404).send('team not found');

    const user = { name: "Alex" };
    const htmlMessage = `<a href="/teams">Llistat d'equips</a>`;
    res.render("edit_team", { user, team, htmlMessage });
});

// Crear nuevo equipo
router.post('/', (req, res) => {
    const data = readData();
    const { name, country, worldChampionships } = req.body;
    if (!name || !country || worldChampionships === undefined) return res.status(400).send('All fields are required');

    const newTeam = { id: data.teams.length + 1, name, country, worldChampionships: parseInt(worldChampionships) };
    data.teams.push(newTeam);
    writeData(data);
    res.redirect('/teams');
});

// Editar equipo existente
router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const teamIndex = data.teams.findIndex(team => team.id === id);
    if (teamIndex === -1) return res.status(404).send('team not found');

    data.teams[teamIndex] = { ...data.teams[teamIndex], ...req.body };
    writeData(data);
    res.redirect('/teams');
});

// Eliminar equipo y redirigir a la lista
router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const teamIndex = data.teams.findIndex(team => team.id === id);
    if (teamIndex === -1) return res.status(404).send('team not found');

    data.teams.splice(teamIndex, 1);
    writeData(data);

    const backURL = req.get('Referer') || '/teams';
    res.redirect(backURL);
});

export default router;
