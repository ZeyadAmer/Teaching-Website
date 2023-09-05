import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import YtEmbed from '../../components/YtEmbed';
import { Navigate, useNavigate } from "react-router-dom";

export default function Subtitle() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const subtitleId = params.get('subtitleId')
    const [courses, setCourses] = useState(null);
    let courseView = null
    let link = null
    let title = null
    let description = null
    let hours = null

    useEffect(() => {
        const fetchCourses = async () => {
            const course = await axios.get('../c/viewmycourses/', {
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
            });
            setCourses(course.data)
        }
        fetchCourses()
    }, [])
    if (courses != null) {
        courseView = courses.filter((course) =>
            course._id.includes(courseId)
        )[0].subtitles.filter((subtitle) => subtitle._id.includes(subtitleId))
        title = courseView[0].Name
        link = <YtEmbed key={courseId} link={courseView[0].Link} />
        description = courseView[0].Subtitle_description
        hours = courseView[0].Hours
    }
    async function mark(e){
        await axios.post('',{courseId,subtitleId},{
            headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
        })
    }
    return (
        <div className='search'>
            <strong>Title : </strong>{title}<br />
            {link}<br />
            <strong>Notes : </strong><br />
            <textarea className="notes"></textarea><br />
            <button onClick={mark}>Mark as Finished</button>
            <strong>Description : </strong>{description} <br />
            <strong>Hours : </strong>{hours}
        </div >
    )
}
