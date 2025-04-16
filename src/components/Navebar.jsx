import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap'; 
import Modal from '../Model';
import Cart from '../screens/Cart';
import { useCart } from '../components/ContextReduser';


const Navbar = () => {
  const navigate = useNavigate();
    let data = useCart();
  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const [cartView , setCartView] = useState(false)

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1" to="/"><h1>PIYUSH</h1></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-4" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) && (
                <li className="nav-item">
                  <Link className="nav-link active fs-4" aria-current="page" to="/myorderData">My Order</Link>
                </li>
              )}
            </ul>

           
            {(!localStorage.getItem("authToken")) ? (
              <div className="d-flex m-2 float-end">
                <Link className="btn btn-outline-light bg-light text-success" aria-current="page" to="/login">Login</Link>
                <Link className="btn btn-outline-light bg-light text-success mx-2" aria-current="page" to="/creatuser">Signup</Link>
              </div>
            ) : (
              <>
                <div className="btn btn-outline-light bg-light text-success" onClick={()=>{setCartView(true)}}>
                  Cart {" "}
                  <Badge pill bg="danger">{data.length}</Badge> 
                </div>
                {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                <div className="btn btn-outline-light bg-danger text-light mx-2" onClick={handleLogout}>Logout</div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
