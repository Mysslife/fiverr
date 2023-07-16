import React from 'react'
import './Orders.scss'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("userFiverr"))
  const { isPending, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      newRequest.get(`/orders`).then(res => {
        return res.data
      }),
  })

  console.log('orders: ', data)

  return (
    <div className='orders'>
      {isPending ? "Loading..." : error ? "Something went wrong" :
        (
          <div className="container">
            <div className="title">
              <h1>Gigs</h1>
            </div>
            <table>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
                <th>{currentUser?.isSeller ? "Buyer Name" : "Seller Name"}</th>
                <th>Contact</th>
              </tr>

              {data?.map(order => (
                <tr key={order._id}>
                  <td>
                    <img
                      className="img"
                      src={order.img}
                      alt=""
                    />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>{currentUser.isSeller ? order.buyerId : order.sellerId}</td>
                  <td>{currentUser.isSeller ? order.buyerName : order.sellerName}</td>
                  <td>
                    <img className="message" src="./img/message.png" alt="" />
                  </td>
                </tr>
              ))}


            </table>
          </div>
        )
      }
    </div>
  )
}

export default Orders