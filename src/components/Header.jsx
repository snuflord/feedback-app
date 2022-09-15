import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


function Header({ text, bgColor, textColor}) {

    const headerStyles = { // grouping styles as an object in const variable
        backgroundColor: bgColor, // properties called from Header.defaultprops
    }

  return (
    <header style={headerStyles}> {/* Above variable contained styling referenced in style= attribute */}
        <div className="container">
            <Link style={{textDecoration: 'none', color: textColor}} to='/'>
            <h2>{text}</h2> {/* text returned from Default props */}
            </Link>
        </div>
    </header>
  )
}

// default text value, passed into Header components' prop. 
Header.defaultProps =  {
    text: 'Feedback UI',
    bgColor: 'rgba(0, 0, 0, 0.4)',
    textColor: '#ff6a95',
    

}

Header.propTypes =  {
    text: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
}

export default Header