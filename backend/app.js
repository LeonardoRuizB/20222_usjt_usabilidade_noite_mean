require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
app.use(express.json());

//vamos substituir a configuração CORS manual, usando pacote cors
app.use(cors())

// Aqui estamos aplicando um middleware
// CORS: Cross Origin Resource Sharing
//Servidor
// https://localhost:3000
//Cliente
// https://localhost:4200
// hosts são diferentes quando um desses itens (protocolo, host ou porta) são diferentes
//CORS entra em cena e bloqueia requisições por padrão
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type,Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE,OPTIONS"
//   );
//   next();
// });

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_CLUSTER,
  MONGODB_HOST
} = process.env
const urlMongoDB = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.${MONGODB_HOST}.mongodb.net/?retryWrites=true&w=majority`
const Cliente = require ('./models/cliente')

mongoose.connect(urlMongoDB)
.then(response => {
  console.log("Conexão OK")
  //console.log(response)
})
.catch(err => {
  console.log("Conexão NOK")
  console.log(err)
})

const clientes = [
  {
    id: "1",
    nome: "Jose",
    fone: "11223344",
    email: "jose@email.com",
  },
  {
    id: "2",
    nome: "Jaqueline",
    fone: "22112211",
    email: "jaqueline@email.com",
  },
  {
    id: "3",
    nome: "joao",
    fone: "22112211",
    email: "jaqueline@email.com",
  },
];


app.post ('/api/clientes', (req, res) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  })
  console.log(cliente)
  res.status(201).json({mensagem: "Cliente inserido"})
});

app.get("/api/clientes", (req, res) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    clientes: clientes,
  });
});
module.exports = app;
