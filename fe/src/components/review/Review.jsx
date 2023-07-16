import React, { useEffect, useState } from "react";
import "./Review.scss";
import newRequest from "../../utils/newRequest";

function Review({ review }) {
  const [userReview, setUserReview] = useState({})

  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        const { data } = await newRequest.get(`/users/${review.userId}`)
        setUserReview(data)
      } catch (err) {
        console.log('err: ', err)
      }
    }

    fetchUserReview()
  }, [review])

  return (
    <div className="review">
      <div className="item">
        <div className="user">
          <img
            className="pp"
            src={userReview?.img}
            alt=""
          />
          <div className="info">
            <span>{userReview?.username}</span>
            <div className="country">
              <img
                src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                alt=""
              />
              <span>{userReview.country}</span>
            </div>
          </div>
        </div>
        <div className="stars">
          {Array(review?.star).fill().map((item, i) => (
            <img key={i} src="/img/star.png" alt="" />
          ))}

          <span>{review?.star}</span>
        </div>
        <p>{review?.desc}</p>
        <div className="helpful">
          <span>Helpful?</span>
          <img src="/img/like.png" alt="" />
          <span>Yes</span>
          <img src="/img/dislike.png" alt="" />
          <span>No</span>
        </div>
      </div>
    </div>
  )
}

export default Review;