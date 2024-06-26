import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../context/UserContext';
import { Navigate, useLocation, Outlet } from 'react-router-dom';


export const ProtectedRoute = ({ isAllowed,
								redirectPath = '/',
								children
								}) => {
									
	const {token} = useContext(UserContext); 
	
	const location = useLocation();	
	
	if (!isAllowed) {
		return (
			<Navigate to={ redirectPath } replace state={{ from: location }} />
		);
	}
	
	return children ? children : <Outlet />;
};
