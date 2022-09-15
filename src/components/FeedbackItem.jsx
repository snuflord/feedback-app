import { FaTimes, FaEdit } from 'react-icons/fa'
import Card from './shared/Card'
import PropTypes from 'prop-types'
import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'


function FeedbackItem ({item}) { // item 'feedback'/handleDlete coming from FeedbackList . 

    // calling functions from FeedbackContext
    const {deleteFeedback, editFeedback} = useContext(FeedbackContext)

    return (
        <Card >
            <div className="num-display">{item.rating}</div>
            
            <button onClick={() => deleteFeedback(item.id)} className='close'> 
                <FaTimes color='purple'/> {/* FaTimes from font awesome imported above via npm install react-icons*/}
            </button>

            {/* So here, when clicked, the editFeedback function fires, taking in the item */}
            <button onClick={() => editFeedback(item)} className='edit'>
                <FaEdit color='purple'></FaEdit>
            </button>
            
            <div className="">{item.text}</div>
        </Card> 
    )
}

FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired
}

export default FeedbackItem