import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function CrearProductosModal( props ) {
	
	const { token, setEstadoProductos, handleLogout } = useContext(UserContext);
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
							
	const crearProducto = async () => {
		
		await axios({
			method: 'post',
			url: "/crear_producto/",
			data: {
				prod_nombre: formik.values.prod_nombre
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Producto adicionado satisfactoriamente");	
				setEstadoProductos("Producto adicionado satisfactoriamente" + Math.random());
				Swal.fire("Producto adicionado satisfactoriamente", "", "success");
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
		prod_nombre: Yup.string().trim()
			.required("Se requiere el nombre del producto")	
	});
	
	const registerInitialValues = {
		prod_nombre: ""
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Adicionando producto...");
			crearProducto();
			formik.resetForm();
			setShow(false);
		},
		validationSchema: validationRules
	});
	
	return (
		<>
		<button className="btn btn-success" onClick={handleShow}>
			Nuevo producto 
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Crear producto
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="prod_nombre">
						<label>Introduzca el nombre del cliente</label>
						<input
						  type="text"
						  name="prod_nombre"
						  value={formik.values.prod_nombre}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.prod_nombre && formik.touched.prod_nombre
										? "is-invalid" : "" )}
						  placeholder="Introduzca el nombre del producto"
						/>					
						<div>{(formik.errors.prod_nombre) ? <p style={{color: 'red'}}>{formik.errors.prod_nombre}</p> : null}</div>
					</div>						
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-success">
								Crear producto
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