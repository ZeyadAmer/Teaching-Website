import React, { useState, useEffect } from 'react'
import axios from "axios"
import Cookies from 'js-cookie';
import CourseDetails from "../../components/CourseDetails"


const Filterprice = () => {
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
    const coursecomponents = courses.filter((course) =>
        course.price <= (query)
    ).map((course) => (
        <CourseDetails key={course._id} course={course} />
    ))

    return (
        <div>
            <div className="search">
                <input type="number" placeholder='Enter price' onChange={(e) => setQuery(e.target.value)}></input>
            </div>
            <div >
                {courses && coursecomponents}
            </div>
        </div>
    )
}
export default Filterprice