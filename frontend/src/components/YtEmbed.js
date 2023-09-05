import PropTypes from "prop-types"

const YtEmbed = ({ link }) => (
    <div className="video-responsive">
        <iframe
            width="853"
            height="480"
            src={link}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
)

// YtEmbed.PropTypes = {
//     embedId: PropTypes.string.isRequired
// }

export default YtEmbed