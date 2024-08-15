const mongoose = require('mongoose');

const databaseUrl = process.env.DATABASE_URL;

console.log(databaseUrl)

async function connectDb(){
    try{
        await mongoose.connect(databaseUrl);
        console.log("Conectado no Banco");
    }catch(err){
        console.log(`Nâo foi possível conectar no banco ${err}`)
    }
}

module.exports = { connectDb }