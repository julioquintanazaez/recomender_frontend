import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from './../context/UserContext';
import axios from 'axios';

import GestorProductos from "./../utils/productos/GestorProductos";

const Productos = () => {	

    const { token, handleLogout } = useContext(UserContext);
        
    return (	
        <>
            <h1>Todo sobre los productos</h1>
            
            < GestorProductos />
        </>
    );  
}

export default Productos;
