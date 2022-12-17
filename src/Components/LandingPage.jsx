
function LandingPage(props){
    return (
        <div className="land-page-info">
            <h1 className="quiz-title">Quizzical</h1>
            <p className="quiz-desc">Dare to test your knowledge?</p>
            <button className="btn" onClick={() => props.setClicked(true)}>Start Quiz</button>
        </div>
    )
}

export default LandingPage