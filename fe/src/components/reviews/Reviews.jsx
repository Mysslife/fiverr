import React, { useEffect, useState } from "react";
import "./Reviews.scss";
import Review from "../review/Review";
import newRequest from "../../utils/newRequest";
import { useMutation } from "@tanstack/react-query"

function Reviews({ gigId }) {
  const [reviews, setReviews] = useState([])

  const fetchReviews = async () => {
    try {
      const { data } = await newRequest.get(`/reviews/${gigId}`)
      setReviews(data)
    } catch (err) {
      console.log('err: ', err)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [gigId])

  const mutation = useMutation({
    mutationFn: (review) => { // review <=> { desc, star }
      return newRequest.post("/reviews", review)
    },
    onSuccess: () => {
      fetchReviews()
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const desc = e.target[0].value
    const star = e.target[1].value

    mutation.mutate({ gigId, desc, star }) // -> mutation nhận object này rồi gán vào useMutation -> gửi cùng post request
  }

  return (
    <div className="reviews">
      <h2>Reviews</h2>

      {reviews.map(review => {
        return <Review key={review._id} review={review} />
      })}

      <div className="add">
        <h3>Add a review</h3>
        <form className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="Write your opinion" />
          <select name="" id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Reviews;