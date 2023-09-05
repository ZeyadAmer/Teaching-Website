const CourseDetails = ({ course,onClick }) => {
    return (
        <div className="course-details" onClick={onClick}>
            <h4>{course.title}</h4>
            <p><strong>Price : </strong>{course.price}</p>
            <p><strong>Instructor : </strong>{course.instructor}</p>
            <p><strong>Subject : </strong>{course.subject}</p>
            <p><strong>Rating : </strong>{course.rating}</p>
            <p>{course.createdAt}</p>
        </div>
    )
}

export default CourseDetails