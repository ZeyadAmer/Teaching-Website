import React, { useState } from 'react'
import axios from "axios"
import Cookies from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom'
export default function RateInstructor() {
  const [inst, setInst] = useState("")
  const [rating, setRate] = useState(0)
  const [text, setText] = useState("")
  const navigate = useNavigate()
  async function done(e) {
    e.preventDefault()

    try {
      await axios.post("/invidualTrainee/reviewInstructor", {
        inst,
        rating,
        text
      },{
        headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
    })
      navigate("trainee")
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className='search'>
        <strong>Instructor Name : </strong>
        <input type="text" value={inst} onChange={(e) => setInst(e.target.value)} /><br />
        <strong>Rating : </strong>
        <input type="number" value={rating} onChange={(e) => setRate(e.target.value)} min="0" max="5" /><br />
        <strong>Review : </strong>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} /><br />
        <button onClick={done}> Rate</button>
      </div>
    </div>
  )
}
