import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Message.scss";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'

const Message = () => {
  const { id } = useParams()
  const currentUser = JSON.parse(localStorage.getItem("userFiverr"))

  const queryClient = useQueryClient()

  const { isPending, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn: () =>
      newRequest.get(`/messages/single/${id}`).then(res => {
        return res.data
      }),
    enabled: !!id
  })

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"])
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({ conversationId: id, msg: e.target[0].value });
    e.target[0].value = "";
  }

  return (
    <div className="message">
      {isPending ? "Loading..." : error ? "Something went wrong" : (
        <div className="container">
          <span className="breadcrumbs">
            <Link to="/messages">Messages</Link> {">"} John Doe {">"}
          </span>

          <div className="messages">
            {data?.map(m => (
              <div key={m._id} className={(currentUser._id === m.senderId) ? "owner item" : "item"}>
                <img
                  src={m.senderPp}
                  alt=""
                />
                <p>{m.msg}</p>
              </div>
            ))}
          </div>

          {/* input */}
          <hr />
          <form className="write" onSubmit={handleSubmit}>
            <textarea type="text" placeholder="write a message" />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Message;