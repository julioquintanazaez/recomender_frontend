import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from './../../context/UserContext';
import Swal from 'sweetalert2';

export default function EliminarConsumo ( props ) {
	
	const { token, setEstadoConsumo, handleLogout } = useContext(UserContext);	
	
	const eliminarConsumo = async (id) => {			
		
		await axios({
			method: 'delete',
			url: "/eliminar_cliente_producto/" + id,			
			headers: {
				'accept': 'application/json',
				'Authorization': "Bearer " + token,
			},
		}).then(response => {
			if (response.status === 201) {
				console.log("Consumo eliminado satisfactoriamente");		
				setEstadoConsumo("Consumo eliminado satisfactoriamente" + Math.random());
				Swal.fire("Consumo eliminado satisfactoriamente", "", "success");
			}
		}).catch((error) => {
			console.error({"message":error.message, "detail":error.response.data.detail});
			handleLogout();
		});
	}
	
	const handleDeleteSubmit = (event) => {
		event.preventDefault();
		if (props.consumo.id_cliente_producto != null){
			eliminarConsumo(props.consumo.id_cliente_producto);
		}else{
			Swal.fire("Seleccione un registro de consumo para eliminar", "", "success");	
		}
	}
	
	return (	
		<>			
			<button type="submit" 
					className="btn btn-danger"
					onClick={(e) => handleDeleteSubmit(e)} > 
					Eliminar
			</button>
		</>
	);
}
