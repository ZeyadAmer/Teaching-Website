import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import Requests from "../../components/requests"

let courseRequests = null
export default function CourseRequests() {
    const [requests, setRequests] = useState()

    async function FetchRequests() {
        courseRequests = await axios.get('/admin/viewRequests', {
            headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
        });
        setRequests(courseRequests.data)
    }
    FetchRequests()
    if (requests != null) {
        courseRequests = requests.map((request) => (
            <Requests key={request._id} requests={request} />
        ))
    }
    //console.log(courseRequests)

    return (
        <div>
            {courseRequests}
        </div>
    )
}
