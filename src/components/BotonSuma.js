import '../styles/BotonesCard.css'; 
import React, { useContext } from 'react';
import axios from 'axios';

import { UserContext } from "../context/UserContext";

const BotonSuma = ( props ) => {
    
    const {token, setEstadoProductos } = useContext(UserContext); 

    const handleClick = async () => {
        await axios({
            method: 'put',
            url: '/producto/incrementar_consumo/' + props.producto.id_producto, 
            headers: {
                'accept': 'application/json',
            },
        }).then(response => {
            if (response.status === 200) {						
                setEstadoProductos("Satisfactoriamente" + Math.random());
			}
			else{
                console.error('Error:', "Algo sucede con la respuesta");
			}
        }).catch((error) => {
            console.error('Error:', error);
        });	 
    };
    
    return (
        <>		
            <button className="btn add" onClick={handleClick}>+</button>
        </>
    );
};

export default BotonSuma;