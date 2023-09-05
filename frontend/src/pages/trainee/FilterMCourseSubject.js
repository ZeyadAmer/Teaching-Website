import React, { useState, useEffect } from 'react'
import axios from "axios"
import Cookies from 'js-cookie';
import CourseDetails from "../../components/CourseDetails"


const FilterMCourseSubject = () => {
    const [courses, setCourses] = useState([])
    const [query, setQuery] = useState("")
    let coursecomponents = null

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
        coursecomponents = courses.filter((course) =>
            course.subject.toLowerCase().includes(query)
        ).map((course) => (
            <CourseDetails key={course._id} course={course} onClick={() => window.location.href = `/course?courseId=${course._id}`} />
        ))
    }

    return (
        <div className="search">
            <input type="text" onChange={(e) => setQuery(e.target.value)}></input>
            <div className="Courses">
                <div>
                    {courses && coursecomponents}
                </div>
            </div>
        </div>
    )
}
export default FilterMCourseSubject