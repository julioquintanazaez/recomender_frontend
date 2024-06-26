import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';

import ActualizarProductoModal from "./../../utils/productos/ActualizarProductoModal";
import EliminarProducto from "./../../utils/productos/EliminarProducto";

		
export default function ProductosTabla ( props ) {

	const {	token } = useContext(UserContext);	
		
	
	const renderTablaData = () => {
		
		return props.productos?.map((producto, index) => (
				<tr className="row-md" key={producto.id_producto}>
					<th scope="row">{index + 1}</th>
					<td>{producto.prod_nombre}</td>	
					<td>
						<ActualizarProductoModal producto={producto}/>
						<EliminarProducto producto={producto}/>
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

