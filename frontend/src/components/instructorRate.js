import React from 'react'

export default function instructorRate({rate}) {
  return (
    <div>
      <div>
            <div className="course-details" >
                <p>trainee: {rate.trainee}</p>
                <p>rate: {rate.rating}</p>
            </div>
        </div>
    </div>
  )
}
