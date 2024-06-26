import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ( props ) => {
	
	const [token, setToken] = useState(window.localStorage.getItem("recomendador-applicacion-v1.0"));
	const [usuarioactual, setUsuarioActual] = useState({});
	const [roles, setRoles] = useState([]);
	const [estadoUsuarios, setEstadoUsarios] = useState("");
	const [estadoClientes, setEstadoClientes] = useState("");
	const [estadoProductos, setEstadoProductos] = useState("");
	const [estadoConsumo, setEstadoConsumo] = useState("");
	
	useEffect(() => {
		
		const fetchUsuarioActual = async () =>{
			await axios({
				method: 'get',
				url: '/users/me/',                         
				headers: {
					'accept': 'application/json',
					'Authorization': "Bearer " + token,  
				},
			}).then(response => {
				if (response.status === 200) {						
					console.log("Acceso satisfactorio...");
					setUsuarioActual(response.data);		
					setRoles(response.data.role);						
					window.localStorage.setItem("recomendador-applicacion-v1.0", token);	
				}else {	
					console.log("No existe el token");
					handleLogout();
				}
			}).catch((error) => {
				console.error({"message":error.message, "detail":error.response.data.detail});
				handleLogout();
			});		
		};		
		
		fetchUsuarioActual();
		
	}, [token]);
	
	const handleLogout =() => {
		setToken(null);
		setRoles([]);	
		window.localStorage.removeItem("recomendador-applicacion-v1.0");
	};
	
	return (
		<UserContext.Provider value={{
			token, setToken,
			usuarioactual, roles, handleLogout, 			
			estadoUsuarios, setEstadoUsarios,
			estadoClientes, setEstadoClientes,
			estadoProductos, setEstadoProductos,
			estadoConsumo, setEstadoConsumo
		}}>
			{ props.children }
		</UserContext.Provider>
	);
};