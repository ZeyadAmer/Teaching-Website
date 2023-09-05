import React, { useState, useEffect } from 'react'
import axios from "axios"
import Cookies from 'js-cookie';
import CourseDetails from "../../components/CourseDetails"


const Filtersubject = () => {
    const [courses, setCourses] = useState([])
    const [query, setQuery] = useState([])


    useEffect(() => {
        const fetchCourses = async () => {
            const course = await axios.get('courses/getallcourses/', {
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
            });
            setCourses(course.data.course)
        }
        fetchCourses()
    }, [])
    const coursecomponents = courses.filter((course) =>
        course.subject.toLowerCase().includes(query)
    ).map((course) => (
        <CourseDetails key={course._id} course={course} />
    ))

    return (
        <div>
            <div className="search">
                <input type="text" placeholder='Type subject name' onChange={(e) => setQuery(e.target.value)}></input>
            </div>
            <div>
                <div>
                    {courses && coursecomponents}
                </div>
            </div>
        </div>
    )
}
export default Filtersubject