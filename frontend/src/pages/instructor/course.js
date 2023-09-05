import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Subtitle from '../../components/subTitle';

const Course = () => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId');
    const [courses, setCourses] = useState([]);
    const [type, setType] = useState("");
    const [text, setText] = useState("");
    const [userName, setUserName] = useState("");
    const [Question, setQuestion] = useState("");
    const [Answer1, setAnswer1] = useState("");
    const [Answer2, setAnswer2] = useState("");
    const [Answer3, setAnswer3] = useState("");
    const [Answer4, setAnswer4] = useState("");
    const [CorrectAnswer, setCorrectAnswer] = useState();
    const [Name, setName] = useState();
    const [Hours, setHours] = useState();
    const [link, setlink] = useState();
    const [linkp, setlinkp] = useState();
    const [Subtitle_description, setSubtitle_description] = useState();
    const [percentage_discount,setpercentage_discount]=useState()
    const [expirationDate,setexpirationDate]=useState()
    const [title,settitle]=useState()

    async function report(e) {
        try {
            await axios.post("/problems/newProblem", {
                type,
                text,
                userName,
                courseId
            }, {
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` }
            })
            console.log("success")
        }
        catch (error) {
            console.log(error)
        }
    }

    async function addExam(e) {
        await axios.post("/instructor/addexam", {
            Question,
            Answer1,
            Answer2,
            Answer3,
            Answer4,
            CorrectAnswer,
            courseId
        }, {
            headers: { Authorization: `BEARER ${Cookies.get('jwt')}` }
        })
        console.log("success")
    }

    async function addSubtitle(e) {
        try {
            await axios.post("/instructor/addsubtitle", {
                Name,
                Hours,
                link,
                Subtitle_description,
                courseId
            }, {
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` }
            })
            console.log("success")
        }
        catch (error) {
            console.log(error)
        }
    }

    async function addPreview(e) {
        await axios.post("/instructor/updatepreview", {
            linkp,
            courseId
        }, {
            headers: { Authorization: `BEARER ${Cookies.get('jwt')}` }
        })
        console.log("success")
    }
    async function SubmitPromotion(e){
        await axios.post("/instructor/makepromotion",{percentage_discount,expirationDate,title},{
            headers: { Authorization: `BEARER ${Cookies.get('jwt')}` }
        })
    }

    return (
        <div>
            <div className='search'>
                <strong>Add Excercise : </strong><br />
                <input type="text" placeholder='Question' value={Question} onChange={(e) => setQuestion(e.target.value)}></input><br />
                <input type="text" placeholder='Answer 1' value={Answer1} onChange={(e) => setAnswer1(e.target.value)}></input><br />
                <input type="text" placeholder='Answer 2' value={Answer2} onChange={(e) => setAnswer2(e.target.value)}></input><br />
                <input type="text" placeholder='Answer 3' value={Answer3} onChange={(e) => setAnswer3(e.target.value)}></input><br />
                <input type="text" placeholder='Answer 4' value={Answer4} onChange={(e) => setAnswer4(e.target.value)}></input><br />
                <input type="number" placeholder='Correct Answer' value={CorrectAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}></input><br />
                <button onClick={addExam}>Add Question</button>
            </div><br />
            <div className="search">
                <strong>Add Promotion : </strong><br />
                <input type="number" placeholder="Discount %" min="0" max="100" onChange={(e) => setpercentage_discount(e.target.value)}></input>
                <input type="date" onChange={(e) => setexpirationDate(e.target.value)}></input>
                <input type="text" onChange={(e) => settitle(e.target.value)}></input>
                <button onClick={SubmitPromotion}>Promote</button>
            </div><br />
            <div className="search">
                <strong>Add Subtitle : </strong><br />
                <input type="text" placeholder='name' value={Name} onChange={(e) => setName(e.target.value)}></input><br />
                <input type="number" placeholder='hour' value={Hours} onChange={(e) => setHours(e.target.value)}></input><br />
                <input type="text" placeholder='Link' value={link} onChange={(e) => setlink(e.target.value)}></input><br />
                <input type="text" placeholder='description' value={Subtitle_description} onChange={(e) => setSubtitle_description(e.target.value)}></input><br />
                <button onClick={addSubtitle}>Add subtitle</button>
            </div>
            <div className="search">
                <strong>Add Preview : </strong><br />
                <input type="text" placeholder='Link' value={link} onChange={(e) => setlinkp(e.target.value)}></input><br />
                <button onClick={addPreview}>Add Preview video</button>
            </div>
            <div className="search">
                <strong>Report Course : </strong><br />
                <label>Type</label><input type="text" value={type} onChange={(e) => setType(e.target.value)}></input><br />
                <label>text</label><input type="text" value={text} onChange={(e) => setText(e.target.value)}></input><br />
                <label>user name</label><input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}></input><br />
                <button onClick={report}>report</button>
            </div><br />
        </div>
    )
}
export default Course