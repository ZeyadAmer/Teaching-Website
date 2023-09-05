import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Subtitle from '../../components/subTitle';
import YtEmbed from '../../components/YtEmbed';
import { Navigate, useNavigate } from "react-router-dom";
import Excersice from '../../components/Excersice';

export default function Course() {
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const [courses, setCourses] = useState(null);
    let courseView = null
    let subtitles = null;
    let numOfExcersises = null
    let price = null
    let totalHours = null;
    let preview = null
    let excersices = null
    let percentage=null

    useEffect(() => {
        const fetchCourses = async () => {
            const course = await axios.get('../courses/viewmycourses/', {
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
            });
            setCourses(course.data)
        }
        fetchCourses()
       
        
    }, [])
    if (courses != null) {
        courseView = courses.filter((course) =>
            course._id.includes(courseId)
        )[0]
        percentage=courseView.percentage_completed
        subtitles = courseView.subtitles.map((subtitle) =>
            < Subtitle key={subtitle._id} subtitle={subtitle} onClick={() => window.location.href = `/trainee/subtitle?subtitleId=${subtitle._id}&courseId=${courseId}`} />
        )
        excersices = courseView.Excercises.map((excersice) =>
            < Excersice key={excersice._id} excersice={excersice} onClick={() => window.location.href = `/trainee/excersice?excersiceId=${excersice._id}&courseId=${courseId}`} />
        )
        console.log(courseView)
        totalHours = courseView.total_hours
        numOfExcersises = courseView.Excercises.length
        price = courseView.price
        preview = <YtEmbed key={courseId} link={courseView.preview} />
    }

    return (
        <div>
            <div className='search'>
                <label><strong>contains : </strong>{numOfExcersises} Exercises</label><br />
                <label><strong>Price : </strong>{price}</label><br />
                <label><strong>Total hours : </strong>{totalHours}</label>
            </div>
            {preview}
            {subtitles}
            {excersices}
            
            <div className='search'>
                <button onClick={() => window.location.href = `/trainee/reportproblem?courseId=${courseId}`}>Report a Problem</button>
                {percentage }% Completed
            </div>
        </div>
    )
}
