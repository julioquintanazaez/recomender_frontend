import React, {useState, useEffect, useContext} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import ProductosTabla from "./../../utils/productos/ProductosTabla.js";
import CrearProductoModal from "./../../utils/productos/CrearProductoModal.js";
import useLoadProductos from "./../../hooks/useLoadProductos";

export default function GestorProductosModal ( props ) {
	
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const { token, handleLogout, estadoProductos } = useContext(UserContext);
    const productos = useLoadProductos();
	  
	const handleClose = () => {
		setShow(false);
	}
	
	const handleShow = () => {
		setShow(true)
	}	
	
	return (
		<>
		<button className="btn btn-warning" onClick={handleShow}>
			Productos 
		</button>
		<Modal show={show} onHide={handleClose} size="lg" > 
			<Modal.Header closeButton className="header-modal">
				<Modal.Title>
					Gestión de productos
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>				
				<>
					<h2>Productos en el stock del hotel</h2>
					< CrearProductoModal cliente={props.cliente}/>
					< ProductosTabla productos={productos} />
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