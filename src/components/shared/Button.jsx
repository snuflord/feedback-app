import PropTypes from 'prop-types'

function Button ({children, version, type, isDisabled}) { // takes in default props below. 
    
    
    return (
        <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
            {children} 
        </button>
    )
}

Button.defaultProps =  {
    version: 'primary', 
    type: 'button',
    isDisabled: false, //defined as disabled - contiguous
}

Button.propTypes =  {
    children: PropTypes.node.isRequired,
    version: PropTypes.string,
    type: PropTypes.string,
    isDisabled: PropTypes.bool.isRequired,
}

export default Button