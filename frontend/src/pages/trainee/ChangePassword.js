import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
  const [username, setUsrName] = useState("");
  const [password, setPw] = useState("");
  const [newPassword, setNewPw] = useState("");
  const navigate = useNavigate();

  async function change(e) {
    e.preventDefault()

    try {
      await axios.post("/invidualTrainee/changePassword", {
        username,
        password,
        newPassword
      })
      navigate("/")
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form className="search" onSubmit={change}>
        <label><strong>User Name : </strong></label>
        <input type="text" value={username} onChange={(e) => setUsrName(e.target.value)} /><br />
        <label><strong>Password : </strong></label>
        <input type="password" value={password} onChange={(e) => setPw(e.target.value)} /><br />
        <label><strong>New Password : </strong></label>
        <input type="Password" value={newPassword} onchange={(e) => setNewPw(e.target.value)}></input>
        <button type="submit">Change</button>
      </form>
    </div>
  );
};
export default ChangePasswordForm;
