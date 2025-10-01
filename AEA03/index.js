import express from "express";
import fs from "fs"; //treballar amb arxius
import bodyParser from "body-parser"; //Ho afegim per entendre que estem rebent un json des de la petició post.

//Creo l'objecte de l'aplicació
const app = express();
app.use(bodyParser.json())
app.use(express.static("public"));//carpeta publica pel css
app.set('view engine', 'ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        //console.log(data);
        //console.log(JSON.parse(data));
        return JSON.parse(data)

    } catch (error) {
        console.log(error);
    }
};
//Funció per escriure informació
const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data));

    } catch (error) {
        console.log(error);
    }
}
//Funció per llegir la informació
//readData();

app.get("/", (req, res) => {
    res.send("Wellcome to my first API with Node.js");
});

//Creem un endpoint per obtenir tots els llibres
app.get("/books", (req, res) => {
    const user = { name: "Alex" }
    const htmlMessage = `
        <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
        <a href="https://www.example.com">Visita Example</a>`;
    const data = readData();
    res.render("books", { user, data, htmlMessage })
    //res.json(data.products);

})

app.put("/books/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Book updated successfully" });
});



//Funció per escoltar
app.listen(3000, () => {
    console.log("Server listing on port 3000");
});

// nodemon
// node
// npm
// +?


// cuando este todo, carpeta node modules, -> npm i
// npm run dev

app.get("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const book = data.books.find((book) => book.id === id);

    if (!book) {
        return res.status(404).json("ERROR: BOOK NOT FOUND, TRY A DIFFERENT ONE");
    } else {
        res.json(book);
    }
})

app.post("/books", (req, res) => {
    const data = readData();
    const body = req.body;
    // con los {} el nombre tiene que ser el campo que quieras sacar
    const { name } = req.body;
    console.log("Titol del llibre: ", name)



    // encuentra
    if (!data.books.some((book) => book.name === name)) {
        const newBook = {
            id: data.books.length + 1,
            ...body,
        };

        data.books.push(newBook);
        writeData(data);
        res.json(newBook);
    } else {
        console.log('Existeix');
        return res.status(400).json("Aquest llibre ja existeix");
    }
});

app.delete("/books/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ error: "Book not found" });
    }

    data.books.splice(bookIndex, 1);
    writeData(data);
    res.json({ message: "Book deleted successfully" });
});