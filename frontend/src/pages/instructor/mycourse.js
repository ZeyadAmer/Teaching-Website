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
        navigate('/filtersubjectMinstructor');
    };
    const navFiltPrice = () => {
        navigate('/filterpriceMinstructor');
    };

    useEffect(() => {
        const fetchCourses = async () => {
            const course = await axios.get('instructor/mycourses/', {
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
            });
            setCourses(course.data)
        }
        fetchCourses()
        console.log(courses)
    }, [])
    if (courses != null) {
        coursecomponents = courses.map((course) => (
            <CourseDetails key={course._id} course={course} onClick={() => window.location.href = `/course?courseId=${course._id}`} />
        ))
    }

    return (
        <div>
            <div className="search">
                <button className='button' onClick={navFiltSubject}>Filter by Subject</button>
                <button className='button' onClick={navFiltPrice}>Filter by Price</button>
            </div>
            <div className="Courses">
                {courses && coursecomponents}
            </div>
        </div>
    )
}
export default Mycourses