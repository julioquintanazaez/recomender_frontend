import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function ActualizarClienteModal( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, user, setEstadoClientes, handleLogout } = useContext(UserContext);
	
	const genero = [
					{ value: "M", label: "M" },
					{ value: "F", label: "F" }
				];	
	
	const actualizarCliente = async (id) => {
		
		await axios({
			method: 'put',
			url: "/actualizar_cliente/" + id,
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
				console.log("Cliente actualizado satisfactoriamente");	
				setEstadoClientes("Cliente actualizado satisfactoriamente" + Math.random());
				Swal.fire("Cliente actualizado satisfactoriamente", "", "success");
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
		if (props.cliente.id_cliente != null){	
			setShow(true);  
		}else{
			Swal.fire("Seleccione un cliente para actualizar", "", "error");
		}
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
		cli_nombre: props.cliente.cli_nombre,
		cli_nacionalidad: props.cliente.cli_nacionalidad,
		cli_edad: props.cliente.cli_edad,
		cli_genero: props.cliente.cli_genero
	};
	
	const formik = useFormik({		
		initialValues: registerInitialValues,		
		onSubmit: (values) => {
			console.log("Actiualizando datos...");
			actualizarCliente(props.cliente.id_cliente);
			formik.resetForm();
			setShow(false);
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
		<button className="btn btn-success" onClick={handleShow}>
			Actualizar 
		</button>
		<Modal show={show} onHide={handleClose} size="lm" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Actualizar cliente 
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			
				<form className="form-control" onSubmit={formik.handleSubmit}>
					<div className="form-group mt-3" id="cli_nombre">
						<label>Introduzca nuevo nombre para el cliente</label>
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
						<label>Introduzca nueva nacionalidad para el cliente</label>
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
						<label>Introduzca nueva edad para el cliente</label>
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
						<label>Seleccione nuevo género para el cliente</label>
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
								Actualizar cliente
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