import express from 'express';
import fs from 'fs';

const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data));

router.get('/', (req, res) => {
    const data = readData();
    const user = { name: "Alex" };
    const htmlMessage = `<p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
                         <a href="/">Home</a>`;
    res.render("team", { user, data, htmlMessage });
});

router.get('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const team = data.teams.find(team => team.id === id);
    if (!team) return res.status(404).send('team not found');
    res.json(team);
});

router.post('/', (req, res) => {
    const data = readData();
    const body = req.body;
    const newTeam = { id: data.teams.length + 1, ...body };
    data.teams.push(newTeam);
    writeData(data);
    res.json(newTeam);
});

router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const teamIndex = data.teams.findIndex(team => team.id === id);
    if (teamIndex === -1) return res.status(404).send('team not found');
    data.teams[teamIndex] = { ...data.teams[teamIndex], ...req.body };
    writeData(data);
    res.json({ message: "team updated successfully" });
});

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const teamIndex = data.teams.findIndex(team => team.id === id);
    if (teamIndex === -1) return res.status(404).send('team not found');
    data.teams.splice(teamIndex, 1);
    writeData(data);
    res.json({ message: "team deleted successfully" });
});

export default router;
