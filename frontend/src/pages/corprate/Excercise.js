import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import YtEmbed from '../../components/YtEmbed';
import { Navigate, useNavigate } from "react-router-dom";

export default function Excercise() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const excersiceId = params.get('excersiceId')
    const [courses, setCourses] = useState(null);
    let courseView = null
    let question = null
    let answer1 = null
    let answer2 = null
    let answer3 = null
    let answer4 = null
    let correctanswer = null
    const [flag, setFlag] = useState()
    const [query, setQuery] = useState("0")
    const [grade, setGrade] = useState("Your grade is: 0")
    let answer = null

    useEffect(() => {
        const fetchCourses = async () => {
            const course = await axios.get('../courses/viewmycourses/', {
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
            });
            setCourses(course.data)
        }
        fetchCourses()
    }, [])
    if (courses != null) {
        courseView = courses.filter((course) =>
            course._id.includes(courseId)
        )[0].Excercises.filter((excersice) => excersice._id.includes(excersiceId))[0]
        question = courseView.Question
        answer1 = courseView.Answer1
        answer2 = courseView.Answer2
        answer3 = courseView.Answer3
        answer4 = courseView.Answer4
        correctanswer = "Correct Answer: " + courseView.CorrectAnswer
        answer = courseView.CorrectAnswer
    }

    function showAnswer() {
        if (query != 0) {
            if (query == answer) {
                setGrade("Your grade is: 1")
            }
            setFlag(true)
        }
        console.log(grade)
    }

    return (
        <div className='search'>
            <strong>Question : </strong>{question}<br />
            <div>
                <input className='radio' name='a' type="radio" value="1" onChange={(e) => setQuery(e.target.value)} />{answer1}<br />
                <input className='radio' name='a' type="radio" value="2" onChange={(e) => setQuery(e.target.value)} />{answer2}<br />
                <input className='radio' name='a' type="radio" value="3" onChange={(e) => setQuery(e.target.value)} />{answer3}<br />
                <input className='radio' name='a' type="radio" value="4" onChange={(e) => setQuery(e.target.value)} />{answer4}<br />
            </div>
            <button onClick={showAnswer}>Submit</button>
            <div>
                {flag ? (correctanswer) : (null)}<br />
                {flag ? (grade) : (null)}
            </div>
        </div>
    )
}
