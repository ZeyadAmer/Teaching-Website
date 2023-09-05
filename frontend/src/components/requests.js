import axios from 'axios'
import React from 'react'
import Cookies from 'js-cookie'
export default function Requests({ requests }) {
    const id=requests._id
    async function accept (e){
       await axios.post("/admin/grantCourse",{id},{
        headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
      })
      console.log("done")
    }
    async function reject (e){
        await axios.post("/admin/",{id},{
            headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
          })
    }
    return (
        <div>
            <div className="course-details" >
                <h4>{requests.title}</h4>
                <p>Course ID: {requests._id}</p>
                <p>{requests.createdAt}</p>
                <button onClick={accept}>Accept</button>
                <button onClick={reject}>Reject</button>
            </div>
        </div>
    )
}
