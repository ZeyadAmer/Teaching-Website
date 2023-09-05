import React, { useState, useEffect } from 'react'
import axios from "axios"
import Cookies from 'js-cookie';
import CourseDetails from "../../components/CourseDetails"


const FilterMCoursePrice = () => {
    const [courses, setCourses] = useState([])
    const [query, setQuery] = useState(50000000)
    let coursecomponents = null

    useEffect(() => {
        const fetchCourses = async () => {
            const course = await axios.get('../c/viewmycourses/', {
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
            });
            setCourses(course.data)
        }
        fetchCourses()
        console.log(courses)
    }, [])
    if (courses != null) {
        coursecomponents = courses.filter((course) =>
            course.price <= (query)
        ).map((course) => (
            <CourseDetails key={course._id} course={course} onClick={() => window.location.href = `/course?courseId=${course._id}`} />
        ))
    }

    return (
        <div>
            <div >
                <input type="number" placeholder='Enter Value' onChange={(e) => setQuery(e.target.value)}></input>
            </div>
            <div>
                {courses && coursecomponents}
            </div>
        </div>
    )
}
export default FilterMCoursePrice