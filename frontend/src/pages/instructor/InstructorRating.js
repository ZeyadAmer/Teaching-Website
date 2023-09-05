import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import Rate from "../../components/instructorRate"

let ratecomponent = null

export default function InstructorRating() {
    const [ratings, setRatings] = useState()

    async function fetchRatings() {
        const rate = await axios.get("/instructor/viewMyRatings", {
            headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
        })
        setRatings(rate.data)
    }
    fetchRatings()

    if (ratings != null) {
        ratecomponent = ratings.map((rate) => (
            <Rate key={rate._id} rate={rate} />
        ))
    }
    return (
        <div>
            {ratecomponent}
        </div>
    )
}
