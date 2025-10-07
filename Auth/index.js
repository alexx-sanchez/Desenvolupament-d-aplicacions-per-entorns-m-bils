import express from 'express';
import { PORT, SECRET_JWT_KEY } from './config.js';
import { UserRepository } from './user-repository.js';

const app = express();
app.use(express.json());
app.use(express.static("public")); // carregar css

app.set('view engine', 'ejs'); // selecciona EJS como el motor de plantillas para renderizar vistas con HTML
app.set('views', './views');

app.listen(PORT, () => console.log('Server running on port', PORT));

// ENDPOINTS START

app.get("/", (req, res) => {
    // const { user } = req.session
    res.render('register')
});

app.post('/register', async (req, res) => {
    // desestructuramos el body, justo con los campos que queremos
    const { username, password } = req.body
    console.log(req.body);
    try {
        const id = await UserRepository.create({username, password});
        res.send({id});
    } catch (error) {
        
    }
});