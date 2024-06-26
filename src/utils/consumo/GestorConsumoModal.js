import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import ConsumoTabla from "./../../utils/consumo/ConsumoTabla.js";
import CrearConsumoModal from "./../../utils/consumo/CrearConsumoModal.js";

export default function GestorConsumoModal ( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, handleLogout, estadoProductos, estadoConsumo } = useContext(UserContext);
    const [productosClientes, setProductosClientes] = useState([]);
	
	useEffect(() => {
		
		const fetchProductos = async () =>{
			await axios({
				method: 'get',
				url: '/leer_productos_por_cliente/' + props.cliente.id_cliente,                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 201) {
					console.log(response.data);
					setProductosClientes(response.data);
				}else {	
					setProductosClientes([]);
					handleLogout();
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
				handleLogout();
			});		
		};		
		
		fetchProductos();
		
	}, [ estadoProductos, estadoConsumo ]);
  
	const handleClose = () => {
		setShow(false);
	}
	
	const handleShow = () => {
		if (props.cliente.id_cliente != null){	
			setShow(true);  
		}else{
			Swal.fire("Seleccione in cliente para gestionar consumo", "", "error");
		}
	}	
	
	return (
		<>
		<button className={(productosClientes < 1
							? "btn btn-secondary" : "btn btn-warning" )}
						onClick={handleShow}>
			Consumo 
		</button>
		<Modal show={show} onHide={handleClose} size="lg" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Gestión de consumo del cliente
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>				
				<>
					<h2>Productos consumidos por el cliente</h2>
					< CrearConsumoModal cliente={props.cliente}/>
					< ConsumoTabla consumo={productosClientes} />
				</>	
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