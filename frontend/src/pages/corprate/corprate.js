import React, { useState, useEffect } from 'react'
import axios from "axios"
import Cookies from 'js-cookie';
import CourseDetails from "../../components/CourseDetails"
import { Navigate, useNavigate } from "react-router-dom";


const Corporate = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([])
    const [query, setQuery] = useState([])
    const navFiltSubject = () => {
        navigate('/filtersubject');
    };
    const navFiltPrice = () => {
        navigate('/filterprice');
    };
    const navMyCourses = () => {
        navigate('/corprate/mycourses');
    };
    const navChangePw = () => {
        navigate('/corprate/changePassword');
    };
    const navChangeEmail = () => {
        navigate('/corprate/editbio');
    };
    const navRateInstructor = () => {
        navigate('/corprate/rateinstructor');
    };
    const navRateCourse = () => {
        navigate('/corprate/rateCourse');
    };
    const navPreviousProblems = () => {
        navigate('/corprate/previouseproblems');
    };


    useEffect(() => {
        const fetchCourses = async () => {
            const course = await axios.get('guest/getallcourses/', {
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
            });
            setCourses(course.data.course)

        }
        fetchCourses()
        
    }, [])
    const coursecomponents = courses.filter((course) =>
        course.title.toLowerCase().includes(query) || course.subject.toLowerCase().includes(query) || course.instructor.toLowerCase().includes(query)
    ).map((course) => (
        <CourseDetails key={course._id} course={course} onClick={() => window.location.href = `/corprate/viewcorprate?courseId=${course._id}`} />
    ))

    return (
        <div>

            <div className="search">
                <input className='text-trainee' type="text" placeholder='Search for course' onChange={(e) => setQuery(e.target.value)}></input>
                <button className='button' onClick={navFiltSubject}>filter by subject</button>
                <button className='button' onClick={navFiltPrice}>filter by price</button>
                <button className='button' onClick={navMyCourses}>my courses</button>
                <button className='button' onClick={navChangePw}>change password</button>
                <button className='button' onClick={navChangeEmail}>change email</button>
                <button className='button' onClick={navRateInstructor}>Rate Instructor</button>
                <button className='button' onClick={navRateCourse}>Rate Course</button>
                <button onClick={navPreviousProblems}>Previous Problems</button>
            </div><br />
           
            <div className="Courses">
                <div >
                    {coursecomponents}
                </div>
            </div>
        </div>
    )
}
export default Corporate