import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import { Link, useNavigate, useLocation } from "react-router-dom"
import newRequest from '../../utils/newRequest'

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("userFiverr"))
  const { pathname } = useLocation();
  const navigate = useNavigate()

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', isActive);

    return () => {
      window.removeEventListener('scroll', isActive);
    }
  }, [])

  // logout
  const handleLogout = async () => {
    await newRequest.post("/auth/logout")
    navigate("/")
    localStorage.setItem("userFiverr", null)
  }

  return (
    <div className={`${active || pathname !== "/" ? 'navbar active' : 'navbar'}`}>
      <div className="container">
        <div className="logo">
          <Link to="/" className='link'>
            <span className='text'>fiverr</span>
          </Link>
          <span className='dot'>.</span>
        </div>

        <div className="links">
          <span>Five Business</span>
          <span>Explore</span>
          <span>English</span>
          <span>Sign in</span>
          {!currentUser?.isSeller && <Link className='link' to={"/register"}><span>Become a Seller</span></Link>}
          {!currentUser && <Link className='link' to={"/login"}><button>Login</button></Link>}
          {currentUser && (
            <div className='user' onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser.username}</span>
              {open &&
                (
                  <div className="options">
                    {
                      currentUser?.isSeller && (
                        <>
                          <Link to="/gigs" className='link'>
                            <span>Gigs</span>
                          </Link>
                          <Link to="/add" className='link'>
                            <span>Add New Gig</span>
                          </Link>
                        </>
                      )
                    }
                    <Link to="/orders" className='link'><span>Orders</span></Link>
                    <Link to="/messages" className='link'><span>Messages</span></Link>
                    <Link onClick={handleLogout} className='link'><span>Logout</span></Link>
                  </div>
                )
              }
            </div>
          )}
        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className='link menuLink' to="/">Graphics & Design</Link>
            <Link className='link' to="/">Video & Animation</Link>
            <Link className='link' to="/">Writing & Translation</Link>
            <Link className='link' to="/">AI Services</Link>
            <Link className='link' to="/">Digital Marketing</Link>
            <Link className='link' to="/">Music & Audio</Link>
            <Link className='link' to="/">Programming & Tech</Link>
            <Link className='link' to="/">Business</Link>
            <Link className='link' to="/">Lifestyle</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Navbar