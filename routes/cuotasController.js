const express = require('express');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const routerCuotas = express.Router();

const mysql = require('mysql');
const datos = require('../config/conexion_db');
const conexion = mysql.createConnection(datos);

//GET ALL WITH FILTERS
routerCuotas.get('/', async (req, res) => {
	await conexion.query('SELECT * FROM pagos', (err, results, fields) => {
		if(err) {
			throw err;
		}

		if(results.length !== 0)
				return res.send(results);
		else 
				return res.status(404).send(`No se encontraron tipos de documento`);
		});
});

routerCuotas.get('/:id', async (req, res) => {
	const id = req.params.id;
	await conexion.query(`SELECT * FROM pagos WHERE id = ${id}`, (err, results, fields) => {
		if(err) {
			throw err;
		}

		if(results.length !== 0)
			return res.send(results);
		else 
			return res.status(404).send(`No se encontró un pago con el id ${id}`);
	});
});

routerCuotas.get('/usuario/:id', async (req, res) => {
	const id = req.params.id;
	await conexion.query(`SELECT * FROM pagos WHERE usuario_id = ${id}`, (err, results, fields) => {
		if(err) {
			throw err;
		}

		if(results.length !== 0)
			return res.send(results);
		else 
			return res.status(404).send(`No se encontró un pago para el usuario con id: ${id}`);
	});
});

routerCuotas.put('/:id', jsonParser, async (req, res) => {
    let id = req.params.id;
    let nuevaCuota = req.body;

		await conexion.query(`UPDATE pagos SET estado = '${nuevaCuota.estado}' WHERE id = '${id}'`, (err, results, fields) => {
			if(err) {
					throw err;
				}

				if(nuevaCuota.estado) {
					return res.status(204).send("Editado Exitosamente");	
				} else {
						return res.status(404).send(`Datos enviados no válidos`);
				} 
		}); 
})

module.exports = routerCuotas;
