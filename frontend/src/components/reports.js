import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Reports({ problem }) {
    const [id, setId] = useState(problem._id)

    async function ResolvedProblem() {
        let status = "resolved"
        await axios.post("/admin/markProblem", {
            id,
            status
        },
            {
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
            })
        console.log(id, status)
    }
    async function PendingProblem() {
        let status = "pending"
        await axios.post("/admin/markProblem", {
            id,
            status
        },
            {
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
            })
        console.log(id, status)
    }

    return (
        <div className='course-details'>
            <h4>{problem.type}</h4>
            <p>{problem.text}</p>
            <p>{problem.state}</p>
            <p>{problem.userName}</p>
            <p>{problem.CourseId}</p>
            <button onClick={() => ResolvedProblem()}>Resolved</button>
            <button onClick={() => PendingProblem()}>Pending</button>
        </div>
    )
}
