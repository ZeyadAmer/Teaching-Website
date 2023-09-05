import React, { useState, useEffect } from 'react'
import axios from "axios"
import Cookies from 'js-cookie';
import CourseDetails from "../../components/CourseDetails"
import { Navigate, useNavigate } from "react-router-dom";


const Mycourses = () => {
    const navigate = useNavigate()
    const [courses, setCourses] = useState(null)
    const [query, setQuery] = useState([])
    let coursecomponents = null
    const navFiltSubject = () => {
        navigate('/corprate/filtersubject');
    };
    const navFiltPrice = () => {
        navigate('/corprate/filterprice');
    };

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
        coursecomponents = courses.map((course) => (
            <CourseDetails key={course._id} course={course} onClick={() => window.location.href = `/Corprate/Course?courseId=${course._id}`} />
        ))
    }

    return (
        <div>
            <div className="search">
                <button onClick={navFiltSubject}>Filter by Subject</button>
                <button onClick={navFiltPrice}>Filter by Price</button>
            </div>
            <div>
                {courses && coursecomponents}
            </div>
        </div>
    )
}
export default Mycourses