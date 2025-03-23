import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './../context/UserContext';
import Logout from "./Logout";
import { Navigate } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router";

import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

import Login from "./../components/Login";

const BarraMenuesNavegacion = ( props ) => {
	
	const { token, usuarioactual, roles } = useContext(UserContext);	
	
	return (
		<>	
			<div className="container-fluid-md">	
				<div className="columns">
					<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="warning">
						<Container>
							<Navbar.Brand href="#inicio">
								Recomendador para hotel
							</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="me-auto">
									{token && (		
									<>
									<LinkContainer to="/">
										<Nav.Link>Inicio</Nav.Link>
									</LinkContainer>
									{roles.includes("admin") && (
									<LinkContainer to="/productos">
										<Nav.Link>Productos</Nav.Link>
									</LinkContainer>
									)}
									{roles.includes("cliente") && (
									<LinkContainer to="/clientes">
										<Nav.Link>Clientes</Nav.Link>
									</LinkContainer>
									)}
									</>
									)}
								</Nav>
								<Login />
								<Logout />
							</Navbar.Collapse>
						</Container>
					</Navbar>						
				</div>				
			</div>	
		</>		
	);
};

export default BarraMenuesNavegacion;