const express = require('express');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const routerUsuarios = express.Router();

const mysql = require('mysql');
const datos = require('../config/conexion_db');
const conexion = mysql.createConnection(datos);

//GET ALL WITH FILTERS
routerUsuarios.get('/', async (req, res) => {
	await conexion.query('SELECT * FROM usuarios', (err, results, fields) => {
		if(err) {
			throw err;
		}

		if(results.length !== 0)
				return res.send(results);
		else 
				return res.status(404).send(`No se encontraron usuarios`);
		});
})

//GET BY ID
routerUsuarios.get('/:id', async (req, res) => {
	const id = req.params.id;
	usuarios = [];

	await conexion.query(`SELECT * FROM usuarios WHERE id = ${id}`, (err, results, fields) => {
		if(err) {
			throw err;
		}

		if(results.length === 0) {
			return res.status(404).send('Usuario no encontrado');
		}
		
		usuarios = results;
		return res.send(usuarios);
	});
})

//POST
routerUsuarios.post('/', jsonParser, async (req, res) => {
	let nuevoUsuario = req.body;

	console.log(nuevoUsuario.nombre);

	if(nuevoUsuario.nombre !== "") {
		await conexion.query(`INSERT INTO usuarios 
							(nombre, numero_documento, monto_mensual, ahorro_total, tipo_documento_id, rol_id) 
							VALUES ('${nuevoUsuario.nombre}', '${nuevoUsuario.numero_documento}',
									'${nuevoUsuario.monto_mensual}', '${nuevoUsuario.ahorro_total}',
									'${nuevoUsuario.tipo_documento_id}', '${nuevoUsuario.rol_id}')`, 
							(err, results, fields) => {
			if(err) {
					throw err;
				}

				console.log(results.insertId);
				/* conexion.query(`INSERT INTO	pagos (estado, fecha, usuario_id)
							VALUES  ('${0}', '${'2022-12-31 23:59:59'}', '${results.insertId}'),
									('${0}', '${'2023-01-31 23:59:59'}', '${results.insertId}'),
									('${0}', '${'2023-02-31 23:59:59'}', '${results.insertId}'),
									('${0}', '${'2023-03-31 23:59:59'}', '${results.insertId}'),
									('${0}', '${'2023-04-31 23:59:59'}', '${results.insertId}'),
									('${0}', '${'2023-05-31 23:59:59'}', '${results.insertId}'),
									('${0}', '${'2023-06-31 23:59:59'}', '${results.insertId}'),
									('${0}', '${'2023-07-31 23:59:59'}', '${results.insertId}'),
									('${0}', '${'2023-08-31 23:59:59'}', '${results.insertId}'),
									('${0}', '${'2023-09-31 23:59:59'}', '${results.insertId}'),
									('${0}', '${'2023-10-31 23:59:59'}', '${results.insertId}'),
									('${0}', '${'2023-1-31 23:59:59'}', '${results.insertId}')
									`); */

				insertarCuotas(0, '2022-12-31 23:59:59', results.insertId);
			return res.status(204).send("Ingresado Exitosamente");	
		});
	} else {
			return res.status(404).send(`Datos enviados no válidos`);
	}
})

routerUsuarios.put('/:id', jsonParser, async (req, res) => {
    let id = req.params.id;
    let nuevoUsuario = req.body;

	await conexion.query(`UPDATE usuarios SET nombre = '${nuevoUsuario.nombre}', numero_documento = '${nuevoUsuario.numero_documento}',
						  monto_mensual = '${nuevoUsuario.monto_mensual}', ahorro_total = '${nuevoUsuario.ahorro_total}',
						  tipo_documento_id = '${nuevoUsuario.tipo_documento_id}', rol_id = '${nuevoUsuario.rol_id}'
						  WHERE id = '${id}'`, (err, results, fields) => {
		if(err) {
				throw err;
		}


		if(nuevoUsuario.nombre === "" || nuevoUsuario.tipo_documento_id < 1
		   || nuevoUsuario.numero_documento === "" || nuevoUsuario.rol_id < 1) {
			   return res.status(404).send(`Datos enviados no válidos`);
		} else {
			return res.status(200).send('Editado Exitosamente');	
		} 
	});  
})

routerUsuarios.delete('/:id' , async (req, res) => {
    let id = req.params.id;

		await conexion.query(`DELETE FROM usuarios WHERE id = ${id}`, (err, results, fields) => {
			if(err) {
					throw err;
				}
			
			return res.status(200).send(`Eliminado el curso con el indice ${id}`);
		}); 
    
})

const insertarCuotas = async (estado, fecha, usuario_id) => {
	await conexion.query(`INSERT INTO	pagos (estado, fecha, usuario_id)
							VALUES  ('${estado}', '${'2022-12-31 23:59:59'}', '${usuario_id}'),
									('${estado}', '${'2023-01-31 23:59:59'}', '${usuario_id}'),
									('${estado}', '${'2023-02-28 23:59:59'}', '${usuario_id}'),
									('${estado}', '${'2023-03-30 23:59:59'}', '${usuario_id}'),
									('${estado}', '${'2023-04-30 23:59:59'}', '${usuario_id}'),
									('${estado}', '${'2023-05-30 23:59:59'}', '${usuario_id}'),
									('${estado}', '${'2023-06-30 23:59:59'}', '${usuario_id}'),
									('${estado}', '${'2023-07-30 23:59:59'}', '${usuario_id}'),
									('${estado}', '${'2023-08-30 23:59:59'}', '${usuario_id}'),
									('${estado}', '${'2023-09-30 23:59:59'}', '${usuario_id}'),
									('${estado}', '${'2023-10-30 23:59:59'}', '${usuario_id}'),
									('${estado}', '${'2023-01-30 23:59:59'}', '${usuario_id}')
									`)
}


module.exports = routerUsuarios;