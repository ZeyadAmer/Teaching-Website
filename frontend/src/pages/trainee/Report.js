import React, { useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
export default function Report() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const [type,setType]=useState();
    const [text,setText]=useState();
    async function report(e) {
        e.preventDefault()

        try {
            await axios.post("/invidualTrainee/newProblem", {
                type,
                text,
                courseId
            },{
              headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
          })
        }
        catch (error) {
            console.log(error)

        }
    }
  return (
    <div className='search'>
      <input type="text" placeholder='type' onChange={(e) => setType(e.target.value)}></input><br/>
      <input type="text" placeholder='text' onChange={(e) => setText(e.target.value)}></input><br/>
      <button onClick={report}>Report</button>
    </div>
  )
}
