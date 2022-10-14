const mongoose = require ('mongoose')

//definido o schema
const clienteSchema = mongoose.Schema({
  nome: {type: String, required: true},
  fone: {type: String, required: false, default: '00000000'},
  email: {type: String, required: true}
})

module.exports = mongoose.model('Cliente', clienteSchema)
