import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function CrearProductoModal( props ) {
	
	const { token, setEstadoProductos, handleLogout } = useContext(UserContext);
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
							
	const crearProducto = async () => {
		
		await axios({
			method: 'post',
			url: "/producto/crear_producto/",
			data: {
				nombre_producto: formik.values.nombre_producto,
				desc_producto: formik.values.desc_producto
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
		nombre_producto: Yup.string().trim()
			.required("Se requiere el nombre del producto"),
		desc_producto: Yup.string().trim()
			.required("Se requiere la descripción del producto")
	});
	
	const registerInitialValues = {
		nombre_producto: "",
		desc_producto: ""
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Adicionando producto...");
			crearProducto();
			formik.resetForm();
			setShow(false);
			handleClose();
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
					Crear
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="nombre_producto">
						<label>Introduzca el nombre del producto</label>
						<input
						  type="text"
						  name="nombre_producto"
						  value={formik.values.nombre_producto}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.nombre_producto && formik.touched.nombre_producto
										? "is-invalid" : "" )}
						  placeholder="Introduzca el nombre del producto"
						/>					
						<div>{(formik.errors.nombre_producto) ? <p style={{color: 'red'}}>{formik.errors.nombre_producto}</p> : null}</div>
					</div>	
					<div className="form-group mt-3" id="desc_producto">
						<label>Introduzca la descripción del producto</label>
						<textarea
						  rows="3"
						  name="desc_producto"
						  value={formik.values.desc_producto}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.desc_producto && formik.touched.desc_producto
										? "is-invalid" : "" )}
						  placeholder="Descripción para la concertación"
						>	
						</textarea>
						<div>{(formik.errors.desc_producto) ? <p style={{color: 'red'}}>{formik.errors.desc_producto}</p> : null}</div>
					</div>						
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-success">
								Guardar
						</button>					
					</div>		
				</form>
			
			</Modal.Body>
			<Modal.Footer>		
				<Button className="btn btn-secondary" variant="secondary" onClick={handleClose}>
					Cerrar
				</Button>	  
			</Modal.Footer>
			</Modal>
		</>
	);
}