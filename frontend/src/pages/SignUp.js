import React, { useState, useEffect } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import axios from "axios"

const SignUpForm = () => {
    const [username, setUsrName] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [gender, setgender] = useState("")
    const navigate = useNavigate()

    async function signUp(e) {
        e.preventDefault()

        try {
            await axios.post("/user/signup", {
                username,
                email,
                password,
                firstname,
                lastname,
                gender
            })
            return (navigate('/trainee'))
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form className='search' onSubmit={signUp}>
                <label><strong>User Name : </strong></label>
                <input type="text" value={username} onChange={(e) => setUsrName(e.target.value)} /><br />
                <label><strong>Email : </strong></label>
                <input type="text" value={email} onChange={(e) => setemail(e.target.value)} /><br />
                <label><strong>Password : </strong></label>
                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} /><br />
                <label><strong>Firstname : </strong></label>
                <input type="text" value={firstname} onChange={(e) => setfirstname(e.target.value)} /><br />
                <label><strong>Last name : </strong></label>
                <input type="text" value={lastname} onChange={(e) => setlastname(e.target.value)} /><br />
                <label><strong>Gender : </strong></label>
                <input type="text" value={gender} onChange={(e) => setgender(e.target.value)} /><br />
                <p>slkdfjlsdjflsk fls fls flsj flsj flskjfls jfls flks flks flkjsflksj fks flks flsk fjlskjf slkjf sf jsldjflsjfsljf</p>
                <button type="submit">Accept terms and Sign Up</button>
            </form>
        </div>
    )
}
export default SignUpForm;