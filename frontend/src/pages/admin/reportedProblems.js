import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import CourseDetails from '../../components/CourseDetails';
import Cookies from 'js-cookie';
import axios from 'axios';
import Reports from '../../components/reports';

let problemcomponent = null
export default function ReportedProblems() {
    const [problems, setProblems] = useState()

    async function fetchProblems() {
        const report = await axios.get("/admin/viewProblems", {
            headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
        })
        setProblems(report.data)
    }
    fetchProblems()

    if (problems != null) {
        problemcomponent = problems.map((problem) => (
            <Reports key={problem._id} problem={problem} />
        ))
    }
    return (
        <div>
            {problemcomponent}
        </div>
    )
}
