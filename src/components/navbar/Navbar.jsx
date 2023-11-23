import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import imgAlice from "../../assets/Alice.png";
import "./navBar.css";
import { logout } from '../../utils/auth';
export const MenuMain = () => {
	return(
    <>
    {[false].map((expand) => (
      <Navbar key={expand} expand={expand} className="bg-body-tertiary">
        <Container fluid>
          <Navbar><Link to={'/Home'} className='option-nav text-decoration-none name-project'>ALICE</Link></Navbar>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end" 
          > 
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >
            <div className="logo-navBar">
                <img src={imgAlice} />
              </div>
              <h1 className='title-nav'>Asistente ALICE</h1>
              <div style={{ display: 'block'}}>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link className='option-nav text-decoration-none text-white' to={'/Home'} >Inicio <div className='option-line01'></div></Link>
                <Nav.Link className='option-nav' href="https://www.youtube.com/shorts/feWo4416W-E" target='_blank'>Que es Alice <div className='option-line01'></div></Nav.Link>
                <Nav.Link className='option-nav' href="https://www.bbva.com/es/innovacion/lean-startup-ejemplos-de-empresas-de-exito/" target='_blank'>Que es Lean StartUp? <div className='option-line02'></div></Nav.Link>
                <Nav.Link className='option-nav' href="https://www.youtube.com/shorts/feWo4416W-E" target='_blank'>Tutorial De ALICE <div className='option-line02'></div></Nav.Link>
                <Link className='option-nav text-decoration-none text-white' to={'/'} onClick={()=>logout()}>Cerrar Sesion</Link>
              </Nav>
              </div>
              <div className='line01'>
              </div>
              <div className='line02'>
              </div>
              <div className='circle-sup'>
              </div>
              <div className='circle-supmid'>
              </div>
              <div className='circle-medio'>
              </div>
              <div className='circle-medio02'>
              </div>
              <div className='circle-mid'>
              </div>
              <div className='circle-mid02'>
              </div>
              <div className='circle-top'>
              </div>
              <div className='circle-main'>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    ))}
  </>    
	)
}
export default MenuMain;