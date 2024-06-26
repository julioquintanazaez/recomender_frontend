import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';

import ActualizarClienteModal from "./../../utils/clientes/ActualizarClienteModal";
import EliminarCliente from "./../../utils/clientes/EliminarCliente";
import GestorConsumoModal from "./../../utils/consumo/GestorConsumoModal";
import RecomendacionesModal from "./../../utils/productos/RecomendacionesModal";

const ClientesTabla = ( props ) => {

	const {	token } = useContext(UserContext);	
		
	
	const renderTablaData = () => {
		
		return props.clientes?.map((cliente, index) => (
				<tr className="row-md" key={cliente.id_cliente}>
					<th scope="row">{index + 1}</th>
					<td>{cliente.cli_nombre}</td>	
					<td>{cliente.cli_nacionalidad}</td>	
					<td>{cliente.cli_edad}</td>	
					<td>{cliente.cli_genero}</td>
					<td>
						<ActualizarClienteModal cliente={cliente}/>
						<EliminarCliente cliente={cliente}/>
						<GestorConsumoModal cliente={cliente}/>
						<RecomendacionesModal cliente={cliente}/>
					</td>	
				</tr>					
			));
		}

	return (
		<div className="col">            	
            <table className="table table-striped table-bordered" responsive="true">
				<thead className="table-light">
					<tr>
						<th scope="col">#</th>	
						<th scope="col">Nombre</th>			
						<th scope="col">Nacionalidad</th>						
						<th scope="col">Edad</th>
						<th scope="col">Género</th>
						<th scope="col">Acciones</th>
					</tr>
				</thead>
				<tbody className="table-group-divider">						
					{renderTablaData()}								
				</tbody>
			</table>  
        </div>
	);  
}

export default ClientesTabla;