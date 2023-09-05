import React, { useState } from 'react'
import axios from "axios"
import { Navigate, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
export default function RateInstructor() {
  const [instructor, setInstructor] = useState("")
  const [rating, setRate] = useState(0)
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")
  const navigate = useNavigate()
  async function done(e) {
    e.preventDefault()

    try {
      await axios.post("/corporateTrainee/reviewCourse", {
        title,
        rating,
        text,
        instructor
      },{
        headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
    })
      navigate("/instructor")
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className='search'>
        <strong>Instructor Name : </strong>
        <input type="text" value={instructor} placeholder="Instructor username" onChange={(e) => setInstructor(e.target.value)} /><br />
        <strong>Rating : </strong>
        <input type="number" value={rating} placeholder="Rate" onChange={(e) => setRate(e.target.value)} min="0" max="5" /><br />
        <strong>Review : </strong>
        <input type="text" value={text} placeholder="text" onChange={(e) => setText(e.target.value)} /><br />
        <strong>Title : </strong>
        <input type="text" value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)} /><br />
        <button onClick={done}> Rate</button>
      </div>
    </div>
  )
}
