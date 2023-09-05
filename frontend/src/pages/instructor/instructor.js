import React, { useState, useEffect } from 'react'
import axios from "axios"
import Cookies from 'js-cookie';
import CourseDetails from "../../components/CourseDetails"
import { Navigate, useNavigate } from "react-router-dom";


const Instructor = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([])
  const [query, setQuery] = useState([])
  const [moneyOwed,setMoneyOwed]=useState()
  const keys = ["title", "subject"]

  const navFiltSubject = () => {
    navigate('/filtersubject');
  };
  const navFiltPrice = () => {
    navigate('/filterprice');
  };
  const navMyCourses = () => {
    navigate('/mycourses');
  };
  const navCreate = () => {
    navigate('/createcourse');
  };
  const navChangePw = () => {
    navigate('/changepw');
  };
  const navChangeEmail = () => {
    navigate('/editbio');
  };

  const navMyRating = () => {
    navigate('/myRating');
  };
  const navSort = () => {
    navigate('/sorted');
  };
  useEffect(() => {
    const fetchCourses = async () => {
      const course = await axios.get('courses/getallcourses/', {
        headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
      });
      setCourses(course.data.course)
    }
    fetchCourses()
    const fetchMoney=async()=>{
      const money =await axios.get('instructor/calcMoneyOwed',{
        headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
      })
      setMoneyOwed(money.data)
    }
    fetchMoney()
  }, [])
  const coursecomponents = courses.filter((course) =>
    course.title.toLowerCase().includes(query) || course.subject.toLowerCase().includes(query) || course.instructor.toLowerCase().includes(query)
  ).map((course) => (
    <CourseDetails key={course._id} course={course} onClick={() => window.location.href = `/viewcourse?courseId=${course._id}`} />
  ))

  return (
    <div>
      <div className="search">
        <input type="text" placeholder='Search for course' onChange={(e) => setQuery(e.target.value)}></input>
        <button className='button' onClick={navFiltSubject}>filter by subject</button>
        <button className='button' onClick={navFiltPrice}>filter by price</button>
        <button className='button' onClick={navMyCourses}>my courses</button>
        <button className='button' onClick={navCreate}>create Course</button>
        <button className='button' onClick={navChangePw}>change password</button>
        <button className='button' onClick={navChangeEmail}>change email</button>
        <button className='button' onClick={navMyRating}>check my rating</button>
        <button className='button' onClick={navSort}>Most Popular</button>
        {moneyOwed}
      </div>
      <div>
        {coursecomponents}
      </div>
    </div>
  )
}
export default Instructor