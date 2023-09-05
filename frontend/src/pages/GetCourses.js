import { useEffect, useState } from "react";
import CourseDetails from "../components/CourseDetails"
import axios from "axios"
import Cookies from 'js-cookie';

const GetCourses = () => {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = async () => {
            const course = await axios.get('courses/getall/', {
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
        <div className="home">
            <div className="Courses">
                <div>
                    {courses && coursecomponents}
                </div>
            </div>
        </div>
    )
}

export default GetCourses