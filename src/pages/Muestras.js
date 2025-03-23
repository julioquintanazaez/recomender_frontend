import '../styles/Muestras.css'; 
import React, {useState, useEffect, useContext} from 'react';

import useLoadFreeProductos from "../hooks/useLoadFreeProductos";
import BotonResta from "../components/BotonResta";
import BotonSuma from "../components/BotonSuma";
import useLoadProductosRecomendados from "../hooks/useLoadProductosRecomendados";

const Muestras = () => {	

    const productos = useLoadFreeProductos();
    const productos_recomendados = useLoadProductosRecomendados();
     
    return (		
        <div className="container">
            <div className="products-list">
                <h5>Productos turísticos</h5>
                <div className="grid">
                {productos.map(producto => (
                    <div key={producto.id_producto} className="card">
                    <h5>{producto.nombre_producto}</h5>
                    <p>{producto.desc_producto}</p>
                    <div className="button-container">
                        < BotonSuma producto={producto}/>
                        < BotonResta producto={producto}/>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            <div className="filtered-products">
                <h5>Productos recomendados</h5>
                {productos_recomendados.map(productos => (
                    <div key={productos.id} className="card">
                    <h5>{productos.nombre_producto}</h5>
                    <p>{productos.consumo_producto}</p>
                    </div>
                ))}
                {/* Agrega más cards según sea necesario */}
            </div>
        </div>				
    );  
}

export default Muestras;