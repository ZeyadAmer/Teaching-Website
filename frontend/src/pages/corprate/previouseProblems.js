import axios from 'axios'
import React, { useEffect,useState } from 'react'
import Cookies from 'js-cookie'
import Problem from '../../components/Problem';
export default function PreviouseProblems() {
    const [problems,setProblems]=useState(null);
    let problemComponent=null;
    useEffect(() => {
        const fetchProblems= async ()=>{
            const problem=await axios.get("/corporateTrainee/myProblems",{
                headers: { Authorization: `BEARER ${Cookies.get('jwt')}` },
            })
            setProblems(problem.data)
        }
        fetchProblems()
        
    })
    if(problems!=null){
    problemComponent=problems.map((problem)=> (
        <Problem key={problem._id} problem={problem}  />
    ))
    }
    
  return (
    <div>
      {problemComponent}
    </div>
  )
}
