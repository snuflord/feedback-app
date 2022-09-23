import {useState, useContext, useEffect} from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {

    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

    useEffect(() => {
        if(feedbackEdit.edit === true) {
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
        
    }, [feedbackEdit])
    
    const [text, setText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [rating, setRating] = useState(10)
    const [message, setMessage] = useState('')


    const handleTextChange =  (e) => {
        if(text === '') { // if there is no text
            setBtnDisabled(true)
            setMessage(null)
        } else if(text !== '' && text.trim().length <= 10 ) { // if there is text but there are less than 10 chars
            setMessage(<div>Message must be at least 10 characters</div>)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }

        setText(e.target.value)
    }

    const handleSubmit = (e) => { //handleSubmit takes in event/ check for > 10/ then new var containing text/rating
        e.preventDefault()
        //trim removes whitespace from text
        if(text.trim().length > 10) { 
            const newFeedback = {
                text,
                rating
            }
            // checking if edit symbol has been clicked, firing editFeedback, firing setfeedbackEdit (in context) that sets bool to true. If bool is true, updateFeedback fires, which references feedbackEdit global state item and the id of that item (id in updateFeedback), and newFeedback, which is updItem in updateFeedback (in context file)
            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
                addFeedback(newFeedback) // returning data to addFeedback
            }
            setText('')
        }
    }

    return (

        <Card>
            <form onSubmit={handleSubmit}> {/*On submit, fire handleSubmit function*/}
                
                <h2>How would you rate your experience?</h2>
                    <RatingSelect select={(rating) => setRating(rating)}/>
                <div className="input-group">
                    <input onChange={handleTextChange} type='text' placeholder='Write a review' value={text}/>
                    <Button type='submit' isDisabled={btnDisabled}>Send</Button>
                </div>

                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    )
}

export default FeedbackForm