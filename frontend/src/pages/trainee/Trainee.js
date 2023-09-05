import React, { useState, useEffect } from 'react'
import axios from "axios"
import Cookies from 'js-cookie';
import CourseDetails from "../../components/CourseDetails"
import { Navigate, useNavigate } from "react-router-dom";


const Instructor = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([])
    const [query, setQuery] = useState([])
    const [wallet, setWalet] = useState(0)
    const navFiltSubject = () => {
        navigate('/filtersubject');
    };
    const navFiltPrice = () => {
        navigate('/filterprice');
    };
    const navMyCourses = () => {
        navigate('/trainee/mycourses');
    };
    const navChangePw = () => {
        navigate('/trainee/changePassword');
    };
    const navChangeEmail = () => {
        navigate('/editbio');
    };
    const navRateInstructor = () => {
        navigate('/trainee/rateinstructor');
    };
    const navRateCourse = () => {
        navigate('/trainee/rateCourse');
    };
    const navPreviousProblems = () => {
        navigate('/trainee/previousproblems');
    };


    useEffect(() => {
        const fetchCourses = async () => {
            const course = await axios.get('courses/getallcourses/', {
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
            });
            setCourses(course.data.course)

        }
        fetchCourses()
        const fetchWallet = async () => {
            const money = await axios.get('invidualTrainee/wallet', {
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
            })
            setWalet(money.data[0].wallet)
        }
        fetchWallet()
    }, [])
    const coursecomponents = courses.filter((course) =>
        course.title.toLowerCase().includes(query) || course.subject.toLowerCase().includes(query) || course.instructor.toLowerCase().includes(query)
    ).map((course) => (
        <CourseDetails key={course._id} course={course} onClick={() => window.location.href = `/viewtrainee?courseId=${course._id}`} />
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
            <p className='course-details'>
                <strong>the ammount of money you have in your wallet : </strong>{wallet}<br />
            </p>
            <div className="Courses">
                <div >
                    {coursecomponents}
                </div>
            </div>
        </div>
    )
}
export default Instructor