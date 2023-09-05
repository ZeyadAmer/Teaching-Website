import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const LogInForm = () => {
  const [username, setUsrName] = useState("");
  const [password, setPw] = useState("");
  const navigate = useNavigate();

  async function logIn(e) {
    e.preventDefault()

    try {
      await axios.post("/user/loginIndividualTrainee", {
        username,
        password
      })
      navigate("/trainee")
      window.location.reload();
    }
    catch (error) {
      console.log(error)
    }
    try {
      await axios.post("/user/logininstructor", {
        username,
        password
      })
      navigate("/instructor")
      window.location.reload();
    }
    catch (error) {
      console.log(error)
    }
    try {
      await axios.post("/user/loginCorporateTrainee", {
        username,
        password
      })
      navigate("/corprate")
      window.location.reload();
    }
    catch (error) {
      console.log(error)
    }
    try {
      await axios.post("/user/loginAdmin", {
        username,
        password
      })
      navigate("/admin")
      window.location.reload();
    }
    catch (error) {
      console.log(error)
    }
  }

  async function forget(){
    navigate("/forgetpassword")
  }

  return (
    <div>
      <div className="search" >
        <label><strong>User Name : </strong></label>
        <input type="text" value={username} onChange={(e) => setUsrName(e.target.value)} /><br />
        <label><strong>Password : </strong></label>
        <input type="password" value={password} onChange={(e) => setPw(e.target.value)} /><br />
        <button onClick={logIn}>Log In</button>
        <button onClick={forget}>Forogot Password</button>
      </div>
    </div>
  );
};

export default LogInForm;
