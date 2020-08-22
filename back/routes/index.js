const express = require('express');
const Employee = require('../models/index')
const router = express.Router();


router.get('/',(req,res)=>{
    Employee.find({},(error,data)=>{
        res.json(data);
    })
});

router.get('/:id',(req,res)=>{
    Employee.findById(req.params.id,(err,data)=>{
        res.json(data);
    })
});

router.delete('/:id',async(req,res)=>{
    await Employee.findByIdAndDelete(req.params.id)
         res.json({'message':'Empleado eliminado'})
 
 });

 router.post('/',(req,res)=>{
     employee = new Employee({
        empleado:req.body.empleado,
        noEmpleado:req.body.noEmpleado,
        sueldo:req.body.sueldo,
        empresa:req.body.empresa
     })
     employee.save(()=>{
         res.json(employee)
     })
 })

 router.put('/:id',async (req,res)=>{
     await Employee.findByIdAndUpdate(req.params.id,req.body)
     res.json({'mesagge':'Empleado actualizado'})
 })

module.exports= router;