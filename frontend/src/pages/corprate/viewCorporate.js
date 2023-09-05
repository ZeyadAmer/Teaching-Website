import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Subtitle from '../../components/subTitle';
import YtEmbed from '../../components/YtEmbed';
export default function ViewCourporate() {
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('courseId');
  const [courses, setCourses] = useState();
  let courseView = null
  let subtitles = null;
  let numOfExcersises = null
  let price = null
  let totalHours = null;
  let preview = null
  let title=null
  useEffect(() => {
    const fetchCourses = async () => {
      const course = await axios.get('../courses/getallcourses/', {
        headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
      });
      setCourses(course.data.course)
    }
    fetchCourses()
  }, [])
  async function request(){
    await axios.post('/corporateTrainee/requestCourse',{title},{
      headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
    })
    console.log("done")
  }
  if (courses != null) {
    courseView = courses.filter((course) =>
      course._id.includes(courseId)
    )[0]
    title=courseView.title
    // setTitle(courseView.title)
    subtitles = courseView.subtitles.map((subtitle) =>
      < Subtitle key={subtitle._id} subtitle={subtitle} />
    )
    totalHours = courseView.total_hours
    numOfExcersises = courseView.Exercises.length
    price = courseView.price
    preview = <YtEmbed key={courseId} link={courseView.preview} />
  }
  //console.log(courseView)
  return (
    <div>
      <div className='search'>
        <button onClick={request}>Request Course</button>
      </div>
      <div className='search'>
        <label><strong>contains : </strong>{numOfExcersises} Exercises</label><br />
        <label><strong> Price : </strong>{price}</label><br />
        <label><strong>Total hours : </strong>{totalHours}</label>
      </div>
      {preview}
      {subtitles}

    </div>
  )
}
