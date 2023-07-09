import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

const LayoutDefault = () => {
	return (
		<div className="app">
			<Navbar />
			<Outlet /> {/* Outlet tương đương với các children trong router */}
			<Footer />
		</div>
	)
}

export default LayoutDefault