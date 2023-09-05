import { useEffect, useState } from "react";
import axios from "axios";

const EditBio = () => {
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  async function editMail(e) {
    e.preventDefault()
    try {
      await axios.post("instructor/changeMail", {
        email
      })
    }
    catch (error) {
      console.log(error)
    }
  }
  async function editBio(e) {
    e.preventDefault()
    try {
      await axios.post("instructor/updateBio", {
        bio
      })
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <form className="search">

      <label><strong>New Bio : </strong></label>
      <input type="text" value={bio} onChange={(e) => setBio(e.target.value)}></input>
      <button onClick={editBio}>Edit</button>
      <br />

      <label><strong>New Email : </strong></label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
      <button onClick={editMail}>Edit</button>
      <br />
    </form>
  );
};

export default EditBio;
