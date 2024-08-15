require('dotenv').config()

const express = require('express');
const db = require('./database/db');
const routes = require("./routes/routes");

const PORT = 8080;
const app = express();

db.connectDb();

app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});