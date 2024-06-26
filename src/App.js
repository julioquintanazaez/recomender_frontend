import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ProtectedRoute } from './router/ProtectedRoute';
import { UserContext } from "./context/UserContext";

import Login from "./components/Login";
import BarraMenuesNavegacion from "./components/BarraMenuesNavegacion";
import Inicio from './pages/Inicio.js';
import Clientes from './pages/Clientes.js';


const App = () => {	
	
	const {token, usuarioactual, roles} = useContext(UserContext); 
	
	return (
		<>				
			<BarraMenuesNavegacion />
			<Login />
			{token && (				
				<div className="columns">							
					<Routes>
						<Route index element={<Inicio />} />
						<Route path="/" element={<Inicio />} />	
						<Route element={<ProtectedRoute isAllowed={ roles.includes("admin") } />}>
							<Route path="/clientes" element={< Clientes />} />
						</Route>			
						<Route path="*" element={<p>La página deseada no existe: 404!</p>} />
					</Routes>						
				</div>
			)}				
		</>
	);
};

export default App;