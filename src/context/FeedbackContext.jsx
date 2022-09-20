import { createContext, useState, useEffect} from 'react'

// setting FeedbackContext to the createContext method
const FeedbackContext = createContext()

// exporting FeedbackProvider, which will dynamically take in 'children' object: the react components in App
export const FeedbackProvider = ({children}) => {

    // loading spinner
    const [isLoading, setIsLoading] = useState(true)

    // providing initial state hook
    const [feedback, setFeedback] = useState([])

    // when edit button is clicked, the selected item will populate the item object. Edit default is false. If clicked, set to true. We want to update this state when the edit button is clicked.
    const [feedbackEdit, setFeedbackEdit] = useState({item: {}, edit: false})

    // imported useEffect hook as we want to run on page load/every time page loads
    useEffect(() => {
        fetchFeedback()
    }, [])

    // fetch feedback

    const fetchFeedback =  async () => {
        // /feedback - the url is coming from package.json proxy. querying sort by id in descending order
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json()
        // updating state of setFeedback, contiguous with 'feedback' object above. 
        setFeedback(data)
        setIsLoading(false)
    } 

    // Delete feedback
    const deleteFeedback = async (id) => { // we want this function here as it is where we have our feedback data. 
        if(window.confirm('Are you sure you want to delete?')) {
            // fetching feeback data of specific id, specifying the delete method.
            await fetch(`/feedback/${id}`, {method: 'DELETE'})
            // filter method called on feedback array - looping through items
            setFeedback(feedback.filter((item) => 
                // strict inequality operator !== checks operand inequality, returning boolean. returns array minus the deleted item. id is the one being clicked. then resetting Setfeedback.
                item.id !== id)) 
        }
        // id is called from FBItem onClick (declared function and properties) - FBlist {calledbysamename}, then deleteFeedback is set to handleDelete here in this scope.
    }

    // addFeedback === handleAdd, which is returning object data from FeedbackForm - newFeedback
    const addFeedback = async function(newFeedback) {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newFeedback),
        })

        const data = await response.json()
        
            // newFeedback takes in new id + ... (spread operator) takes all objects from previous array (feedbackdata)
        setFeedback([data, ...feedback])
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
    const updateFeedback = async (id, updItem) => {

        const response = await fetch(`/feedback/${id}`, {method: 'PUT', headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updItem),
        })

        const data = await response.json()
                            // passing object to set feedback item. Looping through feedback with .map. Finding item of item clicked to update against the returned mapped item id. the spread operators update the object.If id === id, then replace item with updItem. If it cannot be found, replace with original item (do nothing/default). ... means replace
        setFeedback(feedback.map((item) => (item.id === id ? { 
            ...item, ...data,
             } : item))
        ) 
        // setting edit to false at end of updating feedback
        setFeedbackEdit({
            item: {},
            edit: false
        })
    }
    
    // returning the createcontext method with the values of the provider (FeedbackProvider) - then passing in the data and functions in the value= field.
    return (
        <FeedbackContext.Provider value={{feedback, feedbackEdit, isLoading, deleteFeedback, addFeedback, editFeedback, updateFeedback}}>
            {children}
        </FeedbackContext.Provider>
    )
    
}

export default FeedbackContext