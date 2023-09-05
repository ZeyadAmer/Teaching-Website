import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const AddAdministratorForm = () => {
  const [username, setUsrName] = useState("");
  const [password, setPw] = useState("");
  const [flag, setFlag] = useState(false)
  const navigate = useNavigate();

  async function add(e) {
    e.preventDefault()

    try {
      await axios.post("/admin/addAdministrator", {
        username,
        password
      }, {
        headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
      })
      setFlag(true)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form className="search" onSubmit={add}>
        <label><strong>User Name : </strong></label>
        <input type="text" value={username} onChange={(e) => setUsrName(e.target.value)} /><br />
        <label><strong>Password : </strong></label>
        <input type="password" value={password} onChange={(e) => setPw(e.target.value)} /><br />
        <button type="submit">Add Admin</button><br />
        {flag ? (<label>User Added</label>) : (null)}
      </form>
    </div>
  );
};
export default AddAdministratorForm;