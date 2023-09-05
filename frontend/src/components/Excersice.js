import React from 'react'

export default function Excersice({ onClick }) {
    return (
        <div>
            <div className="course-details" onClick={onClick}>
                <h4>Excersice</h4>
            </div>
        </div>
    )
}
