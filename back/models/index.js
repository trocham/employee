const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

newSchema = new Schema({
    empleado:String,
    noEmpleado:Number,
    sueldo:Number,
    empresa:String
})

module.exports = mongoose.model('Employee',newSchema);