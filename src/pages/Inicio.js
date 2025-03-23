import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import Login from "./../components/Login";


const Inicio = () => {	

	const { token, handleLogout } = useContext(UserContext);
	

		
	return (		
		<h1>Alguna imagen de los hoteles</h1>				
	);  
}

export default Inicio;
