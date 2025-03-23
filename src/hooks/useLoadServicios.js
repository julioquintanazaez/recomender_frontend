import React, { useEffect, useRef, useState, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import axios from 'axios'; 

export default function useLoadServicios(){
	
	const {token, handleLogout,
		   estadoClientes, estadoProductos, estadoServicios
		   } = useContext(UserContext);
	const [servicios, setServicios] = useState([]);	
	
	useEffect(() => {
		
		const fetchServicios = async () =>{
			await axios({
				method: 'get',
				url: '/servicio/leer_servicios/',                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 201) {
					//console.log(response.data);
					setServicios(response.data);
				}else {	
					setServicios([]);
					handleLogout();
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
				handleLogout();
			});		
		};		
		
		fetchServicios();
		
	}, [ estadoClientes, estadoProductos, estadoServicios ]);
	
	return servicios;
};