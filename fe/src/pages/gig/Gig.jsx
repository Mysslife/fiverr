import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import newRequest from '../../utils/newRequest'
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const { id } = useParams()

  const { isPending, error, data } = useQuery({ // -> tanstack dùng hơi lỗi, nên dùng useEffect cho mượt
    queryKey: ['gig'],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then(res => {
        return res.data
      }),
    enabled: !!id
  })

  const userId = data?.userId;

  const { isPending: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then(res => {
        return res.data
      }),
    enabled: !!userId
  })

  return (
    <div className="gig">
      {isPending ? "Loading..." : error ? "Something went wrong" : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">Fiverr {">"} Graphics & Design {">"}</span>
            <h1>{data?.title}</h1>

            {isLoadingUser ? "Loading" : errorUser ? "Something went wrong!" : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser?.img}
                  alt=""
                />
                <span>{dataUser?.username}</span>
                {!isNaN(data?.totalStars / data?.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data?.totalStars / data?.starNumber)).fill().map((item, i) => (
                      <img key={i} src="/img/star.png" alt="" />
                    ))}

                    <span>{Math.round(data?.totalStars / data?.starNumber)}</span>
                  </div>
                )}
              </div>
            )}

            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data?.images?.length && data?.images?.map((img) => (
                <img key={img} src={img} alt="" />
              ))}

              <img
                src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <img
                src="https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <img
                src="https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
            </Slider>
            <h2>About This Gig</h2>
            <p>{data?.desc}</p>

            {isLoadingUser ? "Loading" : errorUser ? "Something went wrong!" : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img
                    src={dataUser?.img || "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                    alt=""
                  />
                  <div className="info">
                    <span>{dataUser?.username}</span>
                    {!isNaN(data?.totalStars / data?.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data?.totalStars / data?.starNumber)).fill().map((item, i) => (
                          <img key={i} src="/img/star.png" alt="" />
                        ))}

                        <span>{Math.round(data?.totalStars / data?.starNumber)}</span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser?.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>
                    {dataUser?.desc}
                  </p>
                </div>
              </div>
            )}

            {/* reviews */}
            <Reviews gigId={id} />
          </div>

          {/* right */}
          <div className="right">
            <div className="price">
              <h3>{data?.shortTitle}</h3>
              <h2>$ {data?.price}</h2>
            </div>
            <p>
              {data?.shortDesc}
            </p>

            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data?.deliveryTime} Days Delivery</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data?.revisionNumber} Revisions</span>
              </div>
            </div>

            <div className="features">
              {data?.features?.map((feature) => {
                <div key={feature} className="item">
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              })}
            </div>
            <button>Continue</button>
          </div>
        </div>
      )}
    </div >
  );
}

export default Gig;