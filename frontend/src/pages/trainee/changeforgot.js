import React, { useState } from 'react'
import axios from 'axios'
export default function Changeforgot() {
    const [mail,setMail]=useState()
    const[newPassword,setNewPassword]=useState()
    async function change(e){
        e.preventDefault()
        await axios.post("/invidualTrainee/changeforgot",{mail,newPassword})
    }
  return (
    <div>
      <input placeholder='mail' onChange={(e) => setMail(e.target.value)}></input><br/>
      <input placeholder='new Password' onChange={(e) => setNewPassword(e.target.value)}></input><br/>
      <button onClick={change}>Change</button>
    </div>
  )
}
