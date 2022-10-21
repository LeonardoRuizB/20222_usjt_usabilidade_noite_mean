require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
app.use(express.json());

//vamos substituir a configuração CORS manual, usando pacote cors
app.use(cors())

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
  cliente.save().then (clienteInserido => {
    console.log(cliente)
    res.status(201).json({
      mensagem: "Cliente inserido",
      id: clienteInserido._id

    })
  })
});

app.get("/api/clientes", (req, res) => {
  Cliente.find().then((documents) => {
  console.log (documents);
  res.status(200).json({
    mensagem: "Tudo OK",
    clientes: clientes,
  });
  });
});

app.delete ('/api/clientes/:id', (req, res, next) => {
  Cliente.deleteOne ({_id: req.params.id}).then((resultado) => {
    console.log (resultado);
    res.status(200).json({mensagem: "Cliente removido"})
    });

 });

module.exports = app;
