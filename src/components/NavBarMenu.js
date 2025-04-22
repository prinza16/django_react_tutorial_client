import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NavBarMenu = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Navbar.Brand href="#home">Products</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav className="me-auto">
                <NavLink className="show-products-nav" to="/">Products</NavLink>
                <NavLink className="add-product-nav" to="/addProduct">Add Product</NavLink>
            </Nav>
    </Navbar>
    </div>
  )
}

export default NavBarMenu
