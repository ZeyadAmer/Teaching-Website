import React, { useState, useEffect } from 'react'
import axios from "axios"
import Cookies from 'js-cookie';
import CourseDetails from "../../components/CourseDetails"


const Sorted = () => {
    const [courses, setCourses] = useState([])
    const [query, setQuery] = useState(50000000)


    useEffect(() => {
        const fetchCourses = async () => {
            const course = await axios.get('courses/getallcourses/', {
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
            });
            setCourses(course.data.course)
        }
        fetchCourses()
    }, [])
    const coursecomponents = courses.map((course) => (
        <CourseDetails key={course._id} course={course} />
    ))

    return (
        <div>
            <div className="search">
                <input type="number" onChange={(e) => setQuery(e.target.value)}></input>
            </div>
            <div>
                {courses && coursecomponents}
            </div>
        </div >
    )
}
export default Sorted