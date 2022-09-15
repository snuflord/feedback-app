import PropTypes from 'prop-types'

function Card({children, reverse}) {
    
    // return (
    //     <div className={`card ${reverse && 'reverse'}`}>
    //         {children}
    //     </div>
    // )

    return (
        <div className="card" style={{ // style set inline
            backgroundColor: reverse ? 'rgba(0,0,0,0.4' : '#fff',
            color: reverse ? '#fff' : '#000',
            }}>

            {children}
        </div>
    )
}

Card.defaultProps = {
    reverse: false,
}

Card.propTypes = {
    children: PropTypes.node.isRequired, // node is a representation of a read DOM node (html element).
    reverse: PropTypes.bool.isRequired,
}
export default Card