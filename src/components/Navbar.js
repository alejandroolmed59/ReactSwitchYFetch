import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import {Link} from 'react-router-dom'

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="black" light expand="md">
        <NavbarBrand href="/">Red Social Cool</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink onClick={props.clickHome}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={props.clickPerfil}>Mi perfil</NavLink>
            </NavItem>
            <NavItem>
             <Link to='/login' onClick={props.clickCerrarSesion}><NavLink >Cerrar Sesion</NavLink> </Link> 
            </NavItem>
            
          </Nav>
          <NavbarText>José Alejandro Olmedo Araniva</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;