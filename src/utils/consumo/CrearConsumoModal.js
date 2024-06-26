import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useLoadProductos from "./../../hooks/useLoadProductos";

export default function CrearConsumoModal( props ) {
	
	const { token, setEstadoConsumo, handleLogout } = useContext(UserContext);
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const productos = useLoadProductos(); 
	
							
	const crearConsumo = async () => {
		
		await axios({
			method: 'post',
			url: "/crear_cliente_producto/",
			data: {
				cli_pro_valoracion : formik.values.cli_pro_valoracion,
				cliente_pro_id : props.cliente.id_cliente,
				producto_cli_id : formik.values.producto_cli_id,
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Consumo adicionado satisfactoriamente");	
				setEstadoConsumo("Consumo adicionado satisfactoriamente" + Math.random());
				Swal.fire("Consumo adicionado satisfactoriamente", "", "success");
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
		if (props.cliente.id_cliente != null){	
			setShow(true);  			
		}else{
			Swal.fire("Seleccione un cliente para adicionar registros a su consumo", "", "error");
		}
	}
	
	const digitsOnly = (value) => /^\d+$/.test(value) //--:/^[0-9]d+$/
	//.test("Solo números", "Introduzca valores numéricos", digitsOnly),
	
	const validationRules = Yup.object().shape({		
		cli_pro_valoracion: Yup.number()
			.min(-1.0, "El valor para la valoración debe estar entre 0.0 y 5.0")
			.max(5.0, "El valor para la valoración debe estar entre 0.0 y 5.0")
			.required("Se requiere la valoración para el producto"),			
		producto_cli_id: Yup.string().trim()			
			.required("Se requiere seleccione un producto")		
	});
	
	const registerInitialValues = {
		cli_pro_valoracion: 0.0,
		producto_cli_id: ""
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			//console.log(values);
			crearConsumo();
			formik.resetForm();
			setShow(false);
		},
		validationSchema: validationRules
	});
	
	const RenderProductos = () => {
		return (			
			productos.map(item => 
				<option value={item.id_producto} label={item.prod_nombre}>{item.prod_nombre}</option>				
			) 
		)
	};	
	
	return (
		<>
		<button className="btn btn-success" onClick={handleShow}>
			Nuevo consumo 
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Crear consumo
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="producto_cli_id">
						<label>Seleccione un producto para adicionar al consumo</label>
						<select
						  type="text"
						  name="producto_cli_id"
						  value={formik.values.producto_cli_id}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.producto_cli_id && formik.touched.producto_cli_id
										? "is-invalid" : "" )
									}>
							{RenderProductos()}
							<option value="" label="Seleccione una opción">Seleccione una opción</option>	
						</select>									
						<div>{(formik.errors.producto_cli_id) ? <p style={{color: 'red'}}>{formik.errors.producto_cli_id}</p> : null}</div>
					</div>	
					<div className="form-group mt-3" id="cli_pro_valoracion">
						<label>Introduzca la valoración para el producto</label>
						<input
						  type="number"
						  name="cli_pro_valoracion"
						  value={formik.values.cli_pro_valoracion}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.cli_pro_valoracion && formik.touched.cli_pro_valoracion
										? "is-invalid" : "" )}
						  placeholder="Introduzca la valoración para el producto"
						/>					
						<div>{(formik.errors.cli_pro_valoracion) ? <p style={{color: 'red'}}>{formik.errors.cli_pro_valoracion}</p> : null}</div>
					</div>						
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-success">
								Crear consumo
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