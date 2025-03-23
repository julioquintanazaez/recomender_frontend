import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import GestorCliente from "./../utils/clientes/GestorCliente";

const Clientes = () => {	

	const { token, handleLogout } = useContext(UserContext);
	
	return (	
		<>
			<h1>Todo sobre los clientes</h1>
			
			< GestorCliente />
		</>
	);  
}

export default Clientes;
