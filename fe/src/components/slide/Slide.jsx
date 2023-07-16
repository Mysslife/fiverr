import React from 'react'
import './Slide.scss'
import Slider from 'infinite-react-carousel'

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
	console.log('children: ', children)

	return (
		<div className='slide'>
			<div className="container">
				<Slider autoplay={true} slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
					{children}
				</Slider>
			</div>
		</div>
	)
}

export default Slide