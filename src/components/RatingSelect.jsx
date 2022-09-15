import {useState, useContext, useEffect} from 'react'
import FeedbackContext from '../context/FeedbackContext'

function RatingSelect({ select }) {
    const [selected, setSelected] = useState(10)

    const {feedbackEdit} = useContext(FeedbackContext)

    useEffect(() => {
      // updating what is selected with feedbackEdit
      setSelected(feedbackEdit.item.rating)
    }, [feedbackEdit])
   
    const handleChange = (num) => () => { // handleChange taking in number and returning function.
      //change string to number with +
      setSelected(num)
      select(num)
      console.log(num)
    }
   
    return (
      <ul className='rating'>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <li key={num}>
            <input
              type='radio'
              id={`num${num}`}
              name='rating'
              onChange={handleChange(num)}
              checked={selected === num}
            />
            <label htmlFor={`num${num}`}>{`${num}`}</label>
          </li>
        ))}
      </ul>
    )
  }


export default RatingSelect