
import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats ({}) {
    const {feedback} = useContext(FeedbackContext)

    // calculate ratings average

    let average = feedback.reduce((acc, cur) => { // reduce is high order array - takes in accumulated value and current
        return acc + cur.rating 
    }, 0) / feedback.length // 0 is default of acc. then / divide acc by the feedback array length. variable containing number

    average = average.toFixed(1).replace(/[.,]0$/, '') // rounding decimals to one place.replace (with reg ex)

    return (
        <div className="feedback-stats">
                <h4>{feedback.length} Reviews</h4>
                <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
        </div>
    )
}


export default FeedbackStats