// Main app components. Components can either be classes or functions (hooks)
// Pops can take in functions

// Browser router uses html5 history api to keep in sync with URL. : HashBrowser uses /#about for eg. 
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutPage from './pages/AboutPage'
import AboutIconLink from './components/AboutIconLink'
import {FeedbackProvider} from './context/FeedbackContext'

function App() { 

    return ( // returning what looks like html but is in fact jsx.


    
    <>   {/* Wrapping returned components in Router, imported above, allowing us to create a Route*/}

    <FeedbackProvider>
            <Router> 
                    <Header />
                    <div className="container">
                        <Routes>
                            <Route exact path='/' element={
                                <>
                                {/*handleAdd prop taking in addFeedback function, outside return method*/}
                                <FeedbackForm/> 
                                <FeedbackStats />
                                {/* passing feedback variable (data) as prop to FeedbackList */}
                                <FeedbackList/>
                                </>
                            }>
                            </Route> 
                        
                            <Route path='/about' element={<AboutPage />} />

                        </Routes>
                        
                        <AboutIconLink/>
                    </div>
            </Router> 
    </FeedbackProvider>   
    </>)
}

export default App;