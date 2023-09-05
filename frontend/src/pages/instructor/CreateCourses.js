import { useEffect, useState } from "react";
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


const CreateCourse = () => {
    const [instructor, setInstructor] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [subject, setSubject] = useState("");
    const [shortSummary, setShortSummary] = useState("");
    const navigate = useNavigate();

    async function add(e) {
        e.preventDefault()

        try {
            await axios.post("/instructor/createCourse", {
                title,
                price,
                subject,
                shortSummary
            }, {
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    function navInstructor() {
        navigate('/instructor')
    }

    return (
        <div>
            <div className="search">
                <label><strong>Title :</strong></label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
                <label><strong>Price :</strong></label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /><br />
                <label><strong>Subject :</strong></label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} /><br />
                <label><strong>Short Summary :</strong></label>
                <input type="text" value={shortSummary} onChange={(e) => setShortSummary(e.target.value)} /><br />
                <p>lkvjasldkfjlsjdflskjdfl;dshfg;ljslfdkjslfjs fl slf sldfj lsjf lsj flsj flsj dflsj flsj lf slfjslfj sljf </p>
                <button className="button" onClick={add}>Accept Contract And Add Course</button>
                <button className="button" onClick={navInstructor}>I do not Accept</button>
            </div>
        </div>
    );
};
export default CreateCourse;