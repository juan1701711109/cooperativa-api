const express = require('express');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const routerRoles = express.Router();

const mysql = require('mysql');
const datos = require('../config/conexion_db');
const conexion = mysql.createConnection(datos);



//GET ALL WITH FILTERS
routerRoles.get('/', (req, res) => {
    conexion.query('SELECT * FROM roles', (err, results, fields) => {
        if(err) {
          throw err;
        }
      
        results.forEach(result => {
          console.log(result);
        });
        res.send(results);
      });
})

//GET BY ID
routerRoles.get('/:id',async (req, res) => {
    const id = req.params.id;
    roles = [];
    await conexion.query(`SELECT * FROM roles WHERE id = ${id}`, (err, results, fields) => {
        roles = results;
        console.log(results)
        if(roles !== [])
            return res.send(roles);
        else 
            return res.status(404).send(`No se encontró un rol con el id ${id}`);

      });

})

//POST
routerRoles.post('/', jsonParser, (req, res) => {
    let nuevoCurso = req.body;

    programacion.push(nuevoCurso);
    res.send(programacion);
})

routerRoles.put('/:id', jsonParser, (req, res) => {
    let id = req.params.id;
    let nuevoCurso = req.body;

    let pos = programacion.findIndex(curso => curso.id == id);
    
    if(pos === -1) {
        return res.status(404).send(`No se encontró un curso con el id ${id}`);
    }

    programacion[pos] = nuevoCurso;
    
    return res.send(programacion[pos]);
})

routerRoles.delete('/:id' , (req, res) => {
    let id = req.params.id;

    let pos = programacion.findIndex(curso => curso.id == id);
    
    if(pos === -1) {
        return res.status(404).send(`No se encontró un curso con el id ${id}`);
    }

    programacion.splice(pos, 1);

    return res.send(`Eliminado el curso con el indice ${id}`);
})

module.exports = routerRoles;