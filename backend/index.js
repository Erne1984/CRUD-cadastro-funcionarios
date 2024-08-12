const express = require('express');

const PORT = 8080;
const app = express();


app.get("/", (req, res) => {

    res.send("Olá mundo");
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})