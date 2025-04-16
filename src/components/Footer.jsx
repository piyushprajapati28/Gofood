import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <footer className="bg-success py-3 my-4 ">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3 text-light">
                    <li className="nav-item"><Link to="/" className="nav-Link px-2 text-light fs-5">Home</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-Link px-2 text-light fs-5">Features</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-Link px-2 text-light fs-5">Pricing</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-Link px-2 text-light fs-5">FAQs</Link></li>
                    <li className="nav-item"><Link to="/" className="nav-Link px-2 text-light fs-5">About</Link></li>
                </ul>
                <p className=" text-center fs-5 text-light cursor-pointer">© 2025 Piyush Kumar</p>
            </footer>
        </div>
    )
}

export default Footer