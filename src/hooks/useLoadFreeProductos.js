import React, { useEffect, useRef, useState, useContext } from 'react';
import { UserContext } from "../context/UserContext";
import axios from 'axios'; 

export default function useLoadFreeProductos(){
	
	const { estadoProductos } = useContext(UserContext);
	const [productos, setProductos] = useState([]);	
	
	useEffect(() => {
		
		const fetchProductos = async () =>{
			await axios({
				method: 'get',
				url: '/producto/leer_productos_libres/',  
				headers: {
					'accept': 'application/json',
				},                       
			}).then(response => {
				if (response.status === 200) {
					//console.log(response.data);
					setProductos(response.data);
				}else {	
					setProductos([]);
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
			});		
		};		
		
		fetchProductos();
		
	}, [ estadoProductos ]);
	
	return productos;
};