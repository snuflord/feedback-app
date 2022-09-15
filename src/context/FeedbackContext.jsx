import { createContext, useState} from 'react'
import { v4 as uuidv4 } from 'uuid'


// setting FeedbackContext to the createContext method
const FeedbackContext = createContext()

// exporting FeedbackProvider, which will dynamically take in 'children' object
export const FeedbackProvider = ({children}) => {

    // providing initial state hook
    const [feedback, setFeedback] = useState([
        
            {
            id: 1,
            rating: 10,
            text: 'Here we have a text example for item 1',
            },
            {
            id: 2,
            rating: 8,
            text: 'Here we have a text example for item 2',
            },
            {
            id: 3,
            rating: 5,
            text: 'Here we have a text example for item 3',
            }
        
    ])

    // when edit button is clicked, the selected item will populate the item object. Edit default is false. If clicked, set to true. We want to update this state when the edit button is clicked.
    const [feedbackEdit, setFeedbackEdit] = useState({item: {}, edit: false})

    // Delete feedback
    const deleteFeedback = (id) => { // we want this function here as it is where we have our feedback data. 
        if(window.confirm('Are you sure you want to delete?')) {
            // filter method called on feedback array - looping through items
            setFeedback(feedback.filter((item) => 
                // strict inequality operator !== checks operand inequality, returning boolean. returns array minus the deleted item. id is the one being clicked. then resetting Setfeedback.
                item.id !== id)) 
        }
        // id is called from FBItem onClick (declared function and properties) - FBlist {calledbysamename}, then deleteFeedback is set to handleDelete here in this scope.
    }

    // addFeedback === handleAdd, which is returning object data from FeedbackForm - newFeedback
    const addFeedback = (newFeedback) => { 
            // creating unique id for each newFeedback item
        newFeedback.id = uuidv4()
            // newFeedback takes in new id + ... (spread operator) takes all objects from previous array (feedbackdata)
        setFeedback([newFeedback, ...feedback]) 
    }

    // creating new function to set item to be updated -called in Feedbackitem button on click - clicking sets edit to true.
    const editFeedback = (item) => {
        // calling setFeedbackEdit from global state to reference item and edit. 
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    // Update feedback item
                            //feedback edit/ newFeedback
    const updateFeedback = (id, updItem) => {
                            // passing object to set feedback item. Looping through feedback with .map. Finding item of item clicked to update against the returned mapped item id. the spread operators update the object.If id === id, then replace item with updItem. If it cannot be found, replac ewith original item (do nothing/default). ... means replace
        setFeedback(feedback.map((item) => (item.id === id ? { 
            ...item, ...updItem
            } : item))
        )   
    }
    
    // returning the createcontext method with the values of the provider (FeedbackProvider) - then passing in the data and functions in the value= field.
    return (
        <FeedbackContext.Provider value={{feedback, feedbackEdit, deleteFeedback, addFeedback, editFeedback, updateFeedback}}>
            {children}
        </FeedbackContext.Provider>
    )
    
}

export default FeedbackContext