import {motion, AnimatePresence} from 'framer-motion'
import FeedbackItem from './FeedbackItem'
import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'


function FeedbackList() {

    const {feedback} = useContext(FeedbackContext)

    if(!feedback || feedback.length === 0) {
        return <p>No feedback yet</p>
    }
    
    // return (
    //     <div className="feedback-list">
    //         {feedback.map((item) => ( // item (arbitrary name) takes in object data from 'feedback' object
    //             <FeedbackItem key={item.id} item={item}// declare item key - items id. item = item(feedback). Item is the feedback data being mapped. 
    //             handleDelete={handleDelete} /> // handle delete function is a prop for FeedbackItem, but is defined here in FeedbackList
    //         ))}
    //     </div>
    // )

    return (
        <div className="feedback-list">
            <AnimatePresence>
                {/* // item (arbitrary name) takes in object data from 'feedback' object */}
            {feedback.map((item) => ( 
                <motion.div 
                    key={item.id}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    >
                {/* // declare item key - items id. item = item(feedback). Item is the feedback data being mapped.  */}
                <FeedbackItem key={item.id} item={item}
                
                /> 
                </motion.div>
            ))}
            </AnimatePresence>
        </div>
    )
}


export default FeedbackList