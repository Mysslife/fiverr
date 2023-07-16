import React from 'react'
import './GigCard.scss'
import { Link } from 'react-router-dom'

const GigCard = ({ item }) => {
	return (
		<Link className='link' to={`/gig/${item._id}`}>
			<div className='gigCard'>
				<img src={item.cover} alt="" />
				<div className="info">
					<div className="user">
						<img src={item.pp} alt="" />
						<span>{item.username}</span>
					</div>
					<p>{item.desc}</p>
					<div className="star">
						<img src="./img/star.png" alt="" />
						<span>{!isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber)}</span>
					</div>
				</div>

				<hr />

				<div className="details">
					<img src="./img/heart.png" alt="" />
					<div className='price'>
						<span>STARTING AT</span>
						<h2>${item.price}</h2>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default GigCard