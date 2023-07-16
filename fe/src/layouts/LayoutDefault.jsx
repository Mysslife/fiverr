import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'

const LayoutDefault = () => {
	const queryClient = new QueryClient()

	return (
		<div className="app">
			<QueryClientProvider client={queryClient}>
				<Navbar />
				<Outlet /> {/* Outlet tương đương với các children trong router */}
				<Footer />
			</QueryClientProvider>
		</div>
	)
}

export default LayoutDefault