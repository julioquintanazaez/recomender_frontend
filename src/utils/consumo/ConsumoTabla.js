import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';

import ActualizarConsumoModal from "./../../utils/consumo/ActualizarConsumoModal";
import EliminarConsumo from "./../../utils/consumo/EliminarConsumo";

		
export default function ProductosTabla ( props ) {

	const {	token } = useContext(UserContext);	
		
	
	const renderTablaData = () => {
		
		return props.consumo?.map((item_consumo, index) => (
				<tr className="row-md" key={item_consumo.id_cliente_producto}>
					<th scope="row">{index + 1}</th>
					<td>{item_consumo.prod_nombre}</td>	
					<td>{item_consumo.cli_pro_valoracion}</td>
					<td>
						<ActualizarConsumoModal consumo={item_consumo}/>
						<EliminarConsumo consumo={item_consumo}/>
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
						<th scope="col">Nombre del producto</th>		
						<th scope="col">Valoración</th>	
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

