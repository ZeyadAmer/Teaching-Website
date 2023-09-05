const Subtitle = ({ subtitle, onClick }) => {
    return (
        <div className="course-details" onClick={onClick}>
            <h4>{subtitle.Name}</h4>
            <p><strong>total hours : </strong>{subtitle.Hours}</p>
            <p><strong>description : </strong>{subtitle.Subtitle_description}</p>
        </div>
    )
}

export default Subtitle