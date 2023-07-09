import React, { useState } from "react";
import "./Register.scss";
import upload from '../../utils/upload'
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: ""
  })

  const [file, setFile] = useState(null)
  const navigate = useNavigate()

  // handle change inputs:
  const handleChange = (e) => {
    setUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // handle change isSeller
  const handleSeller = (e) => {
    setUser(prev => ({
      ...prev,
      isSeller: e.target.checked // checkbox type -> nên value là boolean, không phải text nên phải set riêng methods
    }))
  }

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file)

    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url
      })
      navigate("/login")
    } catch (err) {
      console.log('submit err: ', err)
    }
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="mysslife"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input
            type="file"
            onChange={e => { setFile(e.target.files[0]) }}
          />
          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Vietnam"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input
                type="checkbox"
                onChange={e => handleSeller(e)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;