import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function CrearClienteModal( props ) {
	
	const { token, setEstadoClientes, handleLogout } = useContext(UserContext);	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	
	const genero = [
					{ value: "M", label: "M" },
					{ value: "F", label: "F" }
				];	
	
	const crearCliente = async () => {
		
		await axios({
			method: 'post',
			url: "/crear_cliente/",
			data: {
				cli_nombre : formik.values.cli_nombre,
				cli_nacionalidad : formik.values.cli_nacionalidad,
				cli_edad : formik.values.cli_edad,
				cli_genero : formik.values.cli_genero
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Cliente creado satisfactoriamente");	
				setEstadoClientes("Cliente creado satisfactoriamente" + Math.random());
				Swal.fire("Cliente creado satisfactoriamente", "", "success");
			}
		}).catch((error) => {
			if (error.response.status === 500) {
				Swal.fire("Datos exisaten en la base de datos", "", "success");
			}else{
				console.error({"message":error.message, "detail":error.response.data.detail});
				handleLogout();
			}
		});				  
	}
  
	const handleClose = () => {
		setShow(false);
	}
	
	const handleShow = () => {		
		setShow(true);  
	}
	
	const validationRules = Yup.object().shape({		
		cli_nombre: Yup.string().trim()
			.required("Se requiere el nombre"),
		cli_nacionalidad: Yup.string().trim()
			.required("Se requiere la nacionalidad"),
		cli_edad: Yup.number().positive()
			.required("Se requiere la edad"),
		cli_genero: Yup.string().trim()
			.required("Se requiere seleccione el género")
	});
	
	const registerInitialValues = {
		cli_nombre: "",
		cli_nacionalidad: "",
		cli_edad: 1,
		cli_genero: genero[0]["value"]
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Guardar datos...");
			crearCliente();
			formik.resetForm();
		},
		validationSchema: validationRules
	});
	
	const RenderOptions = (listValues) => {
		return (
			listValues.map(item => 
				<option value={item.value} label={item.label}>{item.value}</option>
			) 
		)
	};
	
	return (
		<>
		<button className="btn btn-info" onClick={handleShow}>
			Nuevo cliente 
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Nuevo cliente
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="cli_nombre">
						<label>Introduzca el nombre del cliente</label>
						<input
						  type="text"
						  name="cli_nombre"
						  value={formik.values.cli_nombre}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.cli_nombre && formik.touched.cli_nombre
										? "is-invalid" : "" )}
						  placeholder="Introduzca el nombre del cliente"
						/>					
						<div>{(formik.errors.cli_nombre) ? <p style={{color: 'red'}}>{formik.errors.cli_nombre}</p> : null}</div>
					</div>		
					<div className="form-group mt-3" id="cli_nacionalidad">
						<label>Introduzca la nacionalidad del cliente</label>
						<input
						  type="text"
						  name="cli_nacionalidad"
						  value={formik.values.cli_nacionalidad}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.cli_nacionalidad && formik.touched.cli_nacionalidad
										? "is-invalid" : "" )}
						  placeholder="Introduzca la nacionalidad del cliente"
						/>					
						<div>{(formik.errors.cli_nacionalidad) ? <p style={{color: 'red'}}>{formik.errors.cli_nacionalidad}</p> : null}</div>
					</div>		
					<div className="form-group mt-3" id="cli_edad">
						<label>Introduzca la edad del cliente</label>
						<input
						  type="number"
						  name="cli_edad"
						  value={formik.values.cli_edad}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.cli_edad && formik.touched.cli_edad
										? "is-invalid" : "" )}
						  placeholder="Introduzca la edad del cliente"
						/>					
						<div>{(formik.errors.cli_edad) ? <p style={{color: 'red'}}>{formik.errors.cli_edad}</p> : null}</div>
					</div>		
					<div className="form-group mt-3" id="cli_genero">
						<label>Seleccione el género para el cliente</label>
						<select
						  type="text"
						  name="cli_genero"
						  value={formik.values.cli_genero}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.cli_genero && formik.touched.cli_genero
										? "is-invalid" : "" )
									}>
							{RenderOptions(genero)} 
						<option value="" label="Seleccione una opción">Seleccione una opción</option>	
						</select>
						<div>{(formik.errors.cli_genero) ? <p style={{color: 'red'}}>{formik.errors.cli_genero}</p> : null}</div>
					</div>							
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-success">
								Crear cliente
						</button>					
					</div>		
				</form>
			
			</Modal.Body>
			<Modal.Footer>		
				<Button className="btn btn-secondary" variant="secondary" onClick={handleClose}>
					Close
				</Button>	  
			</Modal.Footer>
			</Modal>
		</>
	);
}