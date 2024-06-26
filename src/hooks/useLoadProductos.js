import React, { useEffect, useRef, useState, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import axios from 'axios'; 

export default function useLoadClientes(){
	
	const {token, handleLogout,
		   estadoClientes, estadoProductos
		   } = useContext(UserContext);
	const [productos, setProductos] = useState([]);	
	
	useEffect(() => {
		
		const fetchProductos = async () =>{
			await axios({
				method: 'get',
				url: '/leer_productos/',                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 201) {
					//console.log(response.data);
					setProductos(response.data);
				}else {	
					setProductos([]);
					handleLogout();
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
				handleLogout();
			});		
		};		
		
		fetchProductos();
		
	}, [ estadoClientes, estadoProductos ]);
	
	return productos;
};