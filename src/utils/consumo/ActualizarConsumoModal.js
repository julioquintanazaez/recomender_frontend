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

export default function ActualizarConsumoModal( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, setEstadoConsumo, handleLogout } = useContext(UserContext);
	const productos = useLoadProductos(); 
	
	const actualizarConsumo = async (id) => {
		
		await axios({
			method: 'put',
			url: "/actualizar_cliente_producto/" + id,
			data: {
				cli_pro_valoracion : formik.values.cli_pro_valoracion			
			},
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Consumo actualizado satisfactoriamente");
				setEstadoConsumo("Consumo actualizado satisfactoriamente" + Math.random());
				Swal.fire("Consumo actualizado satisfactoriamente", "", "success");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});				  
	}
  
	const handleClose = () => {
		setShow(false);
	}
	
	const handleShow = () => {
		if (props.consumo.id_cliente_producto != null){	
			setShow(true);  
		}else{
			Swal.fire("Seleccione un registro de consumo para actualizar", "", "error");
		}
	}
	
	const validationRules = Yup.object().shape({		
		cli_pro_valoracion: Yup.number()
			.min(-1, "El valor para la valoraci¨®n debe estar entre 0 y 5")
			.max(5.0, "El valor para la valoraci¨®n debe estar entre 0 y 5")
			.required("Se requiere la valoraci¨®n para el producto"),		
	});
	
	const registerInitialValues = {
		cli_pro_valoracion: props.consumo.cli_pro_valoracion
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Actualizando consumo...");
			actualizarConsumo(props.consumo.id_cliente_producto);
			formik.resetForm();
			setShow(false);
		},
		validationSchema: validationRules
	});	
	
	return (
		<>
		<button className="btn btn-success" onClick={handleShow}>
			Actualizar 
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Actualizar
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>					
					<div className="form-group mt-3" id="cli_pro_valoracion">
						<label>Introduzca un nuevo valor para la valoracion para el consumo</label>
						<input
						  type="number"
						  name="cli_pro_valoracion"
						  value={formik.values.cli_pro_valoracion}
						  onChange={formik.handleChange}
						  onBlur={formik.handleBlur}
						  className={"form-control mt-1" + 
										(formik.errors.cli_pro_valoracion && formik.touched.cli_pro_valoracion
										? "is-invalid" : "" )}
						  placeholder="Introduzca un nuevo valor para la valoracion"
						/>					
						<div>{(formik.errors.cli_pro_valoracion) ? <p style={{color: 'red'}}>{formik.errors.cli_pro_valoracion}</p> : null}</div>
					</div>		
					
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-success">
								Actualizar consumo
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