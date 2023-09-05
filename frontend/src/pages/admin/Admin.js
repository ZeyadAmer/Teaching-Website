import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import CourseDetails from '../../components/CourseDetails';
import Cookies from 'js-cookie';
import axios from 'axios';

let IDs = []

export default function Admin() {
  const navigate = useNavigate();
  const [query, setQuery] = useState()
  const [courses, setCourses] = useState()
  const [perc,setPerc]=useState(0)
  const [expirationDate,setExpirationDate]=useState()
  let coursecomponents = null


  const navigateAddCorporate = () => {
    // 👇️ navigate to /contacts
    navigate('/addcorporate');
  };
  const navigateAddInstructor = () => {
    // 👇️ navigate to /contacts
    navigate('/addinstructor');
  };
  const navigateAddadmin = () => {
    // 👇️ navigate to /contacts
    navigate('/addadministrator');
  };
  const navigateCourseRequests = () => {
    navigate('/courseRequests');
  }

  const navigateProblems = () => {
    navigate('/problems');
  }

  useEffect(() => {
    const fetchCourses = async () => {
      const course = await axios.get('courses/getallcourses/', {
        headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
      });
      setCourses(course.data.course)
    }
    fetchCourses()
  }, [])
  function clickCourse(id) {
    if (!IDs.includes(id)) {
      IDs.push(id)
    }
    
  }
  if (courses != null) {
    coursecomponents = courses.filter((course) =>
    course.title.toLowerCase().includes(query) || course.subject.toLowerCase().includes(query) || course.instructor.toLowerCase().includes(query)
    ).map((course) => (
      <CourseDetails key={course._id} course={course} onClick={()=>clickCourse(course._id)} />
      ))
    }

    async function promote(){
      await axios.post("/admin/setPromotion",{IDs,perc},{
        headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
      })
    }

    console.log(IDs)
  
  return (
    <div>
      <div className='search'>
        <button onClick={navigateAddCorporate}>Add Corporate</button>
        <button onClick={navigateAddInstructor}>Add Instructor</button>
        <button onClick={navigateAddadmin}>Add admin</button>
        <button onClick={navigateCourseRequests}>Check Course Requests</button>
        <button onClick={navigateProblems}>Check Reports</button>
        
      </div>
      <div className='search'>
        <strong>Add Promotion : </strong><br />
        <input type="number" placeholder="Discount %" min="0" max="100" onChange={(e) => setPerc(e.target.value)}></input>
        <input type="date" placeholder='Search Course' onChange={(e) => setExpirationDate(e.target.value)}></input>
        <input type="text" placeholder='Search Course' onChange={(e) => setQuery(e.target.value)}></input>
        <button onClick={promote}>Submit Promotion</button>
        {IDs.length}
      </div>
      <div >
        {coursecomponents}
      </div>
    </div>
  )
}
