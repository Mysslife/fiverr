import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import moment from "moment"

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("userFiverr"));
  const queryClient = useQueryClient()

  const { isPending, error, data } = useQuery({
    queryKey: ['conversations'],
    queryFn: () =>
      newRequest.get(`/conversations`).then(res => {
        return res.data
      }),
  })

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"])
    }
  })

  const handleRead = (id) => {
    mutation.mutate(id)
  }

  return (
    <div className="messages">
      {isPending ? "Loading..." : error ? "Something went wrong" : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tbody>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>

              {
                data?.map(conver => (
                  <tr key={conver.id} className={((currentUser.isSeller && !conver.readBySeller) || (!currentUser.isSeller && !conver.readByBuyer)) ? "active" : ""}>
                    <td>{currentUser.isSeller ? conver.buyerId : conver.sellerId}</td>
                    <td>
                      <Link to={`/message/${conver.id}`} className="link">
                        {conver?.lastMessage?.substring(0, 100)}...
                      </Link>
                    </td>
                    <td>{moment(conver.updatedAt).fromNow()}</td>
                    <td>
                      {((currentUser.isSeller && !conver.readBySeller) || (!currentUser.isSeller && !conver.readByBuyer)) &&
                        <button onClick={() => handleRead(conver.id)}>Mark as Read</button>
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )}
    </div >
  );
};

export default Messages;