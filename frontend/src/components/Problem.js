import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Problem({ problem }) {
    const [text,setText]=useState()
    let problemid=problem._id
    async function followUp() {
        await axios.post("../corporateTrainee/followUpProblem",{text,problemid},{
            headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
        })
    }

    return (
        <div className='course-details'>
            <h4>{problem.type}</h4>
            <p>{problem.text}</p>
            <p>status :{problem.state}</p>
            <p>user Name :{problem.userName}</p>
            <p>{problem.CourseId}</p>
            <input placeholder='text' type="text" onChange={(e) => setText(e.target.value)}></input>
            <button onClick={() => followUp()}>Follow Up</button>
        </div>
    )
}
