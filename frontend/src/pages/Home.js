import { useEffect, useState } from "react";
import CourseDetails from "../components/CourseDetails"
import YtEmbed from "../components/YtEmbed";
import axios from "axios"
import Cookies from 'js-cookie';

const Home = () => {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = async () => {
            const course = await axios.get('guest/getall/', {
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
                    {coursecomponents}
                </div>
                <YtEmbed embedId="uuy4Qs873mE" />
            </div>
        </div>
    )
}

export default Home