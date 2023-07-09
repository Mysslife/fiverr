import React, { useState } from 'react'
import './Login.scss'
import { useNavigate } from "react-router-dom"
import newRequest from '../../utils/newRequest.js'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await newRequest.post("/auth/login", {
        username,
        password
      })

      localStorage.setItem("userFiverr", JSON.stringify(res.data))
      setError(null)
      navigate("/")
    } catch (err) {
      setError(err.response.data.message)
      console.log(err.response.data.message)
    }
  }

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input type="text" name='username' placeholder='mysslife' onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="">Password</label>
        <input type="password" name='password' onChange={e => setPassword(e.target.value)} />

        <button type='submit'>Login</button>
        {error && <span className='error'>{error}</span>}
      </form>
    </div>
  )
}

export default Login