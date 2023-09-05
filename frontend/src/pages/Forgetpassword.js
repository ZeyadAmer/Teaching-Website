import axios from 'axios'
import React, { useState } from 'react'

export default function Forgetpassword() {
  const [mail,setMail]=useState()
  async function corporate(e){
    e.preventDefault()

    await axios.post("/corporateTrainee/forgotPassword",{mail})
    console.log(mail)
  }
  async function individual(){
    await axios.post("/invidualTrainee/forgotPassword",{mail})
  }
  async function instructor(){
    await axios.post("/instructor/forgotPassword",{mail})
  }
  return (
    <div>
      <input placeholder='Mail' onChange={(e) => setMail(e.target.value)}></input>
      <button onClick={corporate}>change as corporate</button>
      <button onClick={individual}>change as individual Trainee</button>
      <button onClick={instructor}>change as Instructor</button>
    </div>
  )
}
