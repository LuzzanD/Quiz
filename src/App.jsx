import {useState} from "react"
import LandingPage from "./Components/LandingPage"
import Quiz from "./Components/Quiz"

function App(){
    
    const [clicked, setClicked] = useState(false)
  
    return (
        <div className="wrapper">
            {clicked ? <Quiz /> : <LandingPage setClicked={setClicked} />}
        </div>
    )
}

export default App
